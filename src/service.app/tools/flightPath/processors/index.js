import AppCommonConstants from 'rocket_sidekick_common/constants';

import ConvertUtility from 'rocket_sidekick_common/utility/convert.js';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import ToolsService from '@/service/tools/index';

import { buildFlightPathModel, modelForBranch } from '../model/builder';
import { FlightPathExportOptions } from '../options';
import { renderFlightPath } from '../output/exporter';

// Meters per second squared to feet per second squared; the conversion library has no
// imperial acceleration unit.
const MPS2_TO_FTS2 = 3.280839895;

/**
 * Base for a file format processor. A subclass only parses its CSV into rows and
 * detects flights; everything from the rows to the rendered document is shared here and
 * lives in the builder and exporter.
 */
class FlightPathProcessorService extends ToolsService {
	constructor() {
		super();

		this._data = null;
	}

	get id() {
		throw Error('Not Implemented');
	}

	get name() {
		return this.id;
	}

	get data() {
		return this._data;
	}

	check(correlationId, data) {
		return this._check(correlationId, data);
	}

	columnIndexOf(col) {
		return FlightPathProcessorService.alpha.indexOf(col);
	}

	process(correlationId, engine, results, data, measurementUnits, exportOptions, template) {
		this._enforceNotNull('FlightPathProcessorService', 'process', engine, 'engine', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', results, 'results', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsId, 'measurementUnitsId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsAltitudeId, 'measurementUnitsAltitudeId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsVelocityId, 'measurementUnitsVelocityId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsOutputId, 'measurementUnitsOutputId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsAltitudeOutputId, 'measurementUnitsAltitudeOutputId', correlationId);
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits.measurementUnitsVelocityOutputId, 'measurementUnitsVelocityOutputId', correlationId);
		this._enforceNotNull('FlightPathProcessorService', 'process', template, 'template', correlationId);

		this._data = new FlightPath();

		const responseProcessData = this._processData(correlationId, data);
		if (this._hasFailed(responseProcessData))
			return responseProcessData;

		const responseProcessDataSort = this._processDataSort(correlationId);
		if (this._hasFailed(responseProcessDataSort))
			return responseProcessDataSort;
		if (responseProcessDataSort.results && LibraryCommonUtility.isFunction(responseProcessDataSort.results))
			this._data.sort(correlationId, responseProcessDataSort.results);

		const responseProcessDataPost = this._processDataPost(correlationId);
		if (this._hasFailed(responseProcessDataPost))
			return responseProcessDataPost;

		const options = (exportOptions instanceof FlightPathExportOptions) ? exportOptions : new FlightPathExportOptions(exportOptions);
		const flights = this._data.toFlights();
		if (flights.length === 0)
			return this._error('FlightPathProcessorService', 'process', 'No flights detected', null, 'noFlights', null, correlationId);

		let model;
		try {
			model = buildFlightPathModel({
				flights: flights,
				options: options,
				units: this._units(correlationId, measurementUnits),
				labels: this._labels(correlationId),
				info: {
					title: results.title,
					date: results.date,
					location: results.location,
					processorName: this.name
				}
			});
		}
		catch (err) {
			return this._error('FlightPathProcessorService', 'process', 'Unable to build the flight path', err, null, null, correlationId);
		}

		const models = (options.oneFilePerFlight && model.branches.length > 1)
			? model.branches.map(branch => modelForBranch(model, branch))
			: [model];

		const outputs = [];
		try {
			for (const item of models) {
				outputs.push({
					name: item.documentName,
					extension: template.extension,
					templateId: template.id,
					content: renderFlightPath(item, template)
				});
			}
		}
		catch (err) {
			return this._error('FlightPathProcessorService', 'process', 'Unable to render the flight path template', err, 'template', null, correlationId);
		}

		results.flightPath = model;
		results.flightPaths = model.branches;
		results.flightPathsOutput = outputs;

		return this._successResponse(results, correlationId);
	}

