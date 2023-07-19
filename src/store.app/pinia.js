import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import AppStore from '@/store/pinia';

class WebAppStore extends AppStore {
	_initPluginPersistConfigPaths() {
		const results = super._initPluginPersistConfigPaths();
		results.push('flightInfoDataTypeUse');
		results.push('flightInfoProcessor');
		results.push('flightInfoResolution');
		results.push('flightInfoStyle');
		results.push('flightMeasurementUnits');
		results.push('flightPathProcessor');
		results.push('flightPathStyle');
		return results;
	}

	_initStoreConfigActionsAdditional() {
		return {
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
				this.flightInfoStyle = LibraryCommonUtility.updateArrayByObject(this.flightInfoStyle, value);
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
				this.flightPathStyle = LibraryCommonUtility.updateArrayByObject(this.flightPathStyle, value);
			},
			async setFlightTitle(correlationId, value) {
				this.flightTitle = value;
			}
		};
	}

	_initStoreConfigDispatchersAdditional() {
		return {
			async setFlightInfoDataTypeUse(correlationId, value) {
				await LibraryClientUtility.$store.setFlightInfoDataTypeUse(correlationId, value);
			},
			async setFlightData(correlationId, value) {
				await LibraryClientUtility.$store.setFlightData(correlationId, value);
			},
			async setFlightDate(correlationId, value) {
				await LibraryClientUtility.$store.setFlightDate(correlationId, value);
			},
			async setFlightInfoProcessor(correlationId, value) {
				await LibraryClientUtility.$store.setFlightInfoProcessor(correlationId, value);
			},
			async setFlightInfoResolution(correlationId, value) {
				await LibraryClientUtility.$store.setFlightInfoResolution(correlationId, value);
			},
			async setFlightInfoStyle(correlationId, value) {
				await LibraryClientUtility.$store.setFlightInfoStyle(correlationId, value);
			},
			async setFlightLocation(correlationId, value) {
				await LibraryClientUtility.$store.setFlightLocation(correlationId, value);
			},
			async setFlightMeasurementUnits(correlationId, value) {
				await LibraryClientUtility.$store.setFlightMeasurementUnits(correlationId, value);
			},
			async setFlightPathProcessor(correlationId, value) {
				await LibraryClientUtility.$store.setFlightPathProcessor(correlationId, value);
			},
			async setFlightPathStyle(correlationId, value) {
				await LibraryClientUtility.$store.setFlightPathStyle(correlationId, value);
			},
			async setFlightTitle(correlationId, value) {
				await LibraryClientUtility.$store.setFlightTitle(correlationId, value);
			}
		};
	}

	_initStoreConfigGettersAdditional() {
		return {
			getFlightData() {
				return LibraryClientUtility.$store.flightData;
			},
			getFlightDate() {
				return LibraryClientUtility.$store.flightDate;
			},
			getFlightInfoDataTypeUse() {
				const value = LibraryClientUtility.$store.flightInfoDataTypeUse;
				return value !== null ? value : true;
			},
			getFlightInfoProcessor() {
				return LibraryClientUtility.$store.flightInfoProcessor;
			},
			getFlightInfoResolution() {
				return LibraryClientUtility.$store.flightInfoResolution;
			},
			getFlightInfoStyle() {
				if (!LibraryClientUtility.$store.flightInfoStyle)
					return null;
				return LibraryClientUtility.$store.flightInfoStyle.find(l => l.id);
			},
			getFlightLocation() {
				return LibraryClientUtility.$store.flightLocation;
			},
			getFlightMeasurementUnits() {
				return LibraryClientUtility.$store.flightMeasurementUnits;
			},
			getFlightPathProcessor() {
				return LibraryClientUtility.$store.flightPathProcessor;
			},
			getFlightPathStyle() {
				if (!LibraryClientUtility.$store.flightPathStyle)
					return null;
				return LibraryClientUtility.$store.flightPathStyle.find(l => l.id);
			},
			getFlightTitle() {
				return LibraryClientUtility.$store.flightTitle;
			}
		};
	}

	_initStoreConfigStateAdditional() {
		return {
			flightInfoDataTypeUse: null,
			flightData: {},
			flightDate: '',
			flightInfoProcessor: null,
			flightInfoResolution: AppConstants.FlightInfo.Resolution,
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
			flightTitle: ''
		};
	}
}

export default WebAppStore;
