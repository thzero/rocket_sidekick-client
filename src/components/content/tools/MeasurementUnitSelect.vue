<template>
    <VSelectWithValidation
		ref="measurementUnitIdRef"
		vid="innerValue"
		v-model="innerValue"
		:items="measurementUnits"
		:label="$attrs.label"
        :validation="validation"
		:vidOverride="vid"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form//VSelectWithValidation';

import { useMeasurementUnitSelectBaseComponent } from '@/components/content/tools/measurementUnitSelectBase';
import { useMeasurementUnitSelectBaseProps } from '@/components/content/tools/measurementUnitSelectBaseProps';

export default {
	name: 'MeasurementUnitSelect',
	components: {
		VSelectWithValidation
	},
    props: {
		...useMeasurementUnitSelectBaseProps
    },
	setup(props, context) {
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
			innerValueUpdate,
			initValue,
			measurementUnits,
			measurementUnitTrans
		} = useMeasurementUnitSelectBaseComponent(props, context);

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
			measurementUnits,
			measurementUnitTrans
		};
	}
};
</script>

<style scoped>
</style>
