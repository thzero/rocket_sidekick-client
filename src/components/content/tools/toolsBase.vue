<script>
import { computed, onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import Utility from '@thzero/library_common/utility';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useToolsBaseComponent(props, context, options) {
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

	const calculationOutput = ref([]);
	const errors = ref(null);
	const errorMessage = ref(null);
	const errorTimer = ref(null);
	const measurementUnitsId = ref(null);
	const measurementUnitsAccelerationDefaultId = ref(null);
	const measurementUnitsAreaDefaultId = ref(null);
	const measurementUnitsFluidDefaultId = ref(null);
	const measurementUnitsDistanceDefaultId = ref(null);
	const measurementUnitsLengthDefaultId = ref(null);
	const measurementUnitsVelocityDefaultId = ref(null);
	const measurementUnitsVolumeDefaultId = ref(null);
	const measurementUnitsWeightDefaultId = ref(null);
	const notifyColor = ref(null);
	const notifyMessage = ref(null);
	const notifySignal = ref(false);
	const notifyTimeout = ref(3000);
	const settings = ref(null);

	const dateFormat = computed(() => {
		return GlobalUtility.dateFormat();
	});
	const dateFormatMask = computed(() => {
		return GlobalUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
	});

	const calculateI = async (correlationId, calculationResults, func) => {
		try {
			initCalculationOutput(correlationId);
			calculationResults.value = initCalculationResults(correlationId, calculationResults);

			if (func) {
				if (!(await func(correlationId, calculationResults)))
					return;
			}

			calculationResults.value.calculated = true;
		}
		catch(err) {
			logger.exception('useToolsBaseComponent', 'calculateI', err, correlationId);
		}
	};
	const formatNumber = (value) => {
		return value?.toLocaleString();
	};
	const handleListener = (correlationId, type, name, value, setName, symbols) => {
		const prefix = !String.isNullOrEmpty(setName) ? `${setName}: ` : '';
		if (type === symbols.symTypeEvaluate)
			calculationOutput.value.push(`${prefix}${name}`);
		else if (type === symbols.symTypeSet)
			calculationOutput.value.push(`${prefix}${name} = ${value}`);
	};
	const initCalculationOutput = (correlationId) => {
		calculationOutput.value = [];
	};
	const initCalculationResults = (correlationId, results) => {
		if (!results)
			return;

		results.value = {};
		results.value.calculated = false;
		return results;
	};
	const resetFormI = (correlationId, calculationResults, func) => {
		initCalculationOutput(correlationId);
		initCalculationResults(correlationId, calculationResults);

		if (func)
			func(correlationId);
	};
	const setErrorMessage = (error) => {
		errorMessage.value = error;
		
		if (String.isNullOrEmpty(error))
			return;
		
		notifyColor.value = 'error';
		notifyMessage.value = error;
		notify.value = true;
	};
	const setErrorTimer = (timer) => {
		if (errorTimer.value) 
			clearTimeout(errorTimer.value);
		errorTimer.value = timer;
	};
	const setNotify = (correlationId, message, transformed) => {
		if (String.isNullOrEmpty(message))
			return;

		message = (!transformed ? GlobalUtility.$trans.t(message) : message);
		if (String.isNullOrEmpty(message))
			return;

		notifyColor.value = null;
		notifyMessage.value = (!transformed ? GlobalUtility.$trans.t(message) : message);
		notifySignal.value = true;
	};
	const toFixed = (value) => {
		if (!value)
			return '';

		if (Utility.isString(value))
			return value.toFixed(2);
		
		return value;
	};

	onMounted(async () => {
		settings.value = serviceStore.getters.user.getUserSettings();
		measurementUnitsId.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		measurementUnitsAccelerationDefaultId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value);
		measurementUnitsAreaDefaultId.value = AppUtility.measurementUnitAreaId(correlationId, settings.value);
		measurementUnitsDistanceDefaultId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		measurementUnitsFluidDefaultId.value = AppUtility.measurementUnitFluidId(correlationId, settings.value);
		measurementUnitsLengthDefaultId.value = AppUtility.measurementUnitLengthId(correlationId, settings.value);
		measurementUnitsVelocityDefaultId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
		measurementUnitsVolumeDefaultId.value = AppUtility.measurementUnitVolumeId(correlationId, settings.value);
		measurementUnitsWeightDefaultId.value = AppUtility.measurementUnitWeightId(correlationId, settings.value);
	});

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
		measurementUnitsId,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAreaDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsDistanceDefaultId,
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
	};
};
</script>
