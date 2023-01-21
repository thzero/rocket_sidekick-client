<script>
import { computed } from 'vue';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseControlEditComponent } from '@/library_vue/components/baseControlEdit';

export function useAppMeasurementSelectComponent(props, context, options) {
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
		convertValue,
		errorI,
		errorsI,
		hideDetails,
		innerValue,
		initValue,
		innerValueUpdate
	} = useBaseControlEditComponent(props, context, options);

	const measurementUnits = computed(() => {
		if (props.measurementUnitsId === Constants.MeasurementUnits.english.id)
			return measurementUnitTrans(Constants.MeasurementUnits.english[props.measurementUnitsType], 'english', props.measurementUnitsType);
		return measurementUnitTrans(Constants.MeasurementUnits.metrics[props.measurementUnitsType], 'metrics', props.measurementUnitsType);
	});
	
	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return object ? Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; }) : {};
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