	_check(correlationId, data) {
		throw Error('Not Implemented');
	}

	/**
	 * The flight detection state machine shared by every format. A flight begins at the
	 * first row whose vertical velocity is beyond the threshold and ends after more than
	 * `zeroMax` consecutive rows at rest.
	 *
	 * The last row before liftoff is published too, so the pad has a position and the
	 * altitude datum starts on the ground rather than a sample into the boost. Rows at
	 * rest are held back rather than dropped: if the flight carries on they are published
	 * (the apogee sample has zero vertical velocity), and if it ends the first of them is
	 * the landing. Rows still held when the data runs out are discarded, and such a flight
	 * has no landing.
	 *
	 * @param rows the raw rows for one tracker
	 * @param verticalVOf returns the vertical velocity of a row
	 * @param publish (data, verticalV, index, flightId, flightStart, flightEnd)
	 * @param flightIdStart the last flight id used, so ids stay unique across trackers
	 * @return the last flight id used
	 */
	_detectFlights(correlationId, rows, verticalVOf, publish, flightIdStart = 0) {
		const zeroMax = 5;
		const threshold = 10;
		const thresholdNeg = -10;

		let flightId = flightIdStart;
		let detected = false;
		let zeros = 0;
		let pending = [];
		let lastIdle = null;
		let index = 0;

		for (const data of rows) {
			index++;
			const v = LibraryClientUtility.convertNumber(verticalVOf(data));

			if (!detected) {
				if (v === null || (v > thresholdNeg && v < threshold)) {
					lastIdle = { data, v, index };
					continue;
				}

				// As soon as vertical velocity is beyond the threshold there is a flight.
				detected = true;
				zeros = 0;
				pending = [];
				flightId++;
				if (lastIdle)
					publish(lastIdle.data, lastIdle.v, lastIdle.index, flightId, false, false);
				lastIdle = null;
				publish(data, v, index, flightId, true, false);
				continue;
			}

			if (v !== null && v >= -1 && v <= 1) {
				// At or around zero: a valid value during a flight, and the end of one when
				// enough of them arrive in a row.
				zeros++;
				pending.push({ data, v, index });
				if (zeros > zeroMax) {
					const first = pending[0];
					publish(first.data, first.v, first.index, flightId, false, true);
					pending = [];
					zeros = 0;
					detected = false;
				}
				continue;
			}

			for (const item of pending)
				publish(item.data, item.v, item.index, flightId, false, false);
			pending = [];
			zeros = 0;
			publish(data, v, index, flightId, false, false);
		}

		return flightId;
	}

	/**
	 * Flight detection from the device's own flags, for exports that carry them. Each flag
	 * flips to true once and stays true, so an event is the row where a flag changes. The
	 * launch flag starts a flight (the row before it is kept as the pad), the landing flag
	 * ends it, and the apogee flag is published as an event on its row. A file that ends
	 * without the landing flag has no landing.
	 *
	 * @param flags { launch(data) -> bool, landing(data) -> bool, apogee(data) -> bool }
	 * @param publish (data, verticalV, index, flightId, flightStart, flightEnd, events)
	 */
	_detectFlightsByFlags(correlationId, rows, verticalVOf, flags, publish, flightIdStart = 0) {
		let flightId = flightIdStart;
		let inFlight = false;
		let lastIdle = null;
		let index = 0;
		let previousLaunch = false;
		let previousLanding = false;
		let previousApogee = false;

		for (const data of rows) {
			index++;
			const v = LibraryClientUtility.convertNumber(verticalVOf(data));
			const launch = flags.launch(data) === true;
			const landing = flags.landing(data) === true;
			const apogee = flags.apogee ? flags.apogee(data) === true : false;

			if (!inFlight) {
				if (launch && !previousLaunch) {
					inFlight = true;
					flightId++;
					if (lastIdle)
						publish(lastIdle.data, lastIdle.v, lastIdle.index, flightId, false, false, []);
					lastIdle = null;
					publish(data, v, index, flightId, true, false, []);
				}
				else
					lastIdle = { data, v, index };
			}
			else {
				const events = (apogee && !previousApogee) ? [{ type: 'apogee' }] : [];
				if (landing && !previousLanding) {
					publish(data, v, index, flightId, false, true, events);
					inFlight = false;
				}
				else
					publish(data, v, index, flightId, false, false, events);
			}

			previousLaunch = launch;
			previousLanding = landing;
			previousApogee = apogee;
		}

		return flightId;
	}

