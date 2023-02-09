<script>
import { computed, onMounted, ref } from 'vue';

import AppConstants from '@/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useToolsMeasurementBaseComponent(props, context, options) {
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
		serviceStore,
		sortByOrder,
		target
	} = useContentBaseComponent(props, context, options);

	const measurementUnitsIdSettings = ref(null);
	const measurementUnitsAccelerationDefaultId = ref(null);
	const measurementUnitsAccelerationType = ref(AppConstants.MeasurementUnits.types.acceleration);
	const measurementUnitsAreaDefaultId = ref(null);
	const measurementUnitsAreaType = ref(AppConstants.MeasurementUnits.types.area);
	const measurementUnitsDensityDefaultId = ref(null);
	const measurementUnitsDensityType = ref(AppConstants.MeasurementUnits.types.density);
	const measurementUnitsDistanceDefaultId = ref(null);
	const measurementUnitsDistanceType = ref(AppConstants.MeasurementUnits.types.distance);
	const measurementUnitsFluidDefaultId = ref(null);
	const measurementUnitsFluidType = ref(AppConstants.MeasurementUnits.types.fluid);
	const measurementUnitsLengthDefaultId = ref(null);
	const measurementUnitslengthType = ref(AppConstants.MeasurementUnits.types.length);
	const measurementUnitsVelocityDefaultId = ref(null);
	const measurementUnitsVelocityType = ref(AppConstants.MeasurementUnits.types.velocity);
	const measurementUnitsVolumeDefaultId = ref(null);
	const measurementUnitsVolumeType = ref(AppConstants.MeasurementUnits.types.volume);
	const measurementUnitsWeightDefaultId = ref(null);
	const measurementUnitsWeightType = ref(AppConstants.MeasurementUnits.types.weight);

	onMounted(async () => {
		const settings = serviceStore.getters.user.getUserSettings();
		measurementUnitsIdSettings.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		measurementUnitsAccelerationDefaultId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value);
		measurementUnitsAreaDefaultId.value = AppUtility.measurementUnitAreaId(correlationId, settings.value);
		measurementUnitsDensityDefaultId.value = AppUtility.measurementUnitDensityId(correlationId, settings.value);
		measurementUnitsDistanceDefaultId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		measurementUnitsFluidDefaultId.value = AppUtility.measurementUnitFluidId(correlationId, settings.value);
		measurementUnitsLengthDefaultId.value = AppUtility.measurementUnitLengthId(correlationId, settings.value);
		measurementUnitsVelocityDefaultId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
		measurementUnitsVolumeDefaultId.value = AppUtility.measurementUnitVolumeId(correlationId, settings.value);
		measurementUnitsWeightDefaultId.value = AppUtility.measurementUnitWeightId(correlationId, settings.value);
	});

	return {
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	};
};
</script>
