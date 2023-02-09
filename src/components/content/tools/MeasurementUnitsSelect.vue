<template>
    <VSelectWithValidation
        ref="innerValueRef"
        vid="innerValue"
		v-model="innerValue"
		:items="measurementUnitsOptions"
		:label="$attrs.label"
        :validation="validation"
		:vidOverride="vid"
		@update:modelValue="innerValueUpdate"
    />
</template>

<script>
import VSelectWithValidation from '@/library_vue_vuetify/components/form//VSelectWithValidation';

import { useMeasurementUnitsSelectBaseComponent } from '@/components/content/tools/measurementUnitsSelectBase';
import { useMeasurementUnitsSelectBaseProps } from '@/components/content/tools/measurementUnitsSelectBaseProps';

export default {
	name: 'MeasurementUnitsSelect',
	components: {
		VSelectWithValidation
	},
    props: {
		...useMeasurementUnitsSelectBaseProps
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
			calculationOutput,
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			calculateI,
			formatNumber,
			handleListener,
			initCalculationOutput,
			initCalculationResults,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsDensityDefaultId,
			measurementUnitsDistanceDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsLengthDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVolumeDefaultId,
			measurementUnitsWeightDefaultId,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
			settings,
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
		} = useMeasurementUnitsSelectBaseComponent(props, context);

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
			dateFormat,
			dateFormatMask,
			errorMessage,
			errors,
			errorTimer,
			calculateI,
			formatNumber,
			handleListener,
			initCalculationOutput,
			initCalculationResults,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsDensityDefaultId,
			measurementUnitsDistanceDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsLengthDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVolumeDefaultId,
			measurementUnitsWeightDefaultId,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
			settings,
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
	}
};
</script>

<style scoped>
</style>
