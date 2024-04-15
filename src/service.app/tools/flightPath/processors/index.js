import AppConstants from '@/constants';
import AppCommonConstants from 'rocket_sidekick_common/constants';

import ConvertUtility from 'rocket_sidekick_common/utility/convert.js';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import ToolsService from '@/service/tools/index';

class FlightPathProcessorService extends ToolsService {
	constructor() {
		super();

		this._serviceFlightPathOutput = null;
		this._serviceFlightPathOutputTemplate = null;
	}

	async init(injector) {
		await super.init(injector);
		
		this._serviceFlightPathOutput = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_KML);
		this._serviceFlightPathOutputTemplate = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_OUTPUT_TEMPLATE_HANDLEBARS);
	}

	get id() {
		throw Error('Not Implemented');
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

	process(correlationId, engine, results, data, measurementUnits, templateMain, templatePinLaunch, templatePinTouchdown, templatePinsAdditional) {
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

		this._serviceFlightPathOutput.initialize(correlationId);
		this._serviceFlightPathOutputTemplate.initialize(correlationId, templateMain, templatePinLaunch, templatePinTouchdown, templatePinsAdditional);

		this._data = new FlightPath();

		const responseProcessData = this._processData(correlationId, data);
		if (this._hasFailed(responseProcessData))
			return responseProcessData;

		const responseProcessDataSort = this._processDataSort(correlationId);
		if (this._hasFailed(responseProcessDataSort))
			return responseProcessDataSort;

		if (responseProcessDataSort.results && LibraryCommonUtility.isFunction(responseProcessDataSort.results))
			this._data.sort(responseProcessDataSort.results);

		const responseProcessDataPost = this._processDataPost(correlationId);
		if (this._hasFailed(responseProcessDataPost))
			return responseProcessDataPost;

		results.translations = {};
		results.translations.launch = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.launch');
		results.translations.maxAltitude = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxAltitude');
		results.translations.maxVelocity = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxVelocity');
		results.translations.touchdown = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.touchdown');
		results.translations.flightPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.flightPath');
		results.translations.groundPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.groundPath');
		results.translations.measurementUnits = {};
		results.translations.measurementUnits.altitude = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId];
		results.translations.measurementUnits.velocity = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId];
		const flightPaths = [];
		const flightPathsOutput = [];

		const filter = new Filter();

		const divisor = ConvertUtility.convert(
			1, 
			measurementUnits.measurementUnitsAltitudeId,
			'm');
		let coords;
		let filterResults  = null;
		let flight = {};
		let path = [];
		let previous = null;
		let temp = null;
		for (const [key, value] of Object.entries(this._data.flights)) {
			coords = null;
			path = [];
			previous = null;

			flight = {};
			temp = value.data.shift(); // get first row...

			flight.maxAltitude = 0;
			flight.maxVelocity = 0;
			flight.launchCoords = `${temp.longitude},${temp.latitude}`;
			flight.tracker = value.tracker;
			flight.flightEnd = value.flightEnd;
			flight.flightStart = value.flightStart;
			while (temp) {
				previous = temp;

				filterResults = filter.filter({ lat: temp.latitude, long: temp.longitude });
				if (!filterResults.ignore) {
					coords = `${temp.longitude},${temp.latitude},${this._round(temp.altitude * divisor)}`;

					// add coords to the path...
					path.push(coords);
	
					// is this the max altitude?
					if (temp && temp.altitude && (temp.altitude > 0) && (temp.altitude > flight.maxAltitude)) {
						flight.maxAltitude = this._round(temp.altitude);
						flight.maxAltitudeCoords = coords;
					}
	
					// is this the max velocity?
					if (temp && temp.velocityV && (temp.velocityV > 0) && (temp.velocityV > flight.maxVelocity)) {
						flight.maxVelocity = this._round(temp.velocityV);
						flight.maxVelocityCoords = coords;
					}
				}

				temp = value.data.shift(); // get next row...
				if (!temp)
					flight.touchdownCoords = `${previous.longitude},${previous.latitude}`;
			}

			// flight.maxAltitude = this._convert(flight.maxAltitude)
			// 	.from(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].altitude[measurementUnits.measurementUnitsAltitudeId])
			// 	.to(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId]);
			flight.maxAltitude = ConvertUtility.convert(
				flight.maxAltitude, 
				AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].altitude[measurementUnits.measurementUnitsAltitudeId],
				AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId]);
			// flight.maxVelocity = this._convert(flight.maxVelocity)
			// 	.from(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].velocity[measurementUnits.measurementUnitsVelocityId])
			// 	.to(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId]);
			flight.maxVelocity = ConvertUtility.convert(
				flight.maxVelocity, 
				AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].velocity[measurementUnits.measurementUnitsVelocityId],
				AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId]);
			flight.maxAltitude = LibraryClientUtility.convertNumber(flight.maxAltitude).toLocaleString();
			flight.maxVelocity = LibraryClientUtility.convertNumber(flight.maxVelocity).toLocaleString();

			flight.translations = results.translations;
			flight.style = results.style;
			// flight.translations = {};
			// flight.translations.launch = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.launch');
			// flight.translations.maxAltitude = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxAltitude');
			// flight.translations.maxVelocity = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxVelocity');
			// flight.translations.touchdown = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.touchdown');
			// flight.translations.flightPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.flightPath');
			// flight.translations.groundPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.groundPath');
			// flight.translations.measurementUnits = {};
			// flight.translations.measurementUnits.altitude = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId];
			// flight.translations.measurementUnits.velocity = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId];

			flight.flightPathCoords = path;
			flightPaths.push(flight);

			// results.flightPath = this._kml(correlationId, results, path.join('\n'));
			const responseFlightPath = this._serviceFlightPathOutput.output(correlationId, results, flight, path.join('\n'), this._serviceFlightPathOutputTemplate);
			if (this._hasFailed(responseFlightPath))
				return responseFlightPath;
			
			// results.flight.flightPath = responseFlightPath.results;
			flightPathsOutput.push(responseFlightPath.results);
		}

		results.flightPathsOutput = flightPathsOutput;
		results.flightPaths = flightPaths;

		console.log();
		console.log();
		console.log();
		console.log(filter.results);
		console.log(filter.results);
		console.log(filter.results);
		console.log(filter.results);
		console.log(filter.results);
		console.log();
		console.log();
		console.log();

		// let coords;
		// let path = [];
		// let previous = null;
		// let temp = this._data.rows.shift(); // get first row...
		// results.maxAltitude = 0;
		// results.maxVelocity = 0;
		// results.launchCoords = `${temp.longitude},${temp.latitude}`;
		// while (temp) {
		// 	previous = temp;
		// 	coords = `${temp.longitude},${temp.latitude},${this._round(temp.altitude * divisor)}`;

		// 	// add coords to the path...
		// 	path.push(coords);

		// 	// is this the max altitude?
		// 	if (temp && temp.altitude && (temp.altitude > 0) && (temp.altitude > results.maxAltitude)) {
		// 		results.maxAltitude = this._round(temp.altitude);
		// 		results.maxAltitudeCoords = coords;
		// 	}

		// 	// is this the max velocity?
		// 	if (temp && temp.velocityV && (temp.velocityV > 0) && (temp.velocityV > results.maxVelocity)) {
		// 		results.maxVelocity = this._round(temp.velocityV);
		// 		results.maxVelocityCoords = coords;
		// 	}

		// 	temp = this._data.rows.shift();
		// 	if (!temp)
		// 		results.touchdownCoords = `${previous.longitude},${previous.latitude}`;
		// }

		// results.maxAltitude = this._convert(results.maxAltitude)
		// 	.from(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].altitude[measurementUnits.measurementUnitsAltitudeId])
		// 	.to(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId]);
		// results.maxVelocity = this._convert(results.maxVelocity)
		// 	.from(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsId].velocity[measurementUnits.measurementUnitsVelocityId])
		// 	.to(AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId]);
		// results.maxAltitude = LibraryClientUtility.convertNumber(results.maxAltitude).toLocaleString();
		// results.maxVelocity = LibraryClientUtility.convertNumber(results.maxVelocity).toLocaleString();

		// results.translations = {};
		// results.translations.launch = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.launch');
		// results.translations.maxAltitude = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxAltitude');
		// results.translations.maxVelocity = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.maxVelocity');
		// results.translations.touchdown = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.touchdown');
		// results.translations.flightPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.flightPath');
		// results.translations.groundPath = LibraryClientUtility.$trans.t('forms.content.tools.flightPath.groundPath');
		// results.translations.measurementUnits = {};
		// results.translations.measurementUnits.altitude = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].altitude[measurementUnits.measurementUnitsAltitudeOutputId];
		// results.translations.measurementUnits.velocity = AppCommonConstants.MeasurementUnits[measurementUnits.measurementUnitsOutputId].velocity[measurementUnits.measurementUnitsVelocityOutputId];

		// results.flightPathCoords = path;
		// // results.flightPath = this._kml(correlationId, results, path.join('\n'));
		// const responseFlightPath = this._serviceFlightPathOutput.output(correlationId, results, path.join('\n'), this._serviceFlightPathOutputTemplate);
		// if (this._hasFailed(responseFlightPath))
		// 	return responseFlightPath;
		// results.flightPath = responseFlightPath.results;

		return this._successResponse(results, correlationId);
	}

	_check(correlationId, data) {
		throw Error('Not Implemented');
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

	_publish(correlationId, flightId, time, altitudeASL, altitudeAGL, latitude, longitude, velocityH, velocityV, apogee, noseOver, drogue, main, ground, index, tracker, flightStart, flightEnd) {
		this._data.publish(correlationId, flightId, time, altitudeASL, altitudeAGL, latitude, longitude, velocityH, velocityV, apogee, noseOver, drogue, main, ground, index, tracker, flightStart, flightEnd);
	}

	_round(value, places = 2) {
		return LibraryClientUtility.convertNumber(value.toFixed(places));
	}

	_sort(correlationId, func) {
		this._data.sort(correlationId, func());
	}

	static alpha = 'ABCDEFGHIJKLMNOPQRSTUVWYXZ';
}

class FlightPath {
	constructor() {
		this._flights = {};
		// this._rows = [];
	}

	get flights() {
		return this._flights;
	}
	// get rows() {
	// 	return this._rows;
	// }

	publish(correlationId, flightId, time, altitudeASL, altitudeAGL, latitude, longitude, velocityH, velocityV, apogee, noseOver, drogue, main, ground, index, tracker, flightStart, flightEnd) {
		// this._rows.push({
		this._flights[flightId] = this._flights[flightId] ?? {
			tracker: null,
			flightStart: null,
			flightEnd: null,
			data: []
		};

		this._flights[flightId].tracker = tracker;
		if (flightStart)
			this._flights[flightId].flightStart = index;
		if (flightEnd)
			this._flights[flightId].flightEnd = index;

		this._flights[flightId].data.push({
			index: index,
			altitude: LibraryClientUtility.convertNumber(altitudeASL) + LibraryClientUtility.convertNumber(altitudeAGL),
			altitudeAGL: LibraryClientUtility.convertNumber(altitudeAGL),
			altitudeASL: LibraryClientUtility.convertNumber(altitudeASL),
			latitude: LibraryClientUtility.convertNumber(latitude),
			longitude: LibraryClientUtility.convertNumber(longitude),
			seconds: null,
			time: LibraryClientUtility.convertNumber(time),
			velocityV: LibraryClientUtility.convertNumber(velocityV),
			velocityH: velocityH ? LibraryClientUtility.convertNumber(velocityH) : null
		});
	}

