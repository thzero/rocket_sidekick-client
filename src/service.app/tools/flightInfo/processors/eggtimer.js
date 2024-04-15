import AppConstants from '@/constants';

import FlightInfoProcessorService from './index';

class EggtimerFlightInfoProcessorService extends FlightInfoProcessorService {
	get id() {
		return 'eggtimer';
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
		this._enforceNotNull('EggtimerFlightInfoProcessorService', '_check', input, 'input', correlationId);

		try {
			const regex = /^[a-z]+$/i;
			const temp = input.data[0][4];
			if ((regex.exec(temp)) === null)
				return this._error('EggtimerFlightInfoProcessorService', '_check', 'Eggtimer Quantum file type without headers', null, AppConstants.FlightInfo.Errors.WithoutHeaders, null, correlationId);

			let type = null;
			if (temp !== 'FVeloc')
				return this._error('EggtimerFlightInfoProcessorService', '_check', 'Non Eggtimer Quantum file type detected', null, AppConstants.FlightInfo.Errors.NonQuantum, null, correlationId);

			return this._successResponse(type, correlationId);
		}
		catch (err) {
			return this._error('EggtimerFlightInfoProcessorService', '_check', 'Non Eggtimer Quantumfile detected', null, AppConstants.FlightInfo.Errors.NonQuantum, null, correlationId);

		}
	}

	_processInput(correlationId, input) {
		this._enforceNotNull('EggtimerFlightInfoProcessor', '_processInput', input, 'input', correlationId);

		// const regex = /^[a-z]+$/i;
		// const temp = input.data[0][4];
		// if ((regex.exec(temp)) !== null)
		// 	input.data.shift();

		const checkResponse = this._check(correlationId, input);
		if (this._hasFailed(checkResponse))
			return checkResponse;

		input.data.shift();

		for (const data of input.data) {
			this._publish(
				correlationId,
				data[0], // time
				data[1], // altitude
				data[3], // altitudeF
				data[2], // velocity
				data[4], // velocityF
				data[7], // apogee
				data[8], // noseOver
				data[9], // drogue
				data[10], // main
				data.length < 1 // ground
			);
		}

		return this._success(correlationId);
	}
}

export default EggtimerFlightInfoProcessorService;
