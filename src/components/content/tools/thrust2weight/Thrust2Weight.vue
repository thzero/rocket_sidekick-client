<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.thrust2Weight') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="formThrust2WeightRef"
					:validation="validation"
					:resetForm="resetForm"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.calculate"
					notifyMessageSaved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tr><td>
										<VNumberFieldWithValidation
											ref="massRef"
											vid="mass"
											v-model="mass"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.mass')"
										/>
									</td>
									<td>
										<MeasurementSelect
											ref="massMeasurementUnitRef"
											vid="massMeasurementUnitId"
											v-model="massMeasurementUnitId"
											:measurementUnitsId="measurementUnitsId"
											:measurementUnitsType="measurementUnitsWeightType"
											:validation="validation"
											:label="$t('forms.settings.measurementUnits.weight')"
										/>
									</td></tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<VNumberFieldWithValidation
									ref="maxLaunchRodTimeRef"
									vid="maxLaunchRodTime"
									v-model="maxLaunchRodTime"
									:validation="validation"
									:label="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan')"
									:placeholder="$t('forms.content.tools.thrust2Weight.max_launch_rod_timespan_hint')"
								/>
							</v-col>
							<v-col cols="6">
								<v-row dense>
									<v-col cols="12">
										<VCheckboxWithValidation
											ref="motorData1Ref"
											vid="motorData1"
											v-model="motorData1"
											:validation="validation"
											:hide-details="true"
											:readonly="true"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 1'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustInitial1Ref"
											vid="thrustInitial1"
											v-model="thrustInitial1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustPeak1Ref"
											vid="thrustPeak1"
											v-model="thrustPeak1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustAverage1Ref"
											vid="thrustAverage1"
											v-model="thrustAverage1"
											:validation="validation"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table><tr><td style="width: 100%;">
											<VTextField
												ref="motorLookup1Ref"
												vid="motorLookup1"
												v-model="motorLookup1"
												:readonly="true"
												:label="$t('forms.content.tools.thrust2Weight.motor')"
												:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
											/>
										</td>
										<td>
											<v-btn
												class="ml-2"
												color="primary"
												@click="clickMotorSearch(1)"
											>
												{{ $t('buttons.search') }}
											</v-btn>
										</td></tr></table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="6">
								<v-row dense>
									<v-col cols="12">
										<VCheckboxWithValidation
											ref="motorData2Ref"
											vid="motorData2"
											v-model="motorData2"
											:validation="validation"
											:hide-details="true"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 2'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustInitial2Ref"
											vid="thrustInitial2"
											v-model="thrustInitial2"
											:validation="validation"
											:readonly="!motorData2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustPeak2Ref"
											vid="thrustPeak2"
											v-model="thrustPeak2"
											:validation="validation"
											:readonly="!motorData2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustAverage2Ref"
											vid="thrustAverage2"
											v-model="thrustAverage2"
											:validation="validation"
											:readonly="!motorData2"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table><tr><td style="width: 100%;">
											<VTextField
												ref="motorLookup2Ref"
												vid="motorLookup2"
												v-model="motorLookup2"
												:readonly="true"
												:label="$t('forms.content.tools.thrust2Weight.motor')"
												:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
											/>
										</td>
										<td>
											<v-btn
												class="ml-2"
												color="primary"
												@click="clickMotorSearch(2)"
											>
												{{ $t('buttons.search') }}
											</v-btn>
										</td></tr></table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="6">
								<v-row dense>
									<v-col cols="12">
										<VCheckboxWithValidation
											ref="motorData3Ref"
											vid="motorData3"
											v-model="motorData3"
											:validation="validation"
											:hide-details="true"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 3'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustInitial3Ref"
											vid="thrustInitial3"
											v-model="thrustInitial3"
											:validation="validation"
											:readonly="!motorData3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustPeak3Ref"
											vid="thrustPeak3"
											v-model="thrustPeak3"
											:validation="validation"
											:readonly="!motorData3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustAverage3Ref"
											vid="thrustAverage3"
											v-model="thrustAverage3"
											:validation="validation"
											:readonly="!motorData3"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table><tr><td style="width: 100%;">
											<VTextField
												ref="motorLookup3Ref"
												vid="motorLookup3"
												v-model="motorLookup3"
												:readonly="true"
												:label="$t('forms.content.tools.thrust2Weight.motor')"
												:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
											/>
										</td>
										<td>
											<v-btn
												class="ml-2"
												color="primary"
												@click="clickMotorSearch(3)"
											>
												{{ $t('buttons.search') }}
											</v-btn>
										</td></tr></table>
									</v-col>
								</v-row>
							</v-col>
							<v-col cols="6">
								<v-row dense>
									<v-col cols="12">
										<VCheckboxWithValidation
											ref="motorData4Ref"
											vid="motorData4"
											v-model="motorData4"
											:validation="validation"
											:hide-details="true"
											:label="$t('forms.content.tools.thrust2Weight.specifications') + ' 4'"
										/>
									</v-col>
								</v-row>
								<v-row dense>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustInitial4Ref"
											vid="thrustInitial4"
											v-model="thrustInitial4"
											:validation="validation"
											:readonly="!motorData4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_initial') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_initial_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustPeak4Ref"
											vid="thrustPeak4"
											v-model="thrustPeak4"
											:validation="validation"
											:readonly="!motorData4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_peak') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_peak_hint')"
										/>
									</v-col>
									<v-col cols="12" md="6">
										<VNumberFieldWithValidation
											ref="thrustAverage4Ref"
											vid="thrustAverage4"
											v-model="thrustAverage4"
											:validation="validation"
											:readonly="!motorData4"
											:label="$t('forms.content.tools.thrust2Weight.thrust_average') + ' ' + $t('forms.content.tools.thrust2Weight.thrust')"
											:placeholder="$t('forms.content.tools.thrust2Weight.thrust_average_hint')"
										/>
									</v-col>
									<v-col cols="12" lg="6">
										<table><tr><td style="width: 100%;">
											<VTextField
												ref="motorLookup4Ref"
												vid="motorLookup4"
												v-model="motorLookup4"
												:readonly="true"
												:label="$t('forms.content.tools.thrust2Weight.motor')"
												:placeholder="$t('forms.content.tools.thrust2Weight.motor_hint')"
											/>
										</td>
										<td>
											<v-btn
												class="ml-2"
												color="primary"
												@click="clickMotorSearch(4)"
											>
												{{ $t('buttons.search') }}
											</v-btn>
										</td></tr></table>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</template>
					<!-- <template v-slot:buttons_pre>
						<v-btn
							class="mr-2"
							color="primary"
							@click="clickMotorSearch"
						>
							{{ $t('buttons.search') }}
						</v-btn>
					</template> -->
				</VFormControl>
			</v-col>
		</v-row>
		<v-row class="pt-4" dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense class="pb-2">
							<v-col class="text-center text-h5">
								{{ $t('strings.content.tools.thrust2Weight.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="3">
										<span class="text-bold">{{ $t('forms.content.tools.thrust2Weight.specifications') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_initial') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_peak') }}</span>
									</v-col>
									<v-col cols="3">
										<span class="text-bold">{{ $t('forms.content.tools.thrust2Weight.thrust_average') }}</span>
									</v-col>
								</v-row>
								<v-row 
									class="pb-2" dense
									v-for="(item, index) in calculationResults.data"
									:key="index"
								>
									<v-col cols="3">
										<span>{{ index+1 }}</span>
									</v-col>
									<v-col cols="3">
										<span>{{ (calculationResults['initial' + item.key]) + ' '  + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="calculationResults['peak' + item.key]">{{ (calculationResults.peak) + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="calculationResults['average' + item.key]">{{ (calculationResults.average) + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<v-row dense class="pb-4">
							<v-col>
								{{ $t('strings.content.tools.thrust2Weight.guidance') }} <a class="external" href="https://www.thrustcurve.org" target="_blank">{{ $t('menu.thrustcurve') }}</a>.
								<div v-if="motor">
									<br>
									{{ $t('strings.content.tools.thrust2Weight.guidance2') }}
								</div>
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
	<MotorLookupDialog
		ref="dialogMotorSearchRef"
		:signal="dialogMotorSearchManager.signal"
		@close="dialogMotorSearchManager.cancel()"
		@ok="selectMotor"
	/>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';
import { between, decimal, helpers, required } from '@vuelidate/validators';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import DialogSupport from '@/library_vue/components/support/dialog';

import { useToolsBaseComponent } from '@/components/content/tools/toolBase';

import CalculatedOuput from '@/components/content/tools/CalculatedOuput';
import MeasurementSelect from '@/components/content/tools/MeasurementSelect';
import MotorLookupDialog from '@/components/external/MotorLookupDialog';
import VCheckboxWithValidation from '@/library_vue_vuetify/components/form//VCheckboxWithValidation';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form//VSelectWithValidation';
import VTextField from '@/library_vue_vuetify/components/form//VTextField';

export default {
	name: 'Thrust2Weight',
	components: {
		CalculatedOuput,
		MeasurementSelect,
		MotorLookupDialog,
		VCheckboxWithValidation,
		VFormControl,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextField
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
			setNotify,
			toFixed,
			settings
		} = useToolsBaseComponent(props, context);

		const serviceToolsThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);

		const calculationData1 = ref(null);
		const calculationData2 = ref(null);
		const calculationData3 = ref(null);
		const calculationData4 = ref(null);
		const calculationResults = initCalculationResults(correlationId(), ref({}));
		const dialogMotorSearchRef = ref(null);
		const dialogMotorSearchManager = ref(new DialogSupport());
		const formThrust2WeightRef = ref(null);
		const mass = ref(null);
		const massMeasurementUnitId = ref(null);
		const maxLaunchRodTime = ref(null);
		const maxLaunchRodTimeDefault = ref(0.3);
		const measurementUnitsWeightType = ref(Constants.MeasurementUnits.types.weight);
		const motorData1 = ref(true);
		const motorData2 = ref(false);
		const motorData3 = ref(false);
		const motorData4 = ref(false);
		const motorLookup1 = ref(null);
		const motorLookup2 = ref(null);
		const motorLookup3 = ref(null);
		const motorLookup4 = ref(null);
		const motorLookup1Id = ref(null);
		const motorLookup2Id = ref(null);
		const motorLookup3Id = ref(null);
		const motorLookup4Id = ref(null);
		const motorLookupSelection = ref(null);
		const thrustAverage1 = ref(null);
		const thrustAverage2 = ref(null);
		const thrustAverage3 = ref(null);
		const thrustAverage4 = ref(null);
		const thrustInitial1 = ref(null);
		const thrustInitial2 = ref(null);
		const thrustInitial3 = ref(null);
		const thrustInitial4 = ref(null);
		const thrustPeak1 = ref(null);
		const thrustPeak2 = ref(null);
		const thrustPeak3 = ref(null);
		const thrustPeak4 = ref(null);
		
		const calculationOk = async () => {
			calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
				initCalculationData(correlationIdI);

				// const response = await serviceToolsThrust2Weight.initializeCalculation(correlationIdI, calculationData1.value, measurementUnitsId.value, settings);
				// if (!hasSucceeded(response))
				// 	return false; // TODO

				// response.results.instance.addListener(correlationIdI, handleListener);
				// const responseCalc = response.results.instance.calculate(correlationIdI, response.results.steps);
				// if (!hasSucceeded(responseCalc))
				// 	return false; // TODO

				// calculationResultsI.value = responseCalc.results;
				// return true;

				calculationResultsI.value.data = [ { key: '', data: calculationData1 } ];
				if (motorData2.value)
					calculationResultsI.value.data.push({ key: '2', data: calculationData2 });
				if (motorData3.value)
					calculationResultsI.value.data.push({ key: '3', data: calculationData3 });
				if (motorData4.value)
					calculationResultsI.value.data.push({ key: '4', data: calculationData4 });

				let responseCalc;
				for(let item of calculationResultsI.value.data) {
					responseCalc = await executeCalculation(correlationIdI, item.data);
					if (hasSucceeded(responseCalc)) {
						calculationResultsI.value['average' + item.key] = responseCalc.results.average;
						calculationResultsI.value['initial' + item.key] = responseCalc.results.initial;
						calculationResultsI.value['peak' + item.key] = responseCalc.results.peak;
					}
				}

				// if (motorData2.value) {
				// 	responseCalc = await executeCalculation(correlationIdI, calculationData2);
				// 	if (hasSucceeded(responseCalc)) {
				// 		calculationResultsI.value.average2 = responseCalc.results.average;
				// 		calculationResultsI.value.initial2 = responseCalc.results.initial;
				// 		calculationResultsI.value.peak2 = responseCalc.results.peak;
				// 	}
				// }
				// if (motorData3.value ){
				// 	responseCalc = await executeCalculation(correlationIdI, calculationData3);
				// 	if (hasSucceeded(responseCalc)) {
				// 		calculationResultsI.value.average3 = responseCalc.results.average;
				// 		calculationResultsI.value.initial3 = responseCalc.results.initial;
				// 		calculationResultsI.value.peak3 = responseCalc.results.peak;
				// 	}
				// }
				// if (motorData4.value) {
				// 	responseCalc = await executeCalculation(correlationIdI, calculationData4);
				// 	if (hasSucceeded(responseCalc)) {
				// 		calculationResultsI.value.average4 = responseCalc.results.average;
				// 		calculationResultsI.value.initial4 = responseCalc.results.initial;
				// 		calculationResultsI.value.peak4 = responseCalc.results.peak;
				// 	}
				// }

				return true;
			});
		};
		const clickMotorSearch = async (selection) => {
			motorLookupSelection.value = selection;
			await dialogMotorSearchRef.value.reset(correlationId());
			dialogMotorSearchManager.value.open();
		};
		const executeCalculation = async (correlationId, calculationData) => {
			const response = await serviceToolsThrust2Weight.initializeCalculation(correlationId, calculationData, measurementUnitsId.value, settings);
			if (!hasSucceeded(response))
				return error();

			response.results.instance.addListener(correlationId, handleListener);
			return response.results.instance.calculate(correlationId, response.results.steps);
		};
		const initCalculationData = (correlationId) => {
			calculationData1.value.mass = mass.value;
			calculationData1.value.units = massMeasurementUnitId.value;
			calculationData1.value.maxLaunchRodTime = maxLaunchRodTime.value;
			calculationData1.value.thrustAverage = thrustAverage1.value;
			calculationData1.value.thrustInitial = thrustInitial1.value;
			calculationData1.value.thrustPeak = thrustPeak1.value;
			
			calculationData2.value.mass = mass.value;
			calculationData2.value.units = massMeasurementUnitId.value;
			calculationData2.value.maxLaunchRodTime = maxLaunchRodTime.value;
			calculationData2.value.thrustAverage = thrustAverage2.value;
			calculationData2.value.thrustInitial = thrustInitial2.value;
			calculationData2.value.thrustPeak = thrustPeak2.value;

			calculationData3.value.mass = mass.value;
			calculationData3.value.units = massMeasurementUnitId.value;
			calculationData3.value.maxLaunchRodTime = maxLaunchRodTime.value;
			calculationData3.value.thrustAverage = thrustAverage3.value;
			calculationData3.value.thrustInitial = thrustInitial3.value;
			calculationData3.value.thrustPeak = thrustPeak3.value;

			calculationData4.value.mass = mass.value;
			calculationData4.value.units = massMeasurementUnitId.value;
			calculationData4.value.maxLaunchRodTime = maxLaunchRodTime.value;
			calculationData4.value.thrustAverage = thrustAverage4.value;
			calculationData4.value.thrustInitial = thrustInitial4.value;
			calculationData4.value.thrustPeak = thrustPeak4.value;
		};
		const reset = async (correlationId) => {
			await formThrust2WeightRef.value.reset(correlationId, false);
		};
		const resetForm = (correlationId) => {
			resetFormI(correlationId, calculationResults, (correlationId) => {
				mass.value = null;
				// motorData1.value = false;
				motorData2.value = false;
				motorData3.value = false;
				motorData4.value = false;
				motorLookup1.value = null;
				motorLookup2.value = null;
				motorLookup3.value = null;
				motorLookup4.value = null;
				motorLookup1Id .value = null;
				motorLookup2Id .value = null;
				motorLookup3Id .value = null;
				motorLookup4Id .value = null;
				motorLookupSelection.value = null;
				thrustAverage1.value = null;
				thrustAverage2.value = null;
				thrustAverage3.value = null;
				thrustAverage4.value = null;
				thrustInitial1.value = null;
				thrustInitial2.value = null;
				thrustInitial3.value = null;
				thrustInitial4.value = null;
				thrustPeak1.value = null;
				thrustPeak2.value = null;
				thrustPeak3.value = null;
				thrustPeak4.value = null;
				maxLaunchRodTime.value = maxLaunchRodTimeDefault.value;
			});
		};
		const selectMotor = async (item)=> {
			const correlationIdI = correlationId();
			if (!motorLookupSelection.value)
				return;

			const response = await serviceStore.dispatcher.requestMotor(correlationIdI, item.motorId);
			if (hasSucceeded(response)) {
				initCalculationData(correlationIdI);
				const response2 = await serviceToolsThrust2Weight.update(correlationIdI, response, calculationData);
				if (hasSucceeded(response2)) {
					let temp = motorLookup1;
					let tempId = motorLookup1Id;
					if (motorLookupSelection.value === 1) {
						temp = motorLookup2.value;
						tempId = motorLookup2Id.value;
					}
					else if (motorLookupSelection.value === 1) {
						temp = motorLookup2.value;
						tempId = motorLookup2Id.value;
					}
					else if (motorLookupSelection.value === 1) {
						temp = motorLookup3.value;
						tempId = motorLookup3Id.value;
					}

					temp.value = item.designation;
					tempId.value = item.motorId;

					calculationData.value = response2.results;
					thrustAverage1.value = calculationData.value.thrustAverage;
					thrustInitial1.value = calculationData.value.thrustInitial1;
					thrustPeak.value = calculationData.value.thrustPeak;

					setNotify(correlationId, 'messages.thrust2Weight.motor.selected');
					return;
				}

				setNotify(correlationId, 'messages.thrust2Weight.motor.selected');
			}
			dialogMotorSearchManager.value.ok();
		}

		onMounted(async () => {
			reset(false);

			calculationData1.value = serviceToolsThrust2Weight.initialize(correlationId());
			calculationData2.value = serviceToolsThrust2Weight.initialize(correlationId());
			calculationData3.value = serviceToolsThrust2Weight.initialize(correlationId());
			calculationData4.value = serviceToolsThrust2Weight.initialize(correlationId());
			massMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
		});

		watch(() => motorData1,
			(value) => {
				if (value)
					return;
				thrustAverage1.value = null;
				thrustInitial1.value = null;
				thrustPeak1.value = null;
			}
		);
		watch(() => motorData2,
			(value) => {
				if (value)
					return;
				thrustAverage2.value = null;
				thrustInitial2.value = null;
				thrustPeak2.value = null;
			}
		);
		watch(() => motorData3,
			(value) => {
				if (value)
					return;
				thrustAverage3.value = null;
				thrustInitial3.value = null;
				thrustPeak3.value = null;
			}
		);
		watch(() => motorData4,
			(value) => {
				if (value)
					return;
				thrustAverage4.value = null;
				thrustInitial4.value = null;
				thrustPeak4.value = null;	
			}
		);

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
			serviceToolsThrust2Weight,
			calculationData1,
			calculationData2,
			calculationData3,
			calculationData4,
			calculationResults,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			formThrust2WeightRef,
			mass,
			massMeasurementUnitId,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			measurementUnitsWeightType,
			motorData1,
			motorData2,
			motorData3,
			motorData4,
			motorLookup1,
			motorLookup2,
			motorLookup3,
			motorLookup4,
			motorLookup1Id,
			motorLookup2Id,
			motorLookup3Id,
			motorLookup4Id,
			motorLookupSelection,
			thrustAverage1,
			thrustAverage2,
			thrustAverage3,
			thrustAverage4,
			thrustInitial1,
			thrustInitial2,
			thrustInitial3,
			thrustInitial4,
			thrustPeak1,
			thrustPeak2,
			thrustPeak3,
			thrustPeak4,
			calculationOk,
			clickMotorSearch,
			executeCalculation,
			reset,
			resetForm,
			selectMotor,
			scope: 'Thrust2Weight',
			validation: useVuelidate({ $scope: 'Thrust2Weight' })
		};
	},
	validations () {
		return {
			data2: { $autoDirty: true },
			mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
			massMeasurementUnitId: { $autoDirty: true },
			maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
			thrustAverage1: {
				decimal, between: between(0, 40960), 
				thrustAverageInitial1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial1), 
				thrustAveragePeak1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak1), 
				$autoDirty: true, $lazy: true 
			},
			thrustAverage2: {
				decimal, between: between(0, 40960), 
				thrustAverageInitial2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial2), 
				thrustAveragePeak2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak2), 
				$autoDirty: true, $lazy: true 
			},
			thrustAverage3: {
				decimal, between: between(0, 40960), 
				thrustAverageInitial3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial3), 
				thrustAveragePeak3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak3), 
				$autoDirty: true, $lazy: true 
			},
			thrustAverage4: {
				decimal, between: between(0, 40960), 
				thrustAverageInitial4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAverageInitial'), thrustAverageInitial4), 
				thrustAveragePeak4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustAveragePeak'), thrustAveragePeak4), 
				$autoDirty: true, $lazy: true 
			},
			thrustInitial1: {
				required, decimal, between: between(0, 40960), 
				thrustInitialAverage1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage1), 
				thrustInitialPeak1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak1), 
				$autoDirty: true 
			},
			thrustInitial2: { 
				thrustInitialtRequired2, decimal, between: between(0, 40960), 
				thrustInitialAverage2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage2), 
				thrustInitialPeak2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak2), 
				$autoDirty: true 
			},
			thrustInitial3: { 
				thrustInitialtRequired3, decimal, between: between(0, 40960), 
				thrustInitialAverage3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage3), 
				thrustInitialPeak3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak3), 
				$autoDirty: true 
			},
			thrustInitial4: { 
				thrustInitialtRequired4, decimal, between: between(0, 40960), 
				thrustInitialAverage4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialAverage'), thrustInitialAverage4), 
				thrustInitialPeak4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustInitialPeak'), thrustInitialPeak4), 
				$autoDirty: true 
			},
			// thrustInitial3: { required, decimal, between: between(0, 40960), $autoDirty: true },
			// thrustInitial4: { required, decimal, between: between(0, 40960), $autoDirty: true },
			thrustPeak1: { 
				decimal, between: between(0, 40960), 
				thrustPeakAverage1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage1), 
				thrustPeakInitial1: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial1), 
				$autoDirty: true, $lazy: true 
			},
			thrustPeak2: { 
				decimal, between: between(0, 40960), 
				thrustPeakAverage2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage2), 
				thrustPeakInitial2: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial2), 
				$autoDirty: true, $lazy: true 
			},
			thrustPeak3: { 
				decimal, between: between(0, 40960), 
				thrustPeakAverage3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage3), 
				thrustPeakInitial3: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial3), 
				$autoDirty: true, $lazy: true 
			},
			thrustPeak4: { 
				decimal, between: between(0, 40960), 
				thrustPeakAverage4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakAverage'), thrustPeakAverage4), 
				thrustPeakInitial4: helpers.withMessage(GlobalUtility.$trans.t('errors.content.tools.thrust2Weight.thrustPeakInitial'), thrustPeakInitial4), 
				$autoDirty: true, $lazy: true 
			},
		};
	}
};

