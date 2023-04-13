<script>
import { computed, ref, watch } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useFlightInfoDataBaseComponent(props, context, options) {
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
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
		hasAttribution,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		settings,
		dateFormat,
		dateFormatMask,
		calculateI,
		formatNumber,
		handleListener,
		handleAttribution,
		initCalculationOutput,
		initCalculationResults,
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		toFixed,
	} = useToolsBaseComponent(props, context, options);

	const flightInfoInner = ref(null);

	const measurementUnits = computed(() => {
		return flightInfoInner.value?.measurementUnits ?? AppCommonConstants.MeasurementUnits.english.id;
	});
	const measurementAcceleration = computed(() => {
		return flightInfoInner.value ? LibraryClientUtility.$trans.t('measurements.' + measurementUnits.value + '.acceleration.abbr') : '';
	});
	const measurementAltitude = computed(() => {
		return flightInfoInner.value ? LibraryClientUtility.$trans.t('measurements.' + measurementUnits.value + '.altitude.abbr') : '';
	});
	const measurementTime = computed(() => {
		return flightInfoInner.value ? LibraryClientUtility.$trans.t('measurements.' + measurementUnits.value + '.time.abbr') : '';
	});
	const measurementVelocity = computed(() => {
		return flightInfoInner.value ? LibraryClientUtility.$trans.t('measurements.' + measurementUnits.value + '.velocity.abbr') : '';
	});

	const valueType = (value, valueF) => {
		return props.flightInfoInner?.dataTypes?.use ? valueF : value;
	};

	watch(() => props.modelValue,
		(value) => {
			flightInfoInner.value = value;
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
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
		hasAttribution,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		settings,
		dateFormat,
		dateFormatMask,
		calculateI,
		formatNumber,
		handleListener,
		handleAttribution,
		initCalculationOutput,
		initCalculationResults,
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		toFixed,
		flightInfoInner,
		measurementUnits,
		measurementAcceleration,
		measurementAltitude,
		measurementTime,
		measurementVelocity,
		valueType
	};
};
</script>
