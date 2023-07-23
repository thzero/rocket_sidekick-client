<template>
	<div>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.foam" />
		<v-row dense>
			<v-col cols="12">
				<VFormControl
					ref="formFoamRef"
					:validation="validation"
					:reset-additional="resetAdditional"
					button-clear-name="buttons.reset"
					button-ok-name="buttons.calculate"
					notify-message-saved="messages.calculated"
					@ok="calculationOk"
				>
					<template v-slot:default>
						<v-row dense>
							<v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tr>
										<td>
											<VNumberFieldWithValidation
												ref="bodyTubeIDRef"
												v-model="bodyTubeID"
												vid="bodyTubeID"
												:validation="validation"
												:label="$t('forms.content.tools.foam.bodyTubeID')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="lengthMeasurementUnitsIdRef"
												v-model="lengthMeasurementUnitsId"
												vid="lengthMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="lengthMeasurementUnitRef"
												v-model="lengthMeasurementUnitId"
												vid="lengthMeasurementUnitId"
												:measurementUnitsId="lengthMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsLengthType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.length')"
											/>
										</td>
									</tr>
								</table>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="motorTubeODRef"
									v-model="motorTubeOD"
									vid="motorTubeOD"
									:validation="validation"
									:label="$t('forms.content.tools.foam.motorTubeOD')"
									:placeholder="$t('forms.content.tools.foam.motorTubeOD_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finRootLengthRef"
									v-model="finRootLength"
									vid="finRootLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finRootLength')"
									:placeholder="$t('forms.content.tools.foam.finRootLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finTabLengthRef"
									v-model="finTabLength"
									vid="finTabLength"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finTabLength')"
									:placeholder="$t('forms.content.tools.foam.finTabLength_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="finWidthRef"
									v-model="finWidth"
									vid="finWidth"
									:validation="validation"
									:label="$t('forms.content.tools.foam.finWidth')"
									:placeholder="$t('forms.content.tools.foam.finWidth_hint')"
								/>
							</v-col>
							<v-col cols="12" sm="6" >
								<VNumberFieldWithValidation
									ref="numberFinsRef"
									v-model="numberFins"
									vid="numberFins"
									:validation="validation"
									:label="$t('forms.content.tools.foam.numberFins')"
									:placeholder="$t('forms.content.tools.foam.numberFins_hint')"
								/>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<table style="width: 100%">
									<tr>
										<td class="measurementUnits">
											<MeasurementUnitsSelect
												ref="fluidMeasurementUnitsIdRef"
												v-model="fluidMeasurementUnitsId"
												vid="fluidMeasurementUnitsId"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.title')"
											/>
										</td>
										<td class="measurementUnits">
											<MeasurementUnitSelect
												ref="fluidMeasurementUnitIdRef"
												v-model="fluidMeasurementUnitId"
												vid="fluidMeasurementUnitId"
												:measurementUnitsId="fluidMeasurementUnitsId"
												:measurementUnitsType="measurementUnitsFluidType"
												:validation="validation"
												:label="$t('forms.settings.measurementUnits.fluid')"
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
								{{ $t('strings.content.tools.foam.calculated') }}
							</v-col>
						</v-row>
						<v-row dense class="pb-2" v-if="calculationResults.calculated">
							<v-col>
								<v-row class="pb-2" dense>
									<v-col cols="4">
										<span class="text-h6 text-bold">{{ $t('forms.content.tools.foam.totalVolume') }}</span>&nbsp;&nbsp;
										<span class="text-h6 text-bold" v-if="calculationResults.totalVolume">{{ calculationResults.totalVolume }}</span>
									</v-col>
								</v-row>
								<v-row
									class="pb-2"
									dense
									no-gutters
								>
									<v-col cols="3" style="text-h6 ">
											{{ $t('strings.content.tools.foam.brand') }}
									</v-col>
									<v-col cols="2" style="text-h6 ">
											{{ $t('strings.content.tools.foam.expansion') }}
									</v-col>
									<v-col cols="2" style="text-h6 ">
											{{ $t('strings.content.tools.foam.density') }}
									</v-col>
									<v-col cols="2" style="text-h6 ">
											{{ $t('strings.content.tools.foam.foamWeight') }}
									</v-col>
									<v-col cols="2" style="text-h6 ">
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
		<v-row dense
			v-show="hasAttribution"
		>
			<v-col cols="12" class="text-center text-h5 pb-2; float: right">
				<v-card>
					<v-card-text class="float: right">
<ContentAttribution :value="content" @has-attribution="handleAttribution" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { between, decimal, integer, helpers, required } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useFoamBaseComponent } from '@/components.app/content/tools/foamBase';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect.vue';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VNumberFieldWithValidation';

export default {
	name: 'Foam',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitsSelect,
		VFormControl,
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
			noBreakingSpaces,
			notImplementedError,
			success,
			contentLoadSignal,
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetAdditional,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsFluidType,
			measurementUnitsLengthType,
			serviceToolsFoam,
			calculationData,
			calculationResults,
			formFoamRef,
			bodyTubeID,
			finRootLength,
			finTabLength,
			finWidth,
			fluidMeasurementUnitId,
			fluidMeasurementUnitsId ,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			motorTubeOD,
			numberFins,
			calculationOk,
			initCalculationData,
			scope,
			validation
		} = useFoamBaseComponent(props, context);

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
			contentLoadSignal,
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetAdditional,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsFluidType,
			measurementUnitsLengthType,
			serviceToolsFoam,
			calculationData,
			calculationResults,
			formFoamRef,
			bodyTubeID,
			finRootLength,
			finTabLength,
			finWidth,
			fluidMeasurementUnitId,
			fluidMeasurementUnitsId ,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			motorTubeOD,
			numberFins,
			calculationOk,
			initCalculationData,
			scope,
			validation
		};
	},
	validations () {
		return {
			bodyTubeID: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finRootLength: { required, decimal, between: between(0, 9999), $autoDirty: true },
			finTabLength: {
				decimal, between: between(0, 999999),
				finTabFinRoot: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.finTabFinRoot'), finTabFinRoot),
				$autoDirty: true
			},
			finWidth: {
				required, decimal, between: between(0, 999999),
				motorTfinWidthubeBodyTube: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.finWidth'), finWidth),
				$autoDirty: true
			},
			fluidMeasurementUnitId: { $autoDirty: true },
			fluidMeasurementUnitsId: { required, $autoDirty: true },
			lengthMeasurementUnitId: { $autoDirty: true },
			lengthMeasurementUnitsId: { required, $autoDirty: true },
			motorTubeOD: {
				required, decimal, between: between(0, 9999),
				motorTubeBodyTube: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.motorTubeBodyTube'), motorTubeBodyTube),
				$autoDirty: true
			},
			numberFins: { required, integer, between: between(0, 999999), $autoDirty: true }
		};
	}
};

const finTabFinRoot = (value, siblings, vm) => {
	value = Number(value);
	if (siblings.finRootLength && (value > Number(siblings.finRootLength)))
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
