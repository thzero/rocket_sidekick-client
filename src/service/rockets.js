import LibraryConstants from '@thzero/library_client/constants.js';

import RestExternalService from '@thzero/library_client/service/externalRest';

class RocketsService extends RestExternalService {
	async listing(correlationId, params) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'rockets/listing' }, params);
			this._logger.debug('RocketsService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('RocketsService', 'listing', null, err, null, null, correlationId);
		}
	}
    
	async listingUsers(correlationId, params) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'rockets/listing/user' }, params);
			this._logger.debug('RocketsService', 'listingUsers', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('RocketsService', 'listingUsers', null, err, null, null, correlationId);
		}
	}
}

export default RocketsService;
