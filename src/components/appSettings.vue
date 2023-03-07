<script>
import { computed, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseSettingsComponent } from '@thzero/library_client_vue3/components/baseSettings';

export function useAppSettingsComponent(props, context, formRef) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCheck,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		reset,
		serviceStore,
		serviceUsers,
		user
	} = useBaseSettingsComponent(props, context, {
		formRef: formRef
	});

	const gamerTag = ref('');
	const measurementUnitsId = ref(null);
	const measurementUnitAccelerationId = ref(null);
	const measurementUnitAreaId = ref(null);
	const measurementUnitDistanceId = ref(null);
	const measurementUnitLengthId = ref(null);
	const measurementUnitVelocityId = ref(null);
	const measurementUnitVolumeId = ref(null);
	const measurementUnitWeightId = ref(null);

	const measurementUnitsSelect = computed(() => {
		return [AppConstants.MeasurementUnits.english.id, AppConstants.MeasurementUnits.metrics.id].map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + item + '.title') }; });
	});
	const measurementUnitsAcceleration = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.acceleration, 'english', 'acceleration');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.acceleration, 'metrics', 'acceleration');
	});
	const measurementUnitsArea = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.area, 'english', 'area');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.area, 'metrics', 'area');
	});
	const measurementUnitsDistance = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.distance, 'english', 'distance');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.distance, 'metrics', 'distance');
	});
	const measurementUnitsLength = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.length, 'english', 'length');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.length, 'metrics', 'length');
	});
	const measurementUnitsVelocity = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.velocity, 'english', 'velocity');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.velocity, 'metrics', 'velocity');
	});
	const measurementUnitsVolume = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.volume, 'english', 'volume');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.volume, 'metrics', 'volume');
	});
	const measurementUnitsWeight = computed(() => {
		if (measurementUnitsId.value === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english.weight, 'english', 'weight');
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics.weight, 'metrics', 'weight');
	});

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; });
	};
	const preCompleteOk = async (correlationId) => {
		try {
			const settings = serviceStore.getters.user.getUserSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			settings.gamerTag = gamerTag.value;
			settings.measurementUnits.id = measurementUnitsId.value;
			settings.measurementUnits.acceleration = measurementUnitAccelerationId.value;
			settings.measurementUnits.area = measurementUnitAreaId.value;
			settings.measurementUnits.distance = measurementUnitDistanceId.value;
			settings.measurementUnits.length = measurementUnitLengthId.value;
			settings.measurementUnits.velocity = measurementUnitVelocityId.value;
			settings.measurementUnits.volume = measurementUnitVolumeId.value;
			settings.measurementUnits.weight = measurementUnitWeightId.value;

			return await serviceStore.dispatcher.user.setUserSettings(correlationId, settings);
		}
		catch (err) {
			logger.exception('AppSettings', 'preCompleteOk', err, correlationId);
			return error('AppSettings', 'preCompleteOk', null, err, null, null, correlationId);
		}
	};
	// eslint-disable-next-line
	const resetForm = (correlationId) => {
		const settings = serviceStore.getters.user.getUserSettings();
		if (!settings.measurementUnits)
			settings.measurementUnits = {};

		gamerTag.value = !String.isNullOrEmpty(settings.gamerTag) ? settings.gamerTag : '';
		measurementUnitsId.value = settings.measurementUnits.id;
		measurementUnitAccelerationId.value = settings.measurementUnits.acceleration;
		measurementUnitAreaId.value = settings.measurementUnits.area;
		measurementUnitDistanceId.value = settings.measurementUnits.distance;
		measurementUnitLengthId.value = settings.measurementUnits.length;
		measurementUnitVelocityId.value = settings.measurementUnits.velocity;
		measurementUnitVolumeId.value = settings.measurementUnits.volume;
		measurementUnitWeightId.value = settings.measurementUnits.weight;
		measurementUnitsId.value = settings.measurementUnits.id ? settings.measurementUnits.id : AppConstants.MeasurementUnits.english.id;

		const measurementUnitAccelerationIdT = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : AppConstants.MeasurementUnits[measurementUnitsId.value].acceleration[keyword];
		measurementUnitAccelerationId.value = resetFormIdCheck(measurementUnitAccelerationIdT, measurementUnitsAcceleration.value);
		const measurementUnitAreaIdT = settings.measurementUnits.area ? settings.measurementUnits.area : AppConstants.MeasurementUnits[measurementUnitsId.value].area[keyword];
		measurementUnitAreaId.value = resetFormIdCheck(measurementUnitAreaIdT, measurementUnitsArea.value);
		const measurementUnitDistanceIdT = settings.measurementUnits.distance ? settings.measurementUnits.distance : AppConstants.MeasurementUnits[measurementUnitsId.value].distance[keyword];
		measurementUnitDistanceId.value = resetFormIdCheck(measurementUnitDistanceIdT, measurementUnitsDistance.value);
		const measurementUnitLengthIdT = settings.measurementUnits.length ? settings.measurementUnits.length : AppConstants.MeasurementUnits[measurementUnitsId.value].length[keyword];
		measurementUnitLengthId.value = resetFormIdCheck(measurementUnitLengthIdT, measurementUnitsLength.value);
		const measurementUnitVelocityIdT = settings.measurementUnits.velocity ? settings.measurementUnits.velocity : AppConstants.MeasurementUnits[measurementUnitsId.value].velocity[keyword];
		measurementUnitVelocityId.value = resetFormIdCheck(measurementUnitVelocityIdT, measurementUnitsVelocity.value);
		const measurementUnitVolumeIdT = settings.measurementUnits.volume ? settings.measurementUnits.volume : AppConstants.MeasurementUnits[measurementUnitsId.value].volume[keyword];
		measurementUnitVolumeId.value = resetFormIdCheck(measurementUnitVolumeIdT, measurementUnitsVolume.value);
		const measurementUnitWeightIdT = settings.measurementUnits.weight ? settings.measurementUnits.weight : AppConstants.MeasurementUnits[measurementUnitsId.value].weight[keyword];
		measurementUnitWeightId.value = resetFormIdCheck(measurementUnitWeightIdT, measurementUnitsWeight.value);

		measurementUnitAccelerationId.value = settings.measurementUnits.acceleration ? settings.measurementUnits.acceleration : AppConstants.MeasurementUnits[measurementUnitsId.value].acceleration[keyword];
		measurementUnitAreaId.value = settings.measurementUnits.area ? settings.measurementUnits.area : AppConstants.MeasurementUnits[measurementUnitsId.value].area[keyword];
		measurementUnitDistanceId.value = settings.measurementUnits.distance ? settings.measurementUnits.distance : AppConstants.MeasurementUnits[measurementUnitsId.value].distance[keyword];
		measurementUnitLengthId.value = settings.measurementUnits.length ? settings.measurementUnits.length : AppConstants.MeasurementUnits[measurementUnitsId.value].length[keyword];
		measurementUnitVelocityId.value = settings.measurementUnits.velocity ? settings.measurementUnits.velocity : AppConstants.MeasurementUnits[measurementUnitsId.value].velocity[keyword];
		measurementUnitVolumeId.value = settings.measurementUnits.volume ? settings.measurementUnits.volume : AppConstants.MeasurementUnits[measurementUnitsId.value].volume[keyword];
		measurementUnitWeightId.value = settings.measurementUnits.weight ? settings.measurementUnits.weight : AppConstants.MeasurementUnits[measurementUnitsId.value].weight[keyword];
	};
	const resetFormIdCheck = (id, values) => {
		const temp = values.find(l => l.id === id);
		return !String.isNullOrEmpty(temp) ? temp.id : null;
	};

	watch(() => measurementUnitsId,
		(value) => {
			let units = AppConstants.MeasurementUnits.english;
			if (measurementUnitsId.value ===  AppConstants.MeasurementUnits.metrics.id)
				AppConstants.MeasurementUnits.metrics;

			measurementUnitAccelerationId.value = AppConstants.MeasurementUnits[units].acceleration[keyword];
			measurementUnitAreaId.value = AppConstants.MeasurementUnits[units].area[keyword];
			measurementUnitDistanceId.value = AppConstants.MeasurementUnits[units].distance[keyword];
			measurementUnitLengthId.value = AppConstants.MeasurementUnits[units].length[keyword];
			measurementUnitVelocityId.value = AppConstants.MeasurementUnits[units].velocity[keyword];
			measurementUnitVolumeId.value = AppConstants.MeasurementUnits[units].volume[keyword];
			measurementUnitWeightId.value = AppConstants.MeasurementUnits[units].weight[keyword];
		}
	);
	watch(() => user.value,
		(value, newValue) => {
			if (value !== newValue)
				resetForm(correlationId);
		}
	);

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCheck,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		reset,
		serviceStore,
		serviceUsers,
		user,
		gamerTag,
		measurementUnitTrans,
		measurementUnitsId,
		measurementUnitAccelerationId,
		measurementUnitAreaId,
		measurementUnitDistanceId,
		measurementUnitLengthId,
		measurementUnitVelocityId,
		measurementUnitVolumeId,
		measurementUnitWeightId,
		measurementUnitsSelect,
		measurementUnitsAcceleration,
		measurementUnitsArea,
		measurementUnitsDistance,
		measurementUnitsLength,
		measurementUnitsVelocity,
		measurementUnitsVolume,
		measurementUnitsWeight,
		preCompleteOk,
		resetForm,
		resetFormIdCheck,
		scope: 'AppSettings',
		validation: useVuelidate({ $scope: 'AppSettings' })
	};
};
</script>
