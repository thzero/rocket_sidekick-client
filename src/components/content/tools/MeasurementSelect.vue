<template>
    <VSelectWithValidation
        ref="measurementUnitRef"
        vid="innerValue"
		v-model="innerValue"
		:items="measurementUnits"
		:label="$attrs.label"
        :validation="validation"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import VSelectWithValidation from '@/library_vue_vuetify/components/form//VSelectWithValidation';

import { useMeasurementSelectBaseComponent } from '@/components/content/tools/measurementSelectBase';
import { useMeasurementSelectBaseProps } from '@/components/content/tools/measurementSelectBaseProps';

export default {
	name: 'MeasurementSelect',
	components: {
		VSelectWithValidation
	},
    props: {
		...useMeasurementSelectBaseProps
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
		} = useMeasurementSelectBaseComponent(props, context);

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
	}
};
</script>

<style scoped>
</style>
