import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import FlightPathProcessorService from '../index';

class FeatherweightFlightPathProcessorService extends FlightPathProcessorService {
	get id() {
		return 'featherweightBR';
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
			}, correlationId);
		}
		catch (err) {
			return this._error('FeatherweightFlightPathProcessorService', '_check', 'Non Featherweight BlueRaven file detected', null, AppConstants.FlightPath.Errors.NonBR, null, correlationId);
		}
	}

	_processData(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processData', input, 'input', correlationId);

		// if (!input.data || input.data.length <= 0 || input.data[0].length <= 0)
		// 	return this._error('FeatherweightFlightPathProcessorService', '_processData', 'Unknown Featherweight BlueRaven file is without headers', null, null, null, correlationId);

		// const colAltitude = this.columnIndexOf('V');
		// const colLatitude = this.columnIndexOf('H');
		// const colLong = this.columnIndexOf('I');
		// const colVelocityH = this.columnIndexOf('K');
		// const colVelocityV = this.columnIndexOf('L');
		// if (
		// 	input.data[0][colAltitude] === 'Alt AGL (ft)' && 
		// 	input.data[0][colLatitude] === 'TRACKER Lat' && 
		// 	input.data[0][colLongitude] === 'TRACKER Lon' && 
		// 	input.data[0][colVelocityH] === 'HORZV' && 
		// 	input.data[0][colVelocityV] === 'VERTV'
		// )
		// 	return this._error('FeatherweightFlightPathProcessorService', '_processData', 'Unknown Featherweight BlueRaven file detected', null, null, null, correlationId);

		const checkResponse = this._check(correlationId, input);
		if (this._hasFailed(checkResponse))
			return checkResponse;

		// const colAltitude = checkResponse.colAltitude;
		// const colLatitude = checkResponse.colLatitude;
		// const colLongitude = checkResponse.colLongitude;
		// const colVelocityH = checkResponse.colVelocityH;
		const colVelocityV = checkResponse.results.colVelocityV;

		input.data.shift();

		const internalData = {};
		// let tracker = null;
		// let temp;
		let index = 0;
		// for (const data of input.data) {
		// 	temp = data[0].trim();

		// 	// For some reason the BlueRaven (3/25/2024) is dumping out the same set of data twice.
		// 	if (temp === 'TRACKER')
		// 		break;

		// 	if (tracker !== temp)
		// 		internalData[temp] = internalData[temp] ?? [];

		// 	data[data.length] = index++;
		// 	internalData[temp].push(data);
		// 	tracker = temp;
		// }
		internalData['tracker'] = input.data;

		// how many consecutive 0s qualifies as a end of flight?
		let consectutiveZeros = 0;
		const consectutiveZerosMax = 5;
		let flightId = 0;
		let flightDetected;
		let flightEnded;
		let flightStarted;
		let verticalV;
		const verticalVThreshold = 10;
		const verticalVThresholdNeg = -10;
		let length = 0;
		for (const [key, value] of Object.entries(internalData)) {
			consectutiveZeros = 0;
			flightDetected = null;
			flightEnded = false;
			flightStarted = false;
			verticalV = null;

			length = value.length;
			for (const data of value) {
				verticalV = LibraryClientUtility.convertNumber(data[colVelocityV]);
				flightEnded = false;
				flightStarted = false;
				
				// has not detected a flight...
				if (!flightDetected) {
					if (verticalV > 0 && verticalV < verticalVThreshold)
						continue;
					if (verticalV > verticalVThresholdNeg && verticalV <= 0)
						continue;

					// as soon as we get a above min. vertical then we have a "flight"
					if (verticalV > verticalVThreshold) {
						flightDetected = true;
						flightEnded = false;
						flightStarted = true;
						consectutiveZeros = 0;
						flightId++;
					}
				}

				//if ((verticalV > verticalVThresholdNeg && verticalV < verticalVThreshold)) {
				if ((verticalV >= -1 && verticalV <= 1)) {
					// consecutive records at or around 0
					// 0 is a valid value during a flight
					consectutiveZeros++;
				}
				if (consectutiveZeros > consectutiveZerosMax) {
					// consecutive records at or around 0
					// 0 is a valid value during a flight
					flightDetected = false;
					flightEnded = true;
					consectutiveZeros = 0;
					this._publishI(correlationId, flightId, data, verticalV, flightStarted, flightEnded, checkResponse.results);
					continue;
				}
				if (consectutiveZeros >= 1) {
					// if its not zero again...
					if ((verticalV <= -1 || verticalV >= 1)) {
						// reset
						consectutiveZeros = 0;
					}
				}
				if (consectutiveZeros > 0) {
					// if its a consecutiveZero count, then ignore it...
					continue;
				}

				if (index+1 === length) {
					this._publishI(correlationId, flightId, data, verticalV, flightStarted, true, checkResponse.results);
					continue;
				}
				
				this._publishI(correlationId, flightId, data, verticalV, flightStarted, flightEnded, checkResponse.results);
			}
		}

		return this._success(correlationId);
	}

	_publishI(correlationId, flightId, data, verticalV, flightStart, flightEnd, indexes) {
		this._publish(
			correlationId,
			flightId,
			// data[2], // time
			// data[5] - 595.67, // altitude
			// data[3], // latitude
			// data[4], // longitude
			// data[7], // verticalH
			// verticalV // verticalV
			data[indexes.colTime], // time
			data[indexes.colAltitudeGL], // altitude AGL
			data[indexes.colAltitudeSL], // altitude ASL
			data[indexes.colAltitudeGL], // altitude AGL
			data[indexes.colLatitude], // latitude
			data[indexes.colLongitude], // longitude
			data[indexes.colVelocityH], // verticalH
			verticalV, // verticalV
			null,
			null,
			null,
			null,
			null,
			data[data.length-1],
			data[0] ? data[0].trim() : null,
			flightStart,
			flightEnd
		);
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
