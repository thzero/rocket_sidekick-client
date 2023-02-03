<script>
import { computed, ref, watch } from 'vue';

import AppConstants from '@/constants';

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
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		formatNumber,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setErrorMessage,
		setErrorTimer,
		setNotify
	} = useToolsBaseComponent(props, context, options);

	const flightInfoInner = ref(null);

	const measurementUnits = computed(() => {
		return flightInfoInner.value?.measurementUnits ?? AppConstants.MeasurementUnits.english.id;
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
		dateFormat,
		dateFormatMask,
		errorMessage,
		errors,
		errorTimer,
		formatNumber,
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setErrorMessage,
		setErrorTimer,
		setNotify,
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
