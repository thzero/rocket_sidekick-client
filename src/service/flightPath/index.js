import Constants from '@/constants';

import AppUtility from '@/utility/app';

import Results from '../results';

import BaseService from '@thzero/library_client/service/index';

class FlightPathProcessorService extends BaseService {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	init(injector) {
		// TODO: Convert to library
		const serviceFlightPathProcessorFeatherweight = injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT);
		this.registerProcessor(serviceFlightPathProcessorFeatherweight);
	}

	get styleDefault() {
		return {
			path: {
				flight: {
					color: '#0000ff'
				},
				ground: {
					color: '#000000'
				}
			},
			pin: {
				launch: {
					color: '#ff0000'
				},
				touchdown: {
					color: '#00ff00'
				}
			}
		};
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(data, processorId, measurementUnits, flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', 'process', data, 'data');
		this._enforceNotEmpty('FlightPathProcessorService', 'process', processorId, 'processorId');
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits');
		this._enforceNotNull('FlightPathProcessorService', 'process', flightInfo, 'flightInfo');

		const results = new Results();

		if (AppUtility.isNull(data)) {
			results.errors.push('errors.process.noInput');
			return results;
		}

		if (String.isNullOrEmpty(processorId)) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		const processor = this._determineProcessor(processorId);
		if (!processor) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		results.info = this._initialize(flightInfo);
		processor.process(results, data, measurementUnits);
		AppUtility.debug2('results.info', results.info);

		return results;
	}

	_determineProcessor(processorId) {
		this._enforceNotEmpty('FlightPathProcessorService', '_determineProcessor', processorId, 'processorId');

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(flightInfo) {
		this._enforceNotNull('FlightPathProcessorService', '_initialize', flightInfo, 'flightInfo');

		flightInfo.flightPath = [];
		return flightInfo;
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightPathProcessorService', 'registerProcessor', service, 'service');

		this._serviceProcessors.push(service);
	}
}

export default FlightPathProcessorService;
