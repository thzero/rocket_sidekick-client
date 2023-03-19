import AppUtilityService from '@/service/utility';

class WebUtilityService extends AppUtilityService {

	async initialize(correlationId) {
		const response = super.initialize(correlationId);

		(async () => {
			await this._serviceStore.dispatcher.requestManufacturers(correlationId);
		})();

		return response;
	}
}

export default WebUtilityService;
