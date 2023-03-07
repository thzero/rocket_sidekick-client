<script>
import { onMounted, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';
import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useMeasurementUnitsSelectBaseComponent(props, context, options) {
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

	const measurementUnitsOptions = ref(null);

	onMounted(async () => {
		measurementUnitsOptions.value = LibraryClientVueUtility.selectOptions(AppUtility.measurementUnitsOptions(), LibraryClientUtility.$trans.t, 'measurementUnits');
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
		measurementUnitsOptions
	};
};
</script>
