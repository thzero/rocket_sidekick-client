import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import BaseService from '@thzero/library_client/service/index';

class FlightPathProcessorFilterService extends BaseService {
	constructor() {
		super();
		
		this.results = {
			count: 0,
			total: 0
		};
	}

	async init(injector) {
		await super.init(injector);
	}
	
	initialize() {
		this.results = {
			count: 0,
			total: 0
		};
	}

	_filter(data) {
		throw new NotImplementedError();
	}

	filter(data) {
		this._enforceNotNull('FlightPathProcessorFilterService', 'filter', data, 'data', correlationId);
		this._enforceNotNull('FlightPathProcessorFilterService', 'filter', data.latitude, 'data.latitude', correlationId);
		this._enforceNotNull('FlightPathProcessorFilterService', 'filter', data.longitude, 'data.longitude', correlationId);
		this._enforceNotNull('FlightPathProcessorFilterService', 'filter', data.altitude, 'data.altitude', correlationId);

		try {
			this.results.total++;

			return this._filter(data);
		}
		finally {
			this._previous = data;
		}
	}
}

export default FlightPathProcessorFilterService;
