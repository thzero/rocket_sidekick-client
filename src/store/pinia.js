import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import CommonUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';

class AppStore extends BaseStore {
	_initModules() {
		// Admin Update
	}

	_initPluginPersistConfig() {
		return {
			root: {
				key: 'rocketsidekick',
				storage: localStorage,
				paths: [
					'flightInfoDataTypeUse',
					'flightInfoProcessor',
					'flightInfoResolution',
					'flightInfoStyle',
					'flightMeasurementUnits',
					'flightPathProcessor',
					'flightPathStyle',
					'motorManufacturers',
					'motorSearchCriteria',
					'motorSearchResults'
				]
			}
			// pinia2
			// root: {
			// 	key: 'rocket_sidekick',
			// 	includePaths: [
			// 		'flightInfoResolution',
			// 		'flightInfoStyle',
			// 		'flightPathStyle',
			// 		'motorManufacturers',
			// 		'motorSearchCriteria',
			// 		'motorSearchResults',
			// 	]
			// }
		};
	}

	_initStoreConfig() {
		return {
			state: () => ({
				checksumLastUpdate: [],
				content: [],
				flightInfoDataTypeUse: null,
				flightDate: '',
				flightInfoProcessor: null,
				flightInfoResolution: Constants.FlightInfo.Resolution,
				flightInfoStyle: [],
				flightLocation: '',
				flightMeasurementUnits: null,
				flightPathProcessor: null,
				flightPathStyle: [],
				flightTitle: '',
				motorManufacturers: [],
				motorSearchCriteria: {},
				motorSearchResults: {},
				thrust2weight: {},
				toolSettings: []
			}),
			actions: {
				async _initialize(correlationId, results) {
					await this.setContent(correlationId, results.content);
				},
				async requestMotor(correlationId, motorId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.motor(correlationId, motorId, this.motorSearchResults);
					this.$logger.debug('store', 'requestMotor', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorSearchResults = response.results.data;
						return response.results.motor;
					}

					return null;
				},
				async requestMotorManufacturers(correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.manufacturers(correlationId, this.motorManufacturers);
					this.$logger.debug('store', 'requestMotorManufacturers', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorManufacturers = response.results;
						return this.motorManufacturers.manufacturers;
					}

					return [];
				},
				async requestMotorSearchReset(correlationId) {
					this.motorManufacturers.ttl = null;
					this.motorManufacturers.last = null;
					this.motorSearchResults.ttl = null;
					this.motorSearchResults.last = null;
				},
				async requestMotorSearchResults(correlationId, criteria) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.search(correlationId, criteria, this.motorSearchResults);
					this.$logger.debug('store', 'requestMotorSearchResults', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorSearchResults = response.results.data;
						return response.results.filtered;
					}

					return [];
				},
				async setFlightInfoDataTypeUse(correlationId, value) {
					this.flightInfoDataTypeUse = value;
				},
				async setFlightDate(correlationId, value) {
					this.flightDate = value;
				},
				async setFlightInfoProcessor(correlationId, value) {
					this.flightInfoProcessor = value;
				},
				async setFlightInfoResolution(correlationId, value) {
					this.flightInfoResolution = value;
				},
				async setFlightInfoStyle(correlationId, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightInfoStyle)
						this.flightInfoStyle = [];
					this.flightInfoStyle = CommonUtility.updateArrayByObject(this.flightInfoStyle, value);
				},
				async setFlightLocation(correlationId, value) {
					this.flightLocation = value;
				},
				async setFlightMeasurementUnits(correlationId, value) {
					this.flightMeasurementUnits = value;
				},
				async setFlightPathProcessor(correlationId, value) {
					this.flightPathProcessor = value;
				},
				async setFlightPathStyle(correlationId, value) {
					if (String.isNullOrEmpty(value.id))
						return;
					if (!this.flightPathStyle)
						this.flightPathStyle = [];
					this.flightPathStyle = CommonUtility.updateArrayByObject(this.flightPathStyle, value);
				},
				async setFlightTitle(correlationId, value) {
					this.flightTitle = value;
				},
				async setMotorSearchCriteria(correlationId, value) {
					this.motorSearchCriteria = value;
				},
				async setMotorSearchResults(correlationId, value) {
					this.motorSearchResults = value;
				},
				async setContent(correlationId, content) {
					this.$logger.debug('store', 'setContent', 'content.a', content, correlationId);
					this.$logger.debug('store', 'setContent', 'content.b', this.content, correlationId);
					this.content = content;
					this.$logger.debug('store', 'setContent', 'content.c', this.content, correlationId);
				}
			},
			getters: {
				getFlightDate() {
					return GlobalUtility.$store.flightDate;
				},
				getFlightInfoDataTypeUse() {
					const value = GlobalUtility.$store.flightInfoDataTypeUse;
					return value !== null ? value : true;
				},
				getFlightInfoProcessor() {
					return GlobalUtility.$store.flightInfoProcessor;
				},
				getFlightInfoResolution() {
					return GlobalUtility.$store.flightInfoResolution;
				},
				getFlightInfoStyle() {
					if (!GlobalUtility.$store.flightInfoStyle)
						return null;
					return GlobalUtility.$store.flightInfoStyle.find(l => l.id);
				},
				getFlightLocation() {
					return GlobalUtility.$store.flightLocation;
				},
				getFlightMeasurementUnits() {
					return GlobalUtility.$store.flightMeasurementUnits;
				},
				getFlightPathProcessor() {
					return GlobalUtility.$store.flightPathProcessor;
				},
				getFlightPathStyle() {
					if (!GlobalUtility.$store.flightPathStyle)
						return null;
					return GlobalUtility.$store.flightPathStyle.find(l => l.id);
				},
				getFlightTitle() {
					return GlobalUtility.$store.flightTitle;
				},
				getsetMotorSearchCriteria() {
					return GlobalUtility.$store.motorSearchCriteria;
				},
				async getMotorSearchCriteria() {
					return GlobalUtility.$store.motorSearchCriteria;
				}
			},
			dispatcher: {
				async requestMotor(correlationId, motorId) {
					return await GlobalUtility.$store.requestMotor(correlationId, motorId);
				},
				async requestMotorManufacturers(correlationId, results) {
					return await GlobalUtility.$store.requestMotorManufacturers(correlationId, results);
				},
				async requestMotorSearchReset(correlationId) {
					return await GlobalUtility.$store.requestMotorSearchReset(correlationId);
				},
				async requestMotorSearchResults(correlationId, criteria) {
					return await GlobalUtility.$store.requestMotorSearchResults(correlationId, criteria);
				},
				async setFlightInfoDataTypeUse(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoDataTypeUse(correlationId, value);
				},
				async setFlightDate(correlationId, value) {
					await GlobalUtility.$store.setFlightDate(correlationId, value);
				},
				async setFlightInfoProcessor(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoProcessor(correlationId, value);
				},
				async setFlightInfoResolution(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoResolution(correlationId, value);
				},
				async setFlightInfoStyle(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoStyle(correlationId, value);
				},
				async setFlightLocation(correlationId, value) {
					await GlobalUtility.$store.setFlightLocation(correlationId, value);
				},
				async setFlightMeasurementUnits(correlationId, value) {
					await GlobalUtility.$store.setFlightMeasurementUnits(correlationId, value);
				},
				async setFlightPathProcessor(correlationId, value) {
					await GlobalUtility.$store.setFlightPathProcessor(correlationId, value);
				},
				async setFlightPathStyle(correlationId, value) {
					await GlobalUtility.$store.setFlightPathStyle(correlationId, value);
				},
				async setFlightTitle(correlationId, value) {
					await GlobalUtility.$store.setFlightTitle(correlationId, value);
				},
				async setMotorSearchCriteria(correlationId, value) {
					await GlobalUtility.$store.setMotorSearchCriteria(correlationId, value);
				}
			}
		};
	}
}

export default AppStore;