const thrustInitialtRequired2 = (value, siblings, vm) => {
	return siblings.motorData2 ? !String.isNullOrEmpty(value) && siblings.motorData2 && siblings.thrustInitial2 : true;
}
const thrustInitialtRequired3 = (value, siblings, vm) => {
	return siblings.motorData3 ? !String.isNullOrEmpty(value) && siblings.motorData3 && siblings.thrustInitial3 : true;
}
const thrustInitialtRequired4 = (value, siblings, vm) => {
	return siblings.motorData4 ? !String.isNullOrEmpty(value) && siblings.motorData4 && siblings.thrustInitial4: true;
}

const thrustInitialAverageI = (value, average) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(average))
		return true;
	return (value <= Number(average));
}
const thrustInitialAverage1 = (value, siblings, vm) => {
	return thrustInitialAverageI(Number(value), siblings.thrustAverage1);
}
const thrustInitialAverage2 = (value, siblings, vm) => {
	return thrustInitialAverageI(Number(value), siblings.thrustAverage2);
}
const thrustInitialAverage3 = (value, siblings, vm) => {
	return thrustInitialAverageI(Number(value), siblings.thrustAverage3);
}
const thrustInitialAverage4 = (value, siblings, vm) => {
	return thrustInitialAverageI(Number(value), siblings.thrustAverage4);
}

