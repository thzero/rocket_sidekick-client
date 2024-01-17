import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtilityService from '@/service/utility';

class WebUtilityService extends AppUtilityService {

	async initialize(correlationId) {
		const response = super.initialize(correlationId);

		(async () => {
			await this._serviceStore.dispatcher.requestCountries(correlationId);
			await this._serviceStore.dispatcher.requestManufacturers(correlationId);
		})();

		return response;
	}

	async contentReset(correlationId, contentId) {
		try {
			const body = {
				contentId: contentId != null ? contentId : null
			};

			const response = await this._serviceCommunicationRest.post(correlationId, LibraryClientConstants.ExternalKeys.BACKEND, { url: 'utility/content/reset' }, body);
			this._logger.debug('AppUtilityService', 'contentReset', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('AppUtilityService', 'contentReset', null, err, null, null, correlationId);
		}
	}
}

export default WebUtilityService;
