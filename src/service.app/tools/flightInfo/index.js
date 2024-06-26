import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import Results from '@/service/tools/results';

import BaseService from '@thzero/library_client/service/index';

class FlightInfoProcessorService extends BaseService {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	async init(injector) {
		await super.init(injector);

		// TODO: Convert to library
		const serviceFlightInfoProcessorEggtimer = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR_EGGTIMER);
		this.registerProcessor(serviceFlightInfoProcessorEggtimer);
	}

	get styleDefault() {
		return {
			altitude: {
				color: '#00FFFF'
			},
			altitudeF: {
				color: '#0000FF'
			},
			event: {
				apogee: {
					color: '#000000'
				},
				apogeeBorder: {
					color: '#000000'
				},
				drogue: {
					color: '#FF0000'
				},
				drogueBorder: {
					color: '#FF0000'
				},
				main: {
					color: '#FF8C00'
				},
				mainBorder: {
					color: '#FF8C00'
				}
			},
			velocity: {
				color: '#00FF00'
			},
			velocityF: {
				color: '#00AA00'
			}
		};
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	check(correlationId, data, processorId) {
		this._enforceNotNull('FlightInfoProcessorService', 'check', data, 'data', correlationId);
		// this._enforceNotEmpty('FlightInfoProcessorService', 'check', processorId, 'processorId', correlationId);

		if (String.isNullOrEmpty(processorId))
			return this._error('FlightInfoProcessorService', 'check', 'No processor id', null, AppConstants.FlightInfo.Errors.NoProcessor, null, correlationId);

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor)
			return this._error('FlightInfoProcessorService', 'check', 'Invalid processor', null, AppConstants.FlightInfo.Errors.NoProcessor, null, correlationId);

		return processor.check(correlationId, data);
	}

	process(correlationId, data, processorId, measurementUnits, dataTypes) {
		this._enforceNotNull('FlightInfoProcessorService', 'process', data, 'data', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', processorId, 'processorId', correlationId);
		this._enforceNotNull('FlightInfoProcessorService', 'process', measurementUnits, 'measurementUnits', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.id, 'measurementUnits.id', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.accelerationId, 'measurementUnits.accelerationId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.altitudeId, 'measurementUnits.altitudeId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.velocityId, 'measurementUnits.velocityId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.outputId, 'measurementUnits.outputId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.accelerationtId, 'measurementUnits.accelerationtId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.altitudeOutputId, 'measurementUnits.altitudeOutputId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', measurementUnits.velocityOutputId, 'measurementUnits.velocityOutputId', correlationId);
		this._enforceNotEmpty('FlightInfoProcessorService', 'process', dataTypes, 'dataTypes', correlationId);

		const results = new Results();

		const processor = this._determineProcessor(correlationId, processorId);
		if (!processor) {
			return this._error('FlightInfoProcessorService', 'process', 'Invalid processor', null, AppConstants.FlightInfo.Errors.NoProcessor, null, correlationId);
		}

		results.info = this._initialize();
		results.info.dataTypes = dataTypes;
		processor.process(correlationId, results, data, measurementUnits);
		LibraryClientUtility.debug2(results.info);

		return results;
	}

	processOutputJson(correlationId, flightInfo) {
		this._enforceNotNull('FlightInfoProcessorService', 'processOutputJson', flightInfo, 'flightInfo', correlationId);

		return JSON.stringify(flightInfo);
	}

	processOutputText(correlationId, flightInfo) {
		this._enforceNotNull('FlightInfoProcessorService', 'processOutputJson', flightInfo, 'flightInfo', correlationId);

		/*
			const output = `
Flight Time			${this.flightInfo?.events?.ground?.time}
Max. Altitude		${flightTime}
Velocity
	Ascent
		Max.		${flightTime}
		Avg.		${flightTime}
	Descent
		Drogue
			Max.	${flightTime}
			Avg.	${flightTime}
		Main
			Max.	${flightTime}
			Avg.	${flightTime}
Acceleration
	Max.			${flightTime}
	Min.			${flightTime}
	Descent
		Drogue
			Max.	${flightTime}
			Min.	${flightTime}
			Avg.	${flightTime}
		Main
			Max.	${flightTime}
			Min.	${flightTime}
			Avg.	${flightTime}
Events
	Apogee			${flightTime}
	Nose Over		${flightTime}
	Drogue			${flightTime}
	Main			${flightTime}
`;
*/
	}

	_determineProcessor(correlationId, processorId) {
		this._enforceNotEmpty('FlightInfoProcessorService', '_determineProcessor', processorId, 'processorId', correlationId);

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(correlationId) {
		return {
			acceleration: {
				avg: {
					temp: 0,
					tempF: 0,
					value: 0,
					valueF: 0,
					count: 0,
					countF: 0
				},
				max: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0
				},
				min: {
					altitude: 0,
					altitudeF: 0,
					drogue: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					time: 0,
					value: 0
				}
			},
			altitude: {
				data: [],
				dataF: [],
				max: 0,
				maxF: 0
			},
			style: {
				altitude: {
					color: this.styleDefault.altitude.color
				},
				altitudeF: {
					color: this.styleDefault.altitudeF.color
				},
				event: {
					apogee: {
						color: this.styleDefault.event.apogee.color
					},
					apogeeBorder: {
						color: this.styleDefault.event.apogeeBorder.color
					},
					drogue: {
						color: this.styleDefault.event.drogue.color
					},
					drogueBorder: {
						color: this.styleDefault.event.drogueBorder.color
					},
					main: {
						color: this.styleDefault.event.main.color
					},
					mainBorder: {
						color: this.styleDefault.event.mainBorder.color
					}
				},
				velocity: {
					color: this.styleDefault.velocity.color
				},
				velocityF: {
					color: this.styleDefault.velocityF.color
				}
			},
			date: null,
			dataTypes: {
				actual: false,
				actualShow: false,
				filtered: true
			},
			events: {
				apogee: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				drogue: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				ground: {
					time: 0
				},
				main: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				noseOver: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				}
			},
			location: null,
			measurementUnits: null,
			time: [],
			title: null,
			velocity: {
				avg: {
					temp: 0,
					tempF: 0,
					value: 0,
					valueF: 0,
					count: 0,
					countF: 0
				},
				data: [],
				dataF: [],
				max: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0
				},
				min: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0,
					drogue: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						data: [],
						dataF: [],
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						data: [],
						dataF: [],
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					}
				}
			}
		};
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightInfoProcessorService', 'service', service, 'service');

		this._serviceProcessors.push(service);
	}
}

export default FlightInfoProcessorService;
