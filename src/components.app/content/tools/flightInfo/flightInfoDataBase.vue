<script>
import { computed, ref, watch } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsFormattingComponent } from '@/components/content/tools/toolsFormatting';

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
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop,
		calculationOutput,
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
		hasAttribution,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		settings,
		calculateI,
		handleListener,
		handleAttribution,
		initCalculationOutput,
		initCalculationResults,
		resetAdditional,
		setErrorMessage,
		setErrorTimer,
		setNotify
	} = useToolsBaseComponent(props, context, options);
	
	const {
		dateFormat,
		dateFormatMask,
		formatNumber,
		toFixed
	} = useToolsFormattingComponent(props, context, options);

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
		return (flightInfoInner.value?.dataTypes?.use ? valueF : value);
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
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop,
		calculationOutput,
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
		hasAttribution,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		settings,
		calculateI,
		handleListener,
		handleAttribution,
		initCalculationOutput,
		initCalculationResults,
		resetAdditional,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		dateFormat,
		dateFormatMask,
		formatNumber,
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