	_labels(correlationId) {
		const t = (key) => LibraryClientUtility.$trans.t(`forms.content.tools.flightPath.${key}`);
		return {
			pad: t('waypoints.pad'),
			liftoff: t('waypoints.liftoff'),
			maxAcceleration: t('waypoints.maxAcceleration'),
			maxVelocity: t('waypoints.maxVelocity'),
			apogee: t('waypoints.apogee'),
			drogue: t('waypoints.drogue'),
			main: t('waypoints.main'),
			ejection: t('waypoints.ejection'),
			landing: t('waypoints.landing'),
			flightPath: t('flightPath'),
			groundTrack: t('groundPath'),
			flight: t('flight'),
			time: t('balloon.time'),
			altitude: t('balloon.altitude'),
			altitudeMsl: t('balloon.altitudeMsl'),
			distance: t('balloon.distance'),
			velocity: t('balloon.velocity'),
			acceleration: t('balloon.acceleration'),
			maxAltitude: t('maxAltitude'),
			maxRange: t('balloon.maxRange'),
			timeToApogee: t('balloon.timeToApogee'),
			flightTime: t('balloon.flightTime'),
			source: t('balloon.source')
		};
	}

	_processData(correlationId, input) {
		throw Error('Not Implemented');
	}

	_processDataPost(correlationId) {
		this._data.process(correlationId);
		return this._success(correlationId);
	}

	_processDataSort(correlationId) {
		return this._success(correlationId);
	}

	/**
	 * Publishes one row for a flight. Takes a single object rather than a positional list
	 * so that a missing value cannot shift every later one into the wrong column.
	 */
	_publish(correlationId, item) {
		this._data.publish(correlationId, item);
	}

	_round(value, places = 2) {
		return LibraryClientUtility.convertNumber(value.toFixed(places));
	}

	_units(correlationId, measurementUnits) {
		const all = AppCommonConstants.MeasurementUnits;
		const inputSystem = all[measurementUnits.measurementUnitsId];
		const outputSystem = all[measurementUnits.measurementUnitsOutputId];

		const inputAltitude = inputSystem.altitude[measurementUnits.measurementUnitsAltitudeId];
		const inputVelocity = inputSystem.velocity[measurementUnits.measurementUnitsVelocityId];
		const outputAltitude = outputSystem.altitude[measurementUnits.measurementUnitsAltitudeOutputId];
		const outputVelocity = outputSystem.velocity[measurementUnits.measurementUnitsVelocityOutputId];
		const outputDistanceId = measurementUnits.measurementUnitsDistanceOutputId ?? outputSystem.distance.default;
		const outputDistance = outputSystem.distance[outputDistanceId] ?? outputSystem.distance[outputSystem.distance.default];
		const outputAccelerationId = measurementUnits.measurementUnitsAccelerationOutputId ?? outputSystem.acceleration.default;
		const outputAcceleration = outputSystem.acceleration[outputAccelerationId] ?? outputSystem.acceleration[outputSystem.acceleration.default];
		const imperialAcceleration = outputAccelerationId === 'fts2';

		const format = (value) => Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });

		return {
			altitudeToMeters: (value) => ConvertUtility.convert(value, inputAltitude, 'm'),
			velocityToMps: (value) => ConvertUtility.convert(value, inputVelocity, 'm/s'),
			// A plain number in the output unit, for machine-read columns.
			altitudeValue: (meters) => ConvertUtility.round(ConvertUtility.convert(meters, 'm', outputAltitude), 2),
			formatAltitude: (meters) => format(ConvertUtility.convert(meters, 'm', outputAltitude)),
			formatDistance: (meters) => format(ConvertUtility.convert(meters, 'm', outputDistance)),
			formatVelocity: (mps) => format(ConvertUtility.convert(mps, 'm/s', outputVelocity)),
			formatAcceleration: (mps2) => format(imperialAcceleration ? mps2 * MPS2_TO_FTS2 : mps2),
			altitudeUnit: outputAltitude,
			distanceUnit: outputDistance,
			velocityUnit: outputVelocity,
			accelerationUnit: outputAcceleration
		};
	}

	static alpha = 'ABCDEFGHIJKLMNOPQRSTUVWYXZ';
}

