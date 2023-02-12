<script>
import { computed, onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

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

	const contentId = options ? options.id : null;

	const calculationOutput = ref([]);
	const content = ref(null);
	const contentTitle = ref(options ? options.title : null);
	const errors = ref(null);
	const errorMessage = ref(null);
	const errorTimer = ref(null);
	const hasAttribution = ref(false);
	const measurementUnitsIdOutput = ref(null);
	const measurementUnitsIdSettings = ref(null);
	const notifyColor = ref(null);
	const notifyMessage = ref(null);
	const notifySignal = ref(false);
	const notifyTimeout = ref(3000);
	const settings = ref(null);

	const dateFormat = computed(() => {
		return LibraryClientUtility.dateFormat();
	});
	const dateFormatMask = computed(() => {
		return LibraryClientUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
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
	const handleAttribution = (e) => {
		hasAttribution.value = e;
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

		message = (!transformed ? LibraryClientUtility.$trans.t(message) : message);
		if (String.isNullOrEmpty(message))
			return;

		notifyColor.value = null;
		notifyMessage.value = (!transformed ? LibraryClientUtility.$trans.t(message) : message);
		notifySignal.value = true;
	};
	const toFixed = (value) => {
		if (!value)
			return '';

		if (LibraryCommonUtility.isString(value))
			return value.toFixed(2);
		
		return value;
	};

	onMounted(async () => {
		settings.value = serviceStore.getters.user.getUserSettings();
		measurementUnitsIdOutput.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		measurementUnitsIdSettings.value = AppUtility.measurementUnitsId(correlationId, settings.value);

		if (!String.isNullOrEmpty(contentId)) {
			const tools = serviceStore.getters.getContentTools();
			const results = tools.find(l => l.id === contentId);
			if (!results)
				return;
			content.value = results;
		}
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
		toFixed
	};
};
</script>
