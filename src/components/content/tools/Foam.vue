<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.foam') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="formFoamRef"
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
									<tr><td>
										<VNumberFieldWithValidation
											ref="bodyTubeIDRef"
											vid="bodyTubeID"
											v-model="bodyTubeID"
											:validation="validation"
											:label="$t('forms.content.tools.foam.bodyTubeID')"
										/>
									</td>
									<td>
										<MeasurementSelect
											ref="lengthMeasurementUnitRef"
											vid="lengthMeasurementUnitId"
											v-model="lengthMeasurementUnitId"
											:measurementUnitsId="measurementUnitsId"
											:measurementUnitsType="measurementUnitslengthType"
											:validation="validation"
											:label="$t('forms.settings.measurementUnits.length')"
										/>
									</td></tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="motorTubeODRef"
									vid="motorTubeOD"
									v-model="motorTubeOD"
									:validation="validation"
									:label="$t('forms.content.tools.foam.motorTubeOD')"
									:placeholder="$t('forms.content.tools.foam.motorTubeOD_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finRootLengthRef"
									vid="finRootLength"
									v-model="finRootLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finRootLength')"
									:placeholder="$t('forms.content.tools.foam.finRootLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finTabLengthRef"
									vid="finTabLength"
									v-model="finTabLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finTabLength')"
									:placeholder="$t('forms.content.tools.foam.finTabLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finWidthRef"
									vid="finWidth"
									v-model="finWidth"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finWidth')"
									:placeholder="$t('forms.content.tools.foam.finWidth_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="numberFinsRef"
									vid="numberFins"
									v-model="numberFins"
									:validation="validation"
									:label="$t('forms.content.tools.foam.numberFins')"
									:placeholder="$t('forms.content.tools.foam.numberFins_hint')"
								/>
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
								{{ $t('strings.content.tools.foam.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-bold">{{ $t('forms.content.tools.foam.totalVolume') }}</span>&nbsp;&nbsp;
										<span class="text-bold" v-if="calculationResults.totalVolume">{{ calculationResults.totalVolume }}</span>
									</v-col>
								</v-row>
								<v-row 
									class="pb-2" 
									dense
									no-gutters
								>
									<v-col cols="3" style="">
											{{ $t('strings.content.tools.foam.brand') }}
									</v-col>
									<v-col cols="2" style="">
											{{ $t('strings.content.tools.foam.expansion') }}
									</v-col>
									<v-col cols="2" style="">
											{{ $t('strings.content.tools.foam.density') }}
									</v-col>
									<v-col cols="2" style="">
											{{ $t('strings.content.tools.foam.foamWeight') }}
									</v-col>
									<v-col cols="2" style="">
											{{ $t('strings.content.tools.foam.requiredAmount') }}
									</v-col>
								</v-row>
								<v-row 
									class="pb-2" 
									dense
									no-gutters
									v-for="item in calculationResults.foams"
									:key="item.manufacturer"
								>
									<v-col cols="3" style="">
											{{ item.manufacturer }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.expansion }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.densityMD }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.foamWeight }}
									</v-col>
									<v-col cols="2" style="">
											{{ item.requiredAmount }}
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
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { between, decimal, integer, helpers, required } from '@vuelidate/validators';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import MeasurementSelect from '@/components/content/tools/MeasurementSelect';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';

