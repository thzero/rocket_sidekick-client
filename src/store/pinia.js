import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants.js';

import GlobalUtility from '@thzero/library_client/utility/global';
import CommonUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';
import Utility from '@thzero/library_common/utility';

class AppStore extends BaseStore {
	// _initModules() {
	// 	// Admin Update
	// }

	_initPluginPersistConfig() {
		return {
			persist: {
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
					'motorSearchResults',
					// 'openSource',
					// 'plans',
					// 'user',
					// 'version'
				]
			}
			// persist2: {
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
				contentTtl: 0,
				contentTtlDiff: 1000 * 60 * 30,
				contentMarkup: [],
				contentMarkupTtl: 0,
				contentMarkupTtlDiff: 1000 * 60 * 30,
				flightInfoDataTypeUse: null,
				flightData: {},
				flightDate: '',
				flightInfoProcessor: null,
				flightInfoResolution: Constants.FlightInfo.Resolution,
				flightInfoStyle: [],
				flightLocation: '',
				flightMeasurementUnits: {
					input: [],
					output: {
						id: null,
						distance: null,
						velocity: null
					}
				},
				flightPathProcessor: null,
				flightPathStyle: [],
				flightTitle: '',
				motorManufacturers: [],
				motorSearchCriteria: {},
				motorSearchResults: {},
				rockets: [],
				rocketsTtl: 0,
				rocketsTtlDiff: 1000 * 60 * 30,
				rocketsUser: [],
				thrust2weight: {},
				toolSettings: []
			}),
			actions: {
				async _initialize(correlationId, results) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_UTILITY);
					const response = await service.content(correlationId);
					if (Response.hasSucceeded(response))
						await this.setContent(correlationId, response.results);
				},
				async requestContent(correlationId) {
					const now = Utility.getTimestamp();
					const ttlContent = this.contentTtl ? this.contentTtl : 0;
					const delta = now - ttlContent;
					if (this.content && (delta <= this.contentTtlDiff))
						return Response.success(correlationId, this.content);

					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_UTILITY);
					const response = await service.content(correlationId);
					this.$logger.debug('store', 'requestContent', 'response', response, correlationId);
					if (Response.hasSucceeded(response))
						await this.setContent(correlationId, response.results);

					return Response.error('store', 'requestContent', null, null, null, null, correlationId);
				},
				async requestContentMarkup(correlationId, contentId) {
					if (String.isNullOrEmpty(contentId))
						return Response.error('store', 'requestContentMarkup', 'contentId', null, null, null, correlationId);

					const now = Utility.getTimestamp();
					const ttlContent = this.contentMarkupTtl ? this.contentMarkupTtl : 0;
					const delta = now - ttlContent;
					if (this.contentMarkup && (delta <= this.contentMarkupTtlDiff)) {
						const content = GlobalUtility.$store.contentMarkup.find(l => l.id.toLowerCase() === contentId.toLowerCase());
						if (!String.isNullOrEmpty(content))
							return Response.success(correlationId, content);
					}

					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_UTILITY);
					const response = await service.contentMarkup(correlationId, contentId);
					this.$logger.debug('store', 'requestContentMarkup', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.setContentMarkup(correlationId, response.results);
						return Response.success(correlationId, response.results);
					}

					return Response.error('store', 'requestContentMarkup', null, null, null, null, correlationId);
				},
				async requestMotor(correlationId, motorId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);
					const response = await service.motor(correlationId, motorId, this.motorSearchResults);
					this.$logger.debug('store', 'requestMotor', 'response', response, correlationId);
					if (Response.hasSucceeded(response)) {
						this.motorSearchResults = response.results.data;
						// return response.results.motor;
						return Response.success(correlationId, response.results.motor);
					}

					return Response.error('store', 'requestMotor', null, null, null, null, correlationId);
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
				async requestRockets(correlationId, params) {
					const now = Utility.getTimestamp();
					const ttlContent = this.rocketsTtl ? this.rocketsTtl : 0;
					const delta = now - ttlContent;
					if (this.rockets && (delta <= this.rocketsTtlDiff))
						return Response.success(correlationId, this.rockets);

					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ROCKETS);
					const response = await service.listing(correlationId, params);
					this.$logger.debug('store', 'requestRockets', 'response', response, correlationId);
					if (Response.hasSucceeded(response))
						await this.setRockets(correlationId, response.results);

					return Response.error('store', 'requestRockets', null, null, null, null, correlationId);
				},
				async requestRocketsUser(correlationId, params) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ROCKETS);
					const response = await service.listingUser(correlationId, params);
					this.$logger.debug('store', 'requestRocketsUser', 'response', response, correlationId);
					if (Response.hasSucceeded(response))
						await this.setRocketsUser(correlationId, response.results);

					return Response.error('store', 'requestRocketsUser', null, null, null, null, correlationId);
				},
				async setContent(correlationId, content) {
					this.$logger.debug('store', 'setContent', 'content.a', content, correlationId);
					this.$logger.debug('store', 'setContent', 'content.b', this.content, correlationId);
					this.content = content;
					this.contentTtl = Utility.getTimestamp();
					this.$logger.debug('store', 'setContent', 'content.c', this.content, correlationId);
				},
				async setContentMarkup(correlationId, content) {
					this.$logger.debug('store', 'setContent', 'contentMarkup.a', content, correlationId);
					this.$logger.debug('store', 'setContent', 'contentMarkup.b', this.contentMarkup, correlationId);
					if (content && !String.isNullOrEmpty(content)) {
						this.contentMarkupTtl = Utility.getTimestamp();
						Utility.updateArrayByObject(this.contentMarkup, content);
					}
					this.$logger.debug('store', 'setContent', 'contentMarkup.c', this.contentMarkup, correlationId);
				},
				async setFlightInfoDataTypeUse(correlationId, value) {
					this.flightInfoDataTypeUse = value;
				},
				async setFlightData(correlationId, value) {
					this.flightData = value;
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
				async setRockets(correlationId, rockets) {
					this.$logger.debug('store', 'setRockets', 'rockets.a', rockets, correlationId);
					this.$logger.debug('store', 'setRockets', 'rockets.b', this.rockets, correlationId);
					this.rockets = rockets;
					this.rocketsTtl = Utility.getTimestamp();
					this.$logger.debug('store', 'setRockets', 'rockets.c', this.rockets, correlationId);
				},
				async setRocketsUser(correlationId, rockets) {
					this.$logger.debug('store', 'setRocketsUser', 'rockets.a', rockets, correlationId);
					this.$logger.debug('store', 'setRocketsUser', 'rockets.b', this.rocketsUser, correlationId);
					this.rocketsUser = rockets;
					this.$logger.debug('store', 'setRocketsUser', 'rockets.c', this.rocketsUser, correlationId);
				}
			},
			getters: {
				getContent() {
					return GlobalUtility.$store.content;
				},
				getFlightData() {
					return GlobalUtility.$store.flightData;
				},
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
				},
				getRockets() {
					return GlobalUtility.$store.rockets;
				},
				getRocketsUser() {
					return GlobalUtility.$store.rocketsUser;
				}
			},
			dispatcher: {
				async requestContent(correlationId) {
					return await GlobalUtility.$store.requestContent(correlationId);
				},
				async requestContentMarkup(correlationId, contentId) {
					return await GlobalUtility.$store.requestContentMarkup(correlationId, contentId);
				},
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
				async requestRockets(correlationId, params) {
					return await GlobalUtility.$store.requestRockets(correlationId, params);
				},
				async requestRocketsUser(correlationId, params) {
					return await GlobalUtility.$store.requestRocketsUser(correlationId, params);
				},
				async setFlightInfoDataTypeUse(correlationId, value) {
					await GlobalUtility.$store.setFlightInfoDataTypeUse(correlationId, value);
				},
				async setFlightData(correlationId, value) {
					await GlobalUtility.$store.setFlightData(correlationId, value);
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
