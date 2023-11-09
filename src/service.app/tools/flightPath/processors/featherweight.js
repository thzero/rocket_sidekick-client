import AppUtility from '@/utility/app';

import FlightPathProcessorService from './index';

class FeatherweightFlightPathProcessorService extends FlightPathProcessorService {
	get id() {
		return 'featherweight';
	}

	_processData(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processData', input, 'input', correlationId);

		const regex = /^[a-z]+$/i;
		const temp = input.data[0][0];
		if ((regex.exec(temp)) === null)
			return this._error('FeatherweightFlightPathProcessorService', '_processData', 'unknown Featherweight file type without headers', null, null, null, correlationId);

		let type = null;
		if (temp === 'TRACKER')
			type = 'gs';
		else if (temp === 'UTCTIME')
			type = 'tracker';
		if (type === null)
			return this._error('FeatherweightFlightPathProcessorService', '_processData', 'unknown Featherweight file type detected', null, null, null, correlationId);

		input.data.shift();

		const internalData = {};
		if (type === 'gs') {
			let tracker = null;
			let temp;
			for (const data of input.data) {
				temp = data[0].trim();
				if (tracker !== temp)
					internalData[temp] = internalData[temp] ?? [];

				internalData[temp].push(data);
				tracker = temp;
			}
		}
		else
			internalData['tracker'] = input.data;

		// how many consecutive 0s qualifies as a end of flight?
		let consectutiveZeros = 0;
		const consectutiveZerosMax = 5;
		let flightId = 0;
		let flightDetected;
		let flightEnded;
		let flightStarted;
		let index = 0;
		let verticalV;
		const verticalVThreshold = 10;
		const verticalVThresholdNeg = -10;
		let length = 0;
		for (const [key, value] of Object.entries(internalData)) {
			consectutiveZeros = 0;
			flightDetected = null;
			flightEnded = false;
			flightStarted = false;
			index = 0;
			verticalV = null;

			length = value.length;
			for (const data of value) {
				index++;
				verticalV = AppUtility.convertNumber(data[8]);
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
					this._publishI(correlationId, type, flightId, data, verticalV, index, flightStarted, flightEnded);
					continue;
				}

				// if (type === 'gs') {
				// 	this._publish(
				// 		correlationId,
				// 		flightId,
				// 		// data[2], // time
				// 		// data[5] - 595.67, // altitude
				// 		// data[3], // latitude
				// 		// data[4], // longitude
				// 		// data[7], // verticalH
				// 		// verticalV // verticalV
				// 		data[2], // time
				// 		data[5], // altitude
				// 		data[3], // latitude
				// 		data[4], // longitude
				// 		data[7], // verticalH
				// 		verticalV, // verticalV
				// 		null,
				// 		null,
				// 		null,
				// 		null,
				// 		null,
				// 		index,
				// 		data[0].trim(),
				// 		flightStarted,
				// 		flightEnded
				// 	);
				// }
				// else if (type === 'tracker') {
				// 	this._publish(
				// 		correlationId,
				// 		flightId,
				// 		// data[2], // time
				// 		// data[5] - 595.67, // altitude
				// 		// data[3], // latitude
				// 		// data[4], // longitude
				// 		// data[7], // verticalH
				// 		// verticalV // verticalV
				// 		data[1], // time
				// 		data[2], // altitude
				// 		data[3], // latitude
				// 		data[4], // longitude
				// 		data[7], // verticalH
				// 		verticalV, // verticalV
				// 		null,
				// 		null,
				// 		null,
				// 		null,
				// 		null,
				// 		index,
				// 		null,
				// 		flightStarted,
				// 		flightEnded
				// 	);
				// }

				if (index+1 === length) {
					this._publishI(correlationId, type, flightId, data, verticalV, index, flightStarted, true);
					continue;
				}
				
				this._publishI(correlationId, type, flightId, data, verticalV, index, flightStarted, flightEnded);
			}
		}

		return this._success(correlationId);
	}

	_publishI(correlationId, type, flightId, data, verticalV, index, flightStart, flightEnd) {
		if (type === 'gs') {
			this._publish(
				correlationId,
				flightId,
				// data[2], // time
				// data[5] - 595.67, // altitude
				// data[3], // latitude
				// data[4], // longitude
				// data[7], // verticalH
				// verticalV // verticalV
				data[2], // time
				data[5], // altitude
				data[3], // latitude
				data[4], // longitude
				data[7], // verticalH
				verticalV, // verticalV
				null,
				null,
				null,
				null,
				null,
				index,
				data[0] ? data[0].trim() : null,
				flightStart,
				flightEnd
			);
		}
		else if (type === 'tracker') {
			this._publish(
				correlationId,
				flightId,
				// data[2], // time
				// data[5] - 595.67, // altitude
				// data[3], // latitude
				// data[4], // longitude
				// data[7], // verticalH
				// verticalV // verticalV
				data[1], // time
				data[2], // altitude
				data[3], // latitude
				data[4], // longitude
				data[7], // verticalH
				verticalV, // verticalV
				null,
				null,
				null,
				null,
				null,
				index,
				null,
				flightStart,
				flightEnd
			);
		}
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