const thrustInitialPeakI = (value, peak) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(peak))
		return true;
	return (value <= Number(peak));
}
const thrustInitialPeak1 = (value, siblings, vm) => {
	return thrustInitialPeakI(Number(value), siblings.thrustPeak1);
}
const thrustInitialPeak2 = (value, siblings, vm) => {
	return thrustInitialPeakI(Number(value), siblings.thrustPeak2);
}
const thrustInitialPeak3 = (value, siblings, vm) => {
	return thrustInitialPeakI(Number(value), siblings.thrustPeak3);
}
const thrustInitialPeak4 = (value, siblings, vm) => {
	return thrustInitialPeakI(Number(value), siblings.thrustPeak4);
}

const thrustAverageInitialI = (value, initial) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(initial))
		return true;
	return (value > Number(initial));
}
const thrustAverageInitial1 = (value, siblings, vm) => {
	return thrustAverageInitialI(Number(value), siblings.thrustInitial1);
}
const thrustAverageInitial2 = (value, siblings, vm) => {
	return thrustAverageInitialI(Number(value), siblings.thrustInitial2);
}
const thrustAverageInitial3 = (value, siblings, vm) => {
	return thrustAverageInitialI(Number(value), siblings.thrustInitial3);
}
const thrustAverageInitial4 = (value, siblings, vm) => {
	return thrustAverageInitialI(Number(value), siblings.thrustInitial4);
}

const thrustAveragePeakI = (value, peak, vm) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(peak))
		return true;
	return (value < Number(peak));
}
const thrustAveragePeak1 = (value, siblings, vm) => {
	return thrustAveragePeakI(Number(value), siblings.thrustPeak1);
}
const thrustAveragePeak2 = (value, siblings, vm) => {
	return thrustAveragePeakI(Number(value), siblings.thrustPeak2);
}
const thrustAveragePeak3 = (value, siblings, vm) => {
	return thrustAveragePeakI(Number(value), siblings.thrustPeak3);
}
const thrustAveragePeak4 = (value, siblings, vm) => {
	return thrustAveragePeakI(Number(value), siblings.thrustPeak4);
}

const thrustPeakAverageI = (value, average) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(average))
		return true;
	return (value > Number(average));
}
const thrustPeakAverage1 = (value, siblings, vm) => {
	return thrustPeakAverageI(Number(value), siblings.thrustAverage1);
}
const thrustPeakAverage2 = (value, siblings, vm) => {
	return thrustPeakAverageI(Number(value), siblings.thrustAverage2);
}
const thrustPeakAverage3 = (value, siblings, vm) => {
	return thrustPeakAverageI(Number(value), siblings.thrustAverage3);
}
const thrustPeakAverage4 = (value, siblings, vm) => {
	return thrustPeakAverageI(Number(value), siblings.thrustAverage4);
}

const thrustPeakInitialI = (value, initial) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(initial))
		return true;
	return (value > Number(initial));
}
const thrustPeakInitial1 = (value, siblings, vm) => {
	return thrustPeakInitialI(Number(value), siblings.thrustInitial1);
}
const thrustPeakInitial2 = (value, siblings, vm) => {
	return thrustPeakInitialI(Number(value), siblings.thrustInitial2);
}
const thrustPeakInitial3 = (value, siblings, vm) => {
	return thrustPeakInitialI(Number(value), siblings.thrustInitial3);
}
const thrustPeakInitial4 = (value, siblings, vm) => {
	return thrustPeakInitialI(Number(value), siblings.thrustInitial4);
}
</script>
