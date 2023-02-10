<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.weathercocking') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="weathercockingFormRef"
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
												ref="windVelocityRef"
												vid="windVelocity"
												v-model="windVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.weathercocking.windVelocity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="windVelocityMeasurementUnitsIdRef"
												vid="windVelocityMeasurementUnitsId"
												v-model="windVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="windVelocityMeasurementUnitIdRef"
												vid="windVelocityMeasurementUnitId"
												v-model="windVelocityMeasurementUnitId"
												:measurementUnitsId="windVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
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
												ref="exitVelocityRef"
												vid="exitVelocity"
												v-model="exitVelocity"
												:validation="validation"
												:label="$t('forms.content.tools.weathercocking.exitVelocity')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="exitVelocityMeasurementUnitsIdRef"
												vid="exitVelocityMeasurementUnitsId"
												v-model="exitVelocityMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="exitVelocityMeasurementUnitIdRef"
												vid="exitVelocityMeasurementUnitId"
												v-model="exitVelocityMeasurementUnitId"
												:measurementUnitsId="exitVelocityMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsVelocityType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.velocity')"
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
								{{ $t('strings.content.tools.weathercocking.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('strings.content.tools.weathercocking.degrees') }}</span>&nbsp;&nbsp;
									</v-col>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('strings.content.tools.weathercocking.weathercocked') }}</span>&nbsp;&nbsp;
									</v-col>
								</v-row>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-bold">{{ calculationResults.angleDegrees }}</span>
									</v-col>
									<v-col cols="4">
										<span 
										class="text-bold"
										:style="'color: ' + (calculationResults.weathercocked ? 'red' : 'green')"
									>{{ calculationResults.weathercocked ? $t('strings.yes') : $t('strings.no') }}</span>
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

import { useWeathercockingBaseComponent } from '@/components/content/tools/weathercockingBase';

import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import MeasurementUnitSelect from '@/components/content/tools/MeasurementUnitSelect';
import MeasurementUnitsSelect from '@/components/content/tools/MeasurementUnitsSelect';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';

export default {
	name: 'Weathercocking',
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
			measurementUnitsVelocityType,
			serviceToolsWeathercocking,
			calculationData,
			calculationResults,
			exitVelocity,
			exitVelocityMeasurementUnitsId,
			exitVelocityMeasurementUnitId,
			weathercockingFormRef,
			windVelocity,
			windVelocityMeasurementUnitsId,
			windVelocityMeasurementUnitId,
			calculationOk,
			initCalculationData,
			reset,
			resetForm,
			scope,
			validation,
		} = useWeathercockingBaseComponent(props, context);

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
			measurementUnitsVelocityType,
			serviceToolsWeathercocking,
			calculationData,
			calculationResults,
			exitVelocity,
			exitVelocityMeasurementUnitsId,
			exitVelocityMeasurementUnitId,
			weathercockingFormRef,
			windVelocity,
			windVelocityMeasurementUnitsId,
			windVelocityMeasurementUnitId,
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
			exitVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			exitVelocityMeasurementUnitsId: { required, $autoDirty: true },
			exitVelocityMeasurementUnitId: { required, $autoDirty: true },
			windVelocity: { required, decimal, between: between(0.1, 999), $autoDirty: true },
			windVelocityMeasurementUnitsId: { required, $autoDirty: true },
			windVelocityMeasurementUnitId: { required, $autoDirty: true }
		};
	}
};
</script>