	process(correlationId) {
		let start = 0;
		let started = false;
		for (const [key, value] of Object.entries(this._flights)) {
			start = 0;
			started = false;
			
			for (const item of value.data) {
				if (!started && (item.velocityV <= 0))
					continue;

				item.seconds = (item.time - start);

				if (!started) {
					start = item.time;
					started = true;
				}
			}

		}
		// for (const item of this._rows) {
		// 	if (!started && (item.velocityV <= 0))
		// 		continue;

		// 	item.seconds = (item.time - start);

		// 	if (!started) {
		// 		start = item.time;
		// 		started = true;
		// 	}
		// }
	}

	sort(correlationId, func) {
		if (!func)
			return;

		for (const [key, value] of Object.entries(this._flights))
			this._flights[key] = value.sort(func);
		// this._rows = this._rows.sort(func);
	}
}

class Filter {
	constructor() {
		this._max = 10;
		this._previous = null;

		this.results = {
			maxDistnace: 0,
			count: 0,
			total: 0
		};
	}

	filter(data) {
		try {
			this.results.total++;

			if (!this._previous)
				return { ignore: false, distance: 0 };

			// console.log();
			// console.log(this._previous);
			// console.log(data);
			const distance = this._getDistanceFromLatLon(data.lat, data.long, this._previous.lat, this._previous.long);
			if (distance > this.results.maxDistnace)
			this.results.maxDistnace = distance;
			// console.log(distance);
			const delta = (distance > this._max);
			if (delta)
				this.results.count++;
			// console.log(distance - this._max);
			// console.log(delta);
			return { ignore: delta, distance: distance };
		}
		finally {
			this._previous = data;
		}
	}

	// _getDistanceFromLatLon(lat1,lon1,lat2,lon2) {
	// 	const R = 6371000; // Radius of the earth in m
	// 	const dLat = this._deg2rad(lat2-lat1);
	// 	const dLon = this._deg2rad(lon2-lon1); 
	// 	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	// 		Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
	// 		Math.sin(dLon/2) * Math.sin(dLon/2); 
	// 	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	// 	const d = R * c; // Distance in km
	// 	return d;
	//   }
	_getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
		const r = 6371000; // m
		const p = Math.PI / 180;

		const a = 0.5 - 
			Math.cos((lat2 - lat1) * p) / 2 + 
			Math.cos(lat1 * p) * Math.cos(lat2 * p) *
			(1 - Math.cos((lon2 - lon1) * p)) / 
			2;

		return 2 * r * Math.asin(Math.sqrt(a));
	}
	  
	_deg2rad(deg) {
		return deg * (Math.PI/180)
	}
}

export default FlightPathProcessorService;
