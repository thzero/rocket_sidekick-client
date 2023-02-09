<script>
import { computed, onMounted, watch} from 'vue';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseControlEditComponent } from '@/library_vue/components/baseControlEdit';
import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useMeasurementUnitSelectBaseComponent(props, context, options) {
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
		target,
		calculationOutput,
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		calculateI,
		formatNumber,
		handleListener,
		initCalculationOutput,
		initCalculationResults,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAreaDefaultId,
		measurementUnitsDensityDefaultId,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsLengthDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVolumeDefaultId,
		measurementUnitsWeightDefaultId,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		toFixed,
		settings
	} = useToolsBaseComponent(props, context, options);

	const {
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		innerValueUpdate,
		initValue
	} = useBaseControlEditComponent(props, context, options);

	let initialized = false;

	const measurementUnits = computed(() => {
		if (props.measurementUnitsId === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english[props.measurementUnitsType], 'english', props.measurementUnitsType);
		if (props.measurementUnitsId === AppConstants.MeasurementUnits.metrics.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.metrics[props.measurementUnitsType], 'metrics', props.measurementUnitsType);
		return [];
	});
	
	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return object ? Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; }) : {};
	};

	onMounted(async () => {
		setTimeout(() => {
			initialized = true;
		}, 50);
	});
		
	watch(() => props.measurementUnitsId,
		(value) => {
			if (!initialized)
				return;
			innerValue.value = null;
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
		serviceStore,
		sortByOrder,
		target,
		calculationOutput,
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		calculateI,
		formatNumber,
		handleListener,
		initCalculationOutput,
		initCalculationResults,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAreaDefaultId,
		measurementUnitsDensityDefaultId,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsLengthDefaultId,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVolumeDefaultId,
		measurementUnitsWeightDefaultId,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		toFixed,
		settings,
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		innerValueUpdate,
		initValue,
		measurementUnits,
		measurementUnitTrans
	};
};
</script>
