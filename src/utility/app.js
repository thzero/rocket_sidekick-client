import Constants from '@/constants';

import SettingsUser from '@/common/data/settingsUser';

class AppUtility {
	static isDebug = false;

	// TODO: move to library
	static debug(args) {
		if (!AppUtility.isDebug)
			return;
		console.debug(args);
	}

	// TODO: move to library
	static debug2(name, value) {
		if (!AppUtility.isDebug)
			return;

		// eslint-disable-next-line no-unneeded-ternary
		const output = name + ': ' + (value ? value : 'null');
		console.debug(output);
	}

	static info(args) {
		console.info(args);
	}

	static initializeSettingsUser() {
		const settings = new SettingsUser();
		settings.measurementUnits = {
			id: Constants.MeasurementUnits.english.id
		};
		settings.measurementUnits.id = Constants.MeasurementUnits.english.id;
		settings.measurementUnits.acceleration = Constants.MeasurementUnits.english.acceleration.default;
		settings.measurementUnits.area = Constants.MeasurementUnits.english.area.default;
		settings.measurementUnits.distance = Constants.MeasurementUnits.english.distance.default;
		settings.measurementUnits.length = Constants.MeasurementUnits.english.length.default;
		settings.measurementUnits.velocity = Constants.MeasurementUnits.english.velocity.default;
		settings.measurementUnits.volume = Constants.MeasurementUnits.english.volume.default;
		settings.measurementUnits.weight = Constants.MeasurementUnits.english.weight.default;
		return settings;
	}

	static measurementUnitsId(correlationId, settings) {
		return settings && settings.measurementUnits && settings.measurementUnits.id ? settings.measurementUnits.id : Constants.MeasurementUnits.english.id;
	}

	static measurementUnits(correlationId, settings) {
		return Constants.MeasurementUnits[AppUtility.measurementUnitsId(correlationId, settings)];
	}

	static measurementUnitsAccelerationId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : 
		Constants.MeasurementUnits[measurementUnitsId].acceleration.default;
	}

	static measurementUnitAreaId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.area ? settings.measurementUnits.area : 
		Constants.MeasurementUnits[measurementUnitsId].area.default;
	}

	static measurementUnitDistanceId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.distance ? settings.measurementUnits.distance : 
		Constants.MeasurementUnits[measurementUnitsId].distance.default;
	}

	static measurementUnitFluidId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.fluid ? settings.measurementUnits.fluid : 
		Constants.MeasurementUnits[measurementUnitsId].distance.default;
	}

	static measurementUnitLengthId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.length ? settings.measurementUnits.length : 
		Constants.MeasurementUnits[measurementUnitsId].length.default;
	}

	static measurementUnitVelocityId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.velocity ? settings.measurementUnits.velocity : 
		Constants.MeasurementUnits[measurementUnitsId].velocity.default;
	}

	static measurementUnitVolumeId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.volume ? settings.measurementUnits.volume : 
		Constants.MeasurementUnits[measurementUnitsId].volume.default;
	}

	static measurementUnitWeightId(correlationId, settings, measurementUnitsId) {
		measurementUnitsId = !String.isNullOrEmpty(measurementUnitsId) ? measurementUnitsId : AppUtility.measurementUnitsId(correlationId, settings);
		return settings && settings.measurementUnits && settings.measurementUnits.weight ? settings.measurementUnits.weight : 
		Constants.MeasurementUnits[measurementUnitsId].weight.default;
	}

	static measurementUnitsOptions() {
		return [ Constants.MeasurementUnits.english.id, Constants.MeasurementUnits.metrics.id ];
	}

	static userDisplayName(correlationId, user) {
		if (!user || !user.settings)
			return '';

		const settings = user.settings ? user.settings : null;
		const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
		return userName;
	}

	static _injector = null;
	static set injector(value) {
		AppUtility._injector = value;
	}

	static get injector() {
		return AppUtility._injector;
	}
}

export default AppUtility;
