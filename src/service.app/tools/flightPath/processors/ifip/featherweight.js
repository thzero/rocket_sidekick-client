import LibraryClientUtility from '@thzero/library_client/utility/index';

import AppConstants from '@/constants';
import FlightPathProcessorService from '../index';

class FeatherweightFlightPathProcessorService extends FlightPathProcessorService {
	get id() {
		return 'featherweightIFIP';
	}

	get name() {
		return 'Featherweight IFIP';
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
			const regex = /^[a-z]+$/i;
			const temp = input.data[0][0];
			if ((regex.exec(temp)) === null)
				return this._error('FeatherweightFlightPathProcessorService', '_check', 'Featherweight IFIP file type without headers', null, AppConstants.FlightPath.Errors.WithoutHeaders, null, correlationId);

			let type = null;
			if (temp === 'TRACKER')
				type = 'gs';
			else if (temp === 'UTCTIME')
				type = 'tracker';
			if (type === null)
				return this._error('FeatherweightFlightPathProcessorService', '_check', 'Non Featherweight IFIP file type detected', null, AppConstants.FlightPath.Errors.NonIFIP, null, correlationId);

			return this._successResponse(type, correlationId);
		}
		catch (err) {
			return this._error('FeatherweightFlightPathProcessorService', '_check', 'Non Featherweight IFIP file detected', null, AppConstants.FlightPath.Errors.NonIFIP, null, correlationId);
		}
	}

	_processData(correlationId, input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processData', input, 'input', correlationId);

		const checkResponse = this._check(correlationId, input);
		if (this._hasFailed(checkResponse))
			return checkResponse;

		const type = checkResponse.results;
		input.data.shift();

		// A ground station file can carry several trackers; each is its own flight.
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

		// Flight ids stay unique across trackers so each tracker's flights are separate branches.
		let flightId = 0;
		for (const [key, value] of Object.entries(internalData)) {
			flightId = this._detectFlights(correlationId, value,
				(data) => data[8],
				(data, verticalV, index, id, flightStart, flightEnd) => {
					this._publishI(correlationId, type, id, data, verticalV, index, flightStart, flightEnd);
				},
				flightId);
		}

		return this._success(correlationId);
	}

	_publishI(correlationId, type, flightId, data, verticalV, index, flightStart, flightEnd) {
		if (type === 'gs') {
			// A ground station log only reports height above the ground.
			this._publish(correlationId, {
				flightId: flightId,
				time: data[2],
				altitude: data[5],
				altitudeASL: null,
				altitudeAGL: data[5],
				latitude: data[3],
				longitude: data[4],
				velocityH: data[7],
				velocityV: verticalV,
				index: index,
				tracker: data[0] ? data[0].trim() : null,
				flightStart: flightStart,
				flightEnd: flightEnd
			});
		}
		else if (type === 'tracker') {
			// A tracker log only reports height above sea level.
			this._publish(correlationId, {
				flightId: flightId,
				time: data[1],
				altitude: data[2],
				altitudeASL: data[2],
				altitudeAGL: null,
				latitude: data[3],
				longitude: data[4],
				velocityH: data[7],
				velocityV: verticalV,
				index: index,
				tracker: null,
				flightStart: flightStart,
				flightEnd: flightEnd
			});
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
