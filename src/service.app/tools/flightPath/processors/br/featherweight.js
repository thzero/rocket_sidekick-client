import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import FlightPathProcessorService from '../index';

class FeatherweightFlightPathProcessorService extends FlightPathProcessorService {
	get id() {
		return 'featherweightBR';
	}

	get name() {
		return 'Featherweight BlueRaven';
	}

	get measurementUnitDefaults() {
		return {
			unitsId: 'english',
			accelerationId: 'fts2',
			altitudeId: 'ft',
			distanceId: 'ft',
			velocityId: 'fts'
		}
	}

	_check(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_check', input, 'input', correlationId);

		try {
			if (!input.data || input.data.length <= 0 || input.data[0].length <= 0)
				return this._error('FeatherweightFlightPathProcessorService', '_check', 'Featherweight BlueRaven file is without headers', null, AppConstants.FlightPath.Errors.WithoutHeaders, null, correlationId);

			const colAltitudeGL = input.data[0].findIndex(l => l === 'Altitude AGL');
			const colAltitudeSL = input.data[0].findIndex(l => l === 'ALT');
			const colLatitude = input.data[0].findIndex(l => l === 'LAT');
			const colLongitude = input.data[0].findIndex(l => l === 'LON');
			const colTime = input.data[0].findIndex(l => l === 'UNIXTIME');
			const colVelocityH = input.data[0].findIndex(l => l === 'HORZV');
			const colVelocityV = input.data[0].findIndex(l => l === 'VERTV');
			// Optional: the device's own detection flags and fix quality.
			// TODO: drogue and main pins. The export has no deployment columns as of the
			// 2024-11 firmware, so those events have no source. If a later firmware or app
			// version adds them, find the columns here and publish a { type: 'drogue' } or
			// { type: 'main' } event on the row where the flag turns on, as the apogee flag is
			// handled in _detectFlightsByFlags. Everything downstream already supports them.
			const colLaunch = input.data[0].findIndex(l => l === 'Launch detection');
			const colApogee = input.data[0].findIndex(l => l === 'Apogee detection');
			const colLanding = input.data[0].findIndex(l => l === 'Landing detection');
			const colFix = input.data[0].findIndex(l => l === 'FIX');

			let valid = true;
			let errors = [];
			valid &= this._checkField(correlationId, colAltitudeGL, 'Altitude Ground Level', errors);
			valid &= this._checkField(correlationId, colAltitudeSL, 'Altitude Sea Level', errors);
			valid &= this._checkField(correlationId, colLatitude, 'Latitude', errors);
			valid &= this._checkField(correlationId, colLongitude, 'Longitude', errors);
			valid &= this._checkField(correlationId, colTime, 'Timestamp', errors);
			valid &= this._checkField(correlationId, colVelocityH, 'Horizontal Velocity', errors);
			valid &= this._checkField(correlationId, colVelocityV, 'Vertical Velocity', errors);
			if (!valid)
				return this._error('FeatherweightFlightPathProcessorService', '_check', 'Non Featherweight BlueRaven file detected', errors, AppConstants.FlightPath.Errors.NonBR, null, correlationId);

			return this._successResponse({
				colAltitudeGL: colAltitudeGL,
				colAltitudeSL: colAltitudeSL,
				colLatitude: colLatitude,
				colLongitude: colLongitude,
				colTime: colTime,
				colVelocityH: colVelocityH,
				colVelocityV: colVelocityV,
				colLaunch: colLaunch,
				colApogee: colApogee,
				colLanding: colLanding,
				colFix: colFix
			}, correlationId);
		}
		catch (err) {
			return this._error('FeatherweightFlightPathProcessorService', '_check', 'Non Featherweight BlueRaven file detected', null, AppConstants.FlightPath.Errors.NonBR, null, correlationId);
		}
	}

	_processData(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processData', input, 'input', correlationId);

		const checkResponse = this._check(correlationId, input);
		if (this._hasFailed(checkResponse))
			return checkResponse;

		const indexes = checkResponse.results;
		const colVelocityV = indexes.colVelocityV;

		input.data.shift();

		// A row without a GPS fix has no position worth keeping.
		const rows = (indexes.colFix >= 0)
			? input.data.filter(data => LibraryClientUtility.convertNumber(data[indexes.colFix]) !== 0)
			: input.data;

		const publish = (data, verticalV, index, flightId, flightStart, flightEnd, events) => {
			this._publishI(correlationId, flightId, data, verticalV, index, flightStart, flightEnd, indexes, events);
		};

		// Newer exports carry the device's own launch, apogee and landing flags, which are
		// more reliable than inferring the flight from vertical velocity: a file that stops a
		// few rows after touchdown still has its landing.
		if (indexes.colLaunch >= 0 && indexes.colLanding >= 0) {
			const flag = (col) => (data) => String(data[col]).trim().toUpperCase() === 'TRUE';
			this._detectFlightsByFlags(correlationId, rows,
				(data) => data[colVelocityV],
				{
					launch: flag(indexes.colLaunch),
					landing: flag(indexes.colLanding),
					apogee: indexes.colApogee >= 0 ? flag(indexes.colApogee) : null
				},
				publish);
		}
		else
			this._detectFlights(correlationId, rows, (data) => data[colVelocityV], publish);

		return this._success(correlationId);
	}

	_publishI(correlationId, flightId, data, verticalV, index, flightStart, flightEnd, indexes, events) {
		this._publish(correlationId, {
			flightId: flightId,
			time: data[indexes.colTime],
			altitude: data[indexes.colAltitudeGL],
			altitudeASL: data[indexes.colAltitudeSL],
			altitudeAGL: data[indexes.colAltitudeGL],
			latitude: data[indexes.colLatitude],
			longitude: data[indexes.colLongitude],
			velocityH: data[indexes.colVelocityH],
			velocityV: verticalV,
			index: index,
			tracker: null,
			flightStart: flightStart,
			flightEnd: flightEnd,
			events: events ?? []
		});
	}

	_processDataSort(correlationId) {
		return this._successResponse((a, b) => {
			if (a.time > b.time)
				return 1;
			if (a.time < b.time)
				return -1;

			return 0;
		}, correlationId);
	}
}

export default FeatherweightFlightPathProcessorService;