/**
 * The rows a processor publishes, grouped by detected flight. This is the seam between a
 * file format and the builder: whatever the CSV looked like, the builder sees the same
 * shape.
 */
class FlightPath {
	constructor() {
		this._flights = {};
	}

	get flights() {
		return this._flights;
	}

	publish(correlationId, item) {
		const flightId = item.flightId;
		this._flights[flightId] = this._flights[flightId] ?? {
			id: flightId,
			tracker: null,
			data: [],
			events: []
		};

		const flight = this._flights[flightId];
		if (item.tracker)
			flight.tracker = item.tracker;

		const number = (value) => {
			if (value === null || value === undefined || value === '')
				return null;
			const n = LibraryClientUtility.convertNumber(value);
			return Number.isFinite(n) ? n : null;
		};

		flight.data.push({
			index: item.index,
			time: number(item.time),
			altitude: number(item.altitude),
			altitudeAGL: number(item.altitudeAGL),
			altitudeASL: number(item.altitudeASL),
			latitude: number(item.latitude),
			longitude: number(item.longitude),
			velocityV: number(item.velocityV),
			velocityH: number(item.velocityH),
			flightStart: item.flightStart === true,
			flightEnd: item.flightEnd === true
		});

		for (const event of item.events || []) {
			if (event && event.type)
				flight.events.push({ type: event.type, rowIndex: flight.data.length - 1 });
		}
	}

	/** Liftoff is the row the processor flagged, or the first climbing row. */
	process(correlationId) {
		for (const flight of Object.values(this._flights)) {
			let liftoffIndex = flight.data.findIndex(row => row.flightStart);
			if (liftoffIndex < 0)
				liftoffIndex = flight.data.findIndex(row => row.velocityV !== null && row.velocityV > 0);
			flight.liftoffIndex = liftoffIndex;
			// A landing is a fact the detection established, never a default from the last row.
			flight.hasLanding = flight.data.some(row => row.flightEnd);
		}
	}

	sort(correlationId, func) {
		if (!func)
			return;
		for (const flight of Object.values(this._flights)) {
			// Events point at rows by position, so carry them through the sort.
			const tagged = flight.data.map((row, position) => ({ row, events: flight.events.filter(e => e.rowIndex === position) }));
			tagged.sort((a, b) => func(a.row, b.row));
			flight.data = tagged.map(t => t.row);
			flight.events = [];
			tagged.forEach((t, position) => {
				for (const event of t.events)
					flight.events.push({ type: event.type, rowIndex: position });
			});
		}
	}

	toFlights() {
		return Object.values(this._flights).map(flight => ({
			id: flight.id,
			name: flight.tracker,
			rows: flight.data,
			liftoffIndex: Number.isInteger(flight.liftoffIndex) ? flight.liftoffIndex : -1,
			hasLanding: flight.hasLanding === true,
			events: flight.events
		}));
	}
}

export default FlightPathProcessorService;
