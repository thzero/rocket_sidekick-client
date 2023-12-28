import LibraryClientUtility from '@thzero/library_client/utility/index';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import BaseService from '@thzero/library_client/service/index';

class FlightPathOutputService extends BaseService {
	initialize(correlationId) {
		return this._success(correlationId);
	}

	output(correlationId, results, flightInfo, data, serviceTemplate) {
		throw NotImplementedError();
	}

	_round(value, places = 2) {
		return LibraryClientUtility.convertNumber(value.toFixed(places));
	}

	_reverseRgb(str) {
		// return str.replace('#', '').split('').reverse().join('');
		str = str.replace('#', '');
		// rgb to bgr
		return str[4] + str[5] + str[2] + str[3] + str[0] + str[1];
	}
}

export default FlightPathOutputService;
