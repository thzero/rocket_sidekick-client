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

import { useAppMeasurementSelectComponent } from '@/components/content/tools/appMeasurementSelect';
import { useAppMeasurementSelectProps } from '@/components/content/tools/appMeasurementSelectProps';

export default {
	name: 'MeasurementSelect',
	components: {
		VSelectWithValidation
	},
    props: {
		...useAppMeasurementSelectProps
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
		} = useAppMeasurementSelectComponent(props, context);

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
