<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.parachuteSizin') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="parachuteSizingFormRef"
					:validation="validation"
					:resetForm="resetForm"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.calculate"
					notifyMessageSaved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="airDensityRef"
												vid="airDensity"
												v-model="airDensity"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.airDensity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="airDensityMeasurementUnitsIdRef"
												vid="airDensityMeasurementUnitsId"
												v-model="airDensityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="airDensityMeasurementUnitIdRef"
												vid="airDensityMeasurementUnitId"
												v-model="airDensityMeasurementUnitId"
												:measurementUnitsId="airDensityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsDensityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.density')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="massRef"
												vid="mass"
												v-model="mass"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.mass')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="massWeightMeasurementUnitsIdRef"
												vid="massWeightMeasurementUnitsId"
												v-model="massWeightMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="massWeightMeasurementUnitIdRef"
												vid="massWeightMeasurementUnitId"
												v-model="massWeightMeasurementUnitId"
												:measurementUnitsId="massWeightMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsWeightType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.weight')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="coeffDragRef"
									vid="coeffDrag"
									v-model="coeffDrag"
									:validation="validation"
									:label="$t('forms.content.tools.parachuteSizing.coeffDrag')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="desiredVelocityRef"
												vid="desiredVelocity"
												v-model="desiredVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.parachuteSizing.desiredVelocity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="desiredVelocityMeasurementUnitsIdRef"
												vid="desiredVelocityMeasurementUnitsId"
												v-model="desiredVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="desiredVelocityMeasurementUnitIdRef"
												vid="desiredVelocityMeasurementUnitId"
												v-model="desiredVelocityMeasurementUnitId"
												:measurementUnitsId="desiredVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12" lg="6">
								<table>
									<tr>
										<td>
											<span class="text-h7 text-bold">{{ $t('forms.content.tools.parachuteSizing.diameterMeasurementUnits') }}</span>&nbsp;&nbsp;
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="diameterLengthMeasurementUnitsIdRef"
												vid="diameterLengthMeasurementUnitsId"
												v-model="diameterLengthMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="diameterLengthMeasurementUnitIdRef"
												vid="diameterLengthMeasurementUnitId"
												v-model="diameterLengthMeasurementUnitId"
												:measurementUnitsId="diameterLengthMeasurementUnitsId"
												:measurementUnitsType="measurementUnitslengthType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.length')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
						</v-row>
					</template>
				</VFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.parachuteSizing.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.parachuteSizing.diameter') }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.diameter">{{ calculationResults.diameter }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<CalculatedOuput
							v-model="calculationOutput"
						/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { between, decimal, required } from '@vuelidate/validators';

import { useParachuteSizingBaseComponent } from '@/components/content/tools/parahcuteSizingBase';

import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import MeasurementUnitSelect from '@/components/content/tools/measurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/tools/measurementUnitsSelect';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';

// http://www.rocketmime.com/rockets/descent.html
export default {
	name: 'ParachuteSizing',
	components: {
		CalculatedOuput,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation
	},
	setup (props, context) {
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
			measurementUnitsDensityType,
			measurementUnitslengthType,
			measurementUnitsVelocityType,
			measurementUnitsWeightType,
			serviceToolsParachuteSizing,
			calculationData,
			calculationResults,
			airDensity,
			airDensityMeasurementUnitId,
			airDensityMeasurementUnitsId,
			coeffDrag,
			desiredVelocity,
			desiredVelocityMeasurementUnitId,
			desiredVelocityMeasurementUnitsId,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
			mass,
			massWeightMeasurementUnitId,
			massWeightMeasurementUnitsId,
			parachuteSizingFormRef,
			calculationOk,
			initCalculationData,
			reset,
			resetForm,
			scope,
			validation,
		} = useParachuteSizingBaseComponent(props, context);

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
			measurementUnitsDensityType,
			measurementUnitslengthType,
			measurementUnitsVelocityType,
			measurementUnitsWeightType,
			serviceToolsParachuteSizing,
			calculationData,
			calculationResults,
			airDensity,
			airDensityMeasurementUnitId,
			airDensityMeasurementUnitsId,
			coeffDrag,
			desiredVelocity,
			desiredVelocityMeasurementUnitId,
			desiredVelocityMeasurementUnitsId,
			diameterLengthMeasurementUnitId,
			diameterLengthMeasurementUnitsId,
			mass,
			massWeightMeasurementUnitId,
			massWeightMeasurementUnitsId,
			parachuteSizingFormRef,
			calculationOk,
			initCalculationData,
			reset,
			resetForm,
			scope,
			validation
		};
	},
	validations () {
		return {
			airDensity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			airDensityMeasurementUnitId: { required, $autoDirty: true },
			airDensityMeasurementUnitsId: { required, $autoDirty: true },
			coeffDrag: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			desiredVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			desiredVelocityMeasurementUnitId: { required, $autoDirty: true },
			desiredVelocityMeasurementUnitsId: { required, $autoDirty: true },
			diameterLengthMeasurementUnitId: { required, $autoDirty: true },
			diameterLengthMeasurementUnitsId: { required, $autoDirty: true }, 
			mass: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			massWeightMeasurementUnitId: { required, $autoDirty: true },
			massWeightMeasurementUnitsId: { required, $autoDirty: true }
		};
	}
};
</script>