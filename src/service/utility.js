import LibraryConstants from '@thzero/library_client/constants.js';

import GlobalUtility from '@thzero/library_client/utility/global';

import UtilityService from '@thzero/library_client/service/utility';

class AppUtilityService extends UtilityService {
	async content(correlationId) {
		try {
			const body = {
				locale: GlobalUtility.$trans.locale
			};
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'utility/content' }, body);
			this._logger.debug('AppUtilityService', 'content', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('AppUtilityService', 'content', null, err, null, null, correlationId);
		}
	}

	async contentMarkup(correlationId, contentId) {
		this._enforceNotEmpty('AppUtilityService', 'contentMarkup', contentId, 'contentId', correlationId);

		try {
			const body = {
				locale: GlobalUtility.$trans.locale,
				contentId: contentId
			};
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'utility/content/markup' }, body);
			this._logger.debug('AppUtilityService', 'contentMarkup', 'response', response, correlationId);
			return response;
		}
		catch (err) {
			return this._error('AppUtilityService', 'contentMarkup', null, err, null, null, correlationId);
		}
	}
}

export default AppUtilityService;
