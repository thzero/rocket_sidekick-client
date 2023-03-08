import restCommunicationService from '@thzero/library_client_service_rest_fetch';

import BaseServiceBoot from '@/boot/services';

class AppServiceBoot extends BaseServiceBoot {
	_initialize() {
		super._initialize();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}
}

export default AppServiceBoot;