export default {
	name: 'Foam',
	components: {
		CalculatedOuput,
		VFormControl,
		MeasurementSelect,
		VNumberFieldWithValidation
	},
	setup (props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			success,
			calculationOutput,
			calculateI,
			handleListener,
			initCalculationResults,
			measurementUnitsId,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsDistanceDefaultId,
			measurementUnitsLengthDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVolumeDefaultId,
			measurementUnitsWeightDefaultId,
			resetFormI,
			serviceStore,
			toFixed,
			settings,
		} = useToolsBaseComponent(props, context);

		const serviceToolsFoam = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FOAM);

		const calculationData = ref(null);
		const calculationResults = initCalculationResults(correlationId(), ref({}));
		const formFoamRef = ref(null);
		const bodyTubeID = ref(null);
		const finRootLength = ref(null);
		const finTabLength = ref(0.3);
		const finWidth = ref(null);
		const lengthMeasurementUnitId = ref(null);
		const measurementUnitslengthType = ref(Constants.MeasurementUnits.types.length);
		const motorTubeOD = ref(null);
		const numberFins = ref(null);

		const calculationOk = async () => {
			calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
				calculationResultsI.value.foams = [];

				const responseFoams = await serviceToolsFoam.foams(correlationIdI);
				if (!responseFoams || !responseFoams.success) {
					return false; // TODO
				}

				initCalculationData(correlationIdI);
				const responseCalc = await serviceToolsFoam.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsId.value, settings);
				if (!responseCalc || !responseCalc.success) {
					return false; // TODO
				}

				responseCalc.results.instance.addListener(correlationIdI, handleListener);
				const responseCalcInstance = responseCalc.results.instance.calculate(correlationIdI, responseCalc.results.steps, 'volume');
				if (!responseCalcInstance || !responseCalcInstance.success) {
					return false; // TODO
				}
				calculationResultsI.value = responseCalcInstance.results;
				calculationResultsI.value.calculated = false;
				calculationResultsI.value.foams = [];
				
				let responseCalcFoam;
				let responseCalcFoamInstance;
				for (const foam of responseFoams.results) {
					foam.totalVolume = calculationResultsI.value.totalVolume;
					responseCalcFoam = await serviceToolsFoam.initializeCalculationFoam(correlationIdI, foam, measurementUnitsId.value);
					if (!responseCalcFoam || !responseCalcFoam.success) {
						continue; // TODO
					}

					responseCalcFoam.results.instance.addListener(correlationIdI, handleListener);
					responseCalcFoamInstance = responseCalcFoam.results.instance.calculate(correlationIdI, responseCalcFoam.results.steps, foam.manufacturer);
					if (!responseCalcFoamInstance || !responseCalcFoamInstance.success) {
						continue; // TODO
					}

					calculationResultsI.value.foams.push(responseCalcFoamInstance.results);
				}

				return true;
			});
		};
		const initCalculationData = (correlationId) => {
			calculationData.value.bodyTubeID = bodyTubeID.value;
			calculationData.value.units = lengthMeasurementUnitId.value;
			calculationData.value.finRootLength = finRootLength.value;
			calculationData.value.finTabLength = finTabLength.value;
			calculationData.value.finWidth = finWidth.value;
			calculationData.value.motorTubeOD = motorTubeOD.value;
			calculationData.value.numberFins = numberFins.value;
		};
		const reset = async (correlationId) => {
			await formFoamRef.value.reset(correlationId, false);
		};
		const resetForm = (correlationId) => {
			resetFormI(correlationId, calculationResults, (correlationId) => {
				calculationResults.value.foams = [];

				bodyTubeID.value = null;
				finRootLength.value = null;
				finTabLength.value = null;
				finWidth.value = null;
				motorTubeOD.value = null;
				numberFins .value = null;
			});
		};

		onMounted(async () => {
			reset(false);

			calculationData.value = serviceToolsFoam.initialize(correlationId());
			lengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			success,
			calculationOutput,
			calculateI,
			handleListener,
			initCalculationResults,
			measurementUnitsId,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsDistanceDefaultId,
			measurementUnitsLengthDefaultId,
			measurementUnitsVelocityDefaultId,
			measurementUnitsVolumeDefaultId,
			measurementUnitsWeightDefaultId,
			resetFormI,
			serviceStore,
			toFixed,
			settings,
			serviceToolsFoam,
			calculationData,
			calculationResults,
			formFoamRef,
			bodyTubeID,
			finRootLength,
			finTabLength,
			finWidth,
			lengthMeasurementUnitId,
			measurementUnitslengthType,
			motorTubeOD,
			numberFins,
			calculationOk,
			initCalculationData,
			reset,
			resetForm,
			scope: 'Thrust2Weight',
			validation: useVuelidate({ $scope: 'Thrust2Weight' })
		};
	},
	validations () {
		return {
			bodyTubeID: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finRootLength: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finTabLength: { 
				decimal, between: between(0, 999999), 
				finTabFinRoot: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.foam.finTabFinRoot'), finTabFinRoot), 
				$autoDirty: true 
			},
			finWidth: {
				required, decimal, between: between(0, 999999), 
				motorTfinWidthubeBodyTube: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.foam.finWidth'), finWidth), 
				$autoDirty: true 
			},
			motorTubeOD: { 
				required, decimal, between: between(0, 9999), 
				motorTubeBodyTube: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.foam.motorTubeBodyTube'), motorTubeBodyTube), 
				$autoDirty: true 
			},
			numberFins: { required, integer, between: between(0, 999999), $autoDirty: true }
		};
	}
};

const finTabFinRoot = (value, siblings, vm) => {
	value = Number(value);
	if (siblings.finRootLength && (value >= Number(siblings.finRootLength)))
		return false;
	return true;
}

const finWidth = (value, siblings, vm) => {
	value = Number(value);
	if (!siblings.motorTubeOD)
		return true;
	const motorTubeOD = Number(siblings.motorTubeOD);
	const delta = value / motorTubeOD;
	if (delta > 0.5)
		return false;
	return true;
}

const motorTubeBodyTube = (value, siblings, vm) => {
	value = Number(value);
	if (siblings.bodyTubeID && (value >= Number(siblings.bodyTubeID)))
		return false;
	return true;
}
</script>