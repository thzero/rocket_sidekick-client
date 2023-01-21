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
											ref="motorSelected1Ref"
											vid="motorSelected1"
											v-model="motorSelected1"
											:validation="validation"
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
											ref="motorSelected2Ref"
											vid="motorSelected2"
											v-model="motorSelected2"
											:validation="validation"
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
											:readonly="!motorSelected2"
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
											:readonly="!motorSelected2"
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
											:readonly="!motorSelected2"
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
												:disabled="!motorSelected2"
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
											ref="motorSelected3Ref"
											vid="motorSelected3"
											v-model="motorSelected3"
											:validation="validation"
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
											:readonly="!motorSelected3"
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
											:readonly="!motorSelected3"
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
											:readonly="!motorSelected3"
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
												:disabled="!motorSelected3"
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
											ref="motorSelected4Ref"
											vid="motorSelected4"
											v-model="motorSelected4"
											:validation="validation"
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
											:readonly="!motorSelected4"
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
											:readonly="!motorSelected4"
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
											:readonly="!motorSelected4"
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
												:disabled="!motorSelected4"
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
										<span>{{ (item.initial) + ' '  + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="item.peak">{{ item.peak + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
									<v-col cols="3">
										<span v-if="item.average">{{ item.average + ' ' + $t('strings.content.tools.thrust2Weight.to') }}</span>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
						<v-row dense class="pb-4">
							<v-col>
								{{ $t('strings.content.tools.thrust2Weight.guidance') }} <a class="external" href="https://www.thrustcurve.org" target="_blank">{{ $t('menu.thrustcurve') }}</a>.
								<div v-if="hasResults">
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
import { between, decimal, helpers, required } from '@vuelidate/validators';

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
			toFixed,
			settings,
			serviceToolsThrust2Weight,
			calculationResults,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			formThrust2WeightRef,
			mass,
			massMeasurementUnitId,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			measurementUnitsWeightType,
			motorLookup1,
			motorLookup2,
			motorLookup3,
			motorLookup4,
			motorLookupSelection,
			motorSelected1,
			motorSelected2,
			motorSelected3,
			motorSelected4,
			motorLookupUrl1,
			motorLookupUrl2,
			motorLookupUrl3,
			motorLookupUrl4,
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
			hasResults,
			reset,
			resetForm,
			selectMotor,
			scope,
			validation
		} = useAppThrust2WeightComponent(props, context);

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
			calculationResults,
			dialogMotorSearchRef,
			dialogMotorSearchManager,
			formThrust2WeightRef,
			mass,
			massMeasurementUnitId,
			maxLaunchRodTime,
			maxLaunchRodTimeDefault,
			measurementUnitsWeightType,
			motorLookup1,
			motorLookup2,
			motorLookup3,
			motorLookup4,
			motorLookupSelection,
			motorSelected1,
			motorSelected2,
			motorSelected3,
			motorSelected4,
			motorLookupUrl1,
			motorLookupUrl2,
			motorLookupUrl3,
			motorLookupUrl4,
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
			hasResults,
			reset,
			resetForm,
			selectMotor,
			scope,
			validation
		};
	},
	validations () {
		return {
			data2: { $autoDirty: true },
			mass: { required, decimal, between: between(0, 9999), $autoDirty: true },
			massMeasurementUnitId: { $autoDirty: true },
			maxLaunchRodTime: { required, decimal, between: between(0, 5), $autoDirty: true },
			motorSelected1: { $autoDirty: true },
			motorSelected2: { $autoDirty: true },
			motorSelected3: { $autoDirty: true },
			motorSelected4: { $autoDirty: true },
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
	return siblings.motorSelected2 ? !String.isNullOrEmpty(value) && siblings.motorSelected2 && siblings.thrustInitial2 : true;
}
const thrustInitialtRequired3 = (value, siblings, vm) => {
	return siblings.motorSelected3 ? !String.isNullOrEmpty(value) && siblings.motorSelected3 && siblings.thrustInitial3 : true;
}
const thrustInitialtRequired4 = (value, siblings, vm) => {
	return siblings.motorSelected4 ? !String.isNullOrEmpty(value) && siblings.motorSelected4 && siblings.thrustInitial4: true;
}

const thrustAverageInitialI = (value, initial) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(initial))
		return true;
	// return (value > Number(initial));
	return true;
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

const thrustInitialAverageI = (value, average) => {
	if (!value)
		return true;
	if (String.isNullOrEmpty(average))
		return true;
	// return (value <= Number(average));
	return true;
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
	return (value >= Number(initial));
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
