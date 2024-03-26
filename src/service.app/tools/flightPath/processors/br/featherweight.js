
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

	_processData(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processData', input, 'input', correlationId);

		if (!input.data || input.data.length <= 0 || input.data[0].length <= 0)
			return this._error('FeatherweightFlightPathProcessorService', '_processData', 'Unknown Featherweight BlueRaven file is without headers', null, null, null, correlationId);

		const colAltitude = this.columnIndexOf('V');
		const colLat = this.columnIndexOf('H');
		const colLong = this.columnIndexOf('I');
		const colHVert = this.columnIndexOf('K');
		const colVVert = this.columnIndexOf('L');
		if (
			input.data[0][colAltitude] === 'Alt AGL (ft)' && 
			input.data[0][colLat] === 'TRACKER Lat' && 
			input.data[0][colLong] === 'TRACKER Lon' && 
			input.data[0][colHVert] === 'HORZV' && 
			input.data[0][colVVert] === 'VERTV'
		)
			return this._error('FeatherweightFlightPathProcessorService', '_processData', 'Unknown Featherweight BlueRaven file detected', null, null, null, correlationId);

		input.data.shift();

		const internalData = {};
		let tracker = null;
		let temp;
		let index = 0;
		for (const data of input.data) {
			temp = data[0].trim();

			// For some reason the BlueRaven (3/25/2024) is dumping out the same set of data twice.
			if (temp === 'TRACKER')
				break;

			if (tracker !== temp)
				internalData[temp] = internalData[temp] ?? [];

			data[data.length] = index++;
			internalData[temp].push(data);
			tracker = temp;
		}

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
				verticalV = LibraryClientUtility.convertNumber(data[colVVert]);
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
					this._publishI(correlationId, flightId, data, verticalV, index, flightStarted, flightEnded);
					continue;
				}

				if (index+1 === length) {
					this._publishI(correlationId, flightId, data, verticalV, index, flightStarted, true);
					continue;
				}
				
				this._publishI(correlationId, flightId, data, verticalV, index, flightStarted, flightEnded);
			}
		}

		return this._success(correlationId);
	}

	_publishI(correlationId, flightId, data, verticalV, index, flightStart, flightEnd) {
		this._publish(
			correlationId,
			flightId,
			// data[2], // time
			// data[5] - 595.67, // altitude
			// data[3], // latitude
			// data[4], // longitude
			// data[7], // verticalH
			// verticalV // verticalV
			data[this.columnIndexOf('C')], // time
			data[this.columnIndexOf('F')], // altitude ASL
			data[this.columnIndexOf('V')], // altitude AGL
			data[this.columnIndexOf('G')], // latitude
			data[this.columnIndexOf('H')], // longitude
			data[this.columnIndexOf('K')], // verticalH
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
