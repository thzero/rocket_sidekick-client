<script>
import { computed } from 'vue';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useMeasurementSelectBaseComponent(props, context, options) {
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
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		initValue,
		innerValueUpdate
	} = useToolsBaseComponent(props, context, options);

	const measurementUnits = computed(() => {
		if (props.measurementUnitsId === AppConstants.MeasurementUnits.english.id)
			return measurementUnitTrans(AppConstants.MeasurementUnits.english[props.measurementUnitsType], 'english', props.measurementUnitsType);
		return measurementUnitTrans(AppConstants.MeasurementUnits.metrics[props.measurementUnitsType], 'metrics', props.measurementUnitsType);
	});
	
	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return object ? Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; }) : {};
	};

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
		isSaving,
		serverErrors,
		setErrors,
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		initValue,
		innerValueUpdate,
		measurementUnits,
		measurementUnitTrans
	};
};
</script>
