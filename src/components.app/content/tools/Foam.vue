<template>
	<ToolsLayout>
		<ContentHeader
			:value="contentTitle"
		/>
		<ContentDescription id="strings.content.tools.foam" />
		<v-row dense>
			<v-col cols="12">
				<VtFormControl
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
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												{{ $t('forms.content.tools.foam.inputUnits') }}
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="lengthMeasurementUnitsIdRef"
													v-model="lengthMeasurementUnitsId"
													vid="lengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="lengthMeasurementUnitRef"
													v-model="lengthMeasurementUnitId"
													vid="lengthMeasurementUnitId"
													:measurementUnitsId="lengthMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td> -->
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="lengthMeasurementUnitRef"
													v-model="lengthMeasurementUnitId"
													vid="lengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												{{ $t('forms.content.tools.foam.outputUnits') }}
											</td>
											<!-- <td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="fluidMeasurementUnitsIdRef"
													v-model="fluidMeasurementUnitsId"
													vid="fluidMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect
													ref="fluidMeasurementUnitIdRef"
													v-model="fluidMeasurementUnitId"
													vid="fluidMeasurementUnitId"
													:measurementUnitsId="fluidMeasurementUnitsId"
													:measurementUnitsType="measurementUnitsFluidType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.fluid')"
												/>
											</td> -->
											<td class="measurementUnitLong">
												<measurement-unit-select-2
													ref="fluidMeasurementUnitIdRef"
													v-model="fluidMeasurementUnitId"
													vid="fluidMeasurementUnitId"
													:measurementUnitsType="measurementUnitsFluidType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.fluid')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
						</v-row>
						<v-row dense>
							<!-- <v-col cols="12" sm="6" >
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="bodyTubeIDRef"
													v-model="bodyTubeID"
													vid="bodyTubeID"
													:validation="validation"
													:label="$t('forms.content.tools.foam.bodyTubeID')"
												/>
											</td>
											<td class="measurementUnitsMedium">
												<MeasurementUnitsSelect
													ref="lengthMeasurementUnitsIdRef"
													v-model="lengthMeasurementUnitsId"
													vid="lengthMeasurementUnitsId"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</td>
											<td class="measurementUnitMedium">
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
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="lengthMeasurementUnitRef"
													v-model="lengthMeasurementUnitId"
													vid="lengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col> -->
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="bodyTubeIDRef"
													v-model="bodyTubeID"
													vid="bodyTubeID"
													:validation="validation"
													:label="$t('forms.content.tools.foam.bodyTubeID')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="bodyTubeIDLengthMeasurementUnitIdRef"
													v-model="bodyTubeIDLengthMeasurementUnitId"
													vid="bodyTubeIDLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.sfettings.measurementUnits.diameter')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="motorTubeODRef"
													v-model="motorTubeOD"
													vid="motorTubeOD"
													:validation="validation"
													:label="$t('forms.content.tools.foam.motorTubeOD')"
													:placeholder="$t('forms.content.tools.foam.motorTubeOD_hint')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="motorTubeODLengthMeasurementUnitIdRef"
													v-model="motorTubeODLengthMeasurementUnitId"
													vid="motorTubeODLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.diameter')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="finRootLengthRef"
													v-model="finRootLength"
													vid="finRootLength"
													:validation="validation"
													:label="$t('forms.content.tools.foam.finRootLength')"
													:placeholder="$t('forms.content.tools.foam.finRootLength_hint')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="finRootLengthMeasurementUnitIdRef"
													v-model="finRootLengthMeasurementUnitId"
													vid="finRootLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="finTabLengthRef"
													v-model="finTabLength"
													vid="finTabLength"
													:validation="validation"
													:label="$t('forms.content.tools.foam.finTabLength')"
													:placeholder="$t('forms.content.tools.foam.finTabLength_hint')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="finTabLengthMeasurementUnitIdRef"
													v-model="finTabLengthMeasurementUnitId"
													vid="finTabLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="12" sm="6">
								<table style="width: 100%">
									<tbody>
										<tr>
											<td>
												<VtNumberFieldWithValidation
													ref="finWidthRef"
													v-model="finWidth"
													vid="finWidth"
													:validation="validation"
													:label="$t('forms.content.tools.foam.finWidth')"
													:placeholder="$t('forms.content.tools.foam.finWidth_hint')"
												/>
											</td>
											<td class="measurementUnitMedium">
												<MeasurementUnitSelect2
													ref="finWidthLengthMeasurementUnitIdRef"
													v-model="finWidthLengthMeasurementUnitId"
													vid="finWidthLengthMeasurementUnitId"
													:measurementUnitsType="measurementUnitsLengthType"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.width')"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-col>
							<v-col cols="6" >
								<VtNumberFieldWithValidation
									ref="numberFinsRef"
									v-model="numberFins"
									vid="numberFins"
									:validation="validation"
									:label="$t('forms.content.tools.foam.numberFins')"
									:placeholder="$t('forms.content.tools.foam.numberFins_hint')"
								/>
							</v-col>
						</v-row>
					</template>
				</VtFormControl>
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
	</ToolsLayout>
</template>

<script>
import { useFoamBaseComponent } from '@/components.app/content/tools/foamBase';
import { useFoamValidation } from '@/components.app/content/tools/foamValidation';

import ContentAttribution from '@/components/content/Attribution';
import CalculatedOuput from '@/components/content/tools//CalculatedOuput';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect from '@/components/content/MeasurementUnitSelect.vue';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import MeasurementUnitsSelect from '@/components/content/MeasurementUnitsSelect';
import ToolsLayout from '@/components/content/tools/Layout.vue';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';

export default {
	name: 'Foam',
	components: {
		ContentAttribution,
		CalculatedOuput,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect,
		MeasurementUnitSelect2,
		MeasurementUnitsSelect,
		ToolsLayout,
		VtFormControl,
		VtNumberFieldWithValidation
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
			setNotify,
			setSuccessMessage,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsFluidType,
			measurementUnitsLengthType,
			serviceToolsFoam,
			calculationData,
			calculationResults,
			formFoamRef,
			bodyTubeID,
			bodyTubeIDLengthMeasurementUnitId,
			bodyTubeIDLengthMeasurementUnitsId,
			finRootLength,
			finRootLengthMeasurementUnitId,
			finRootLengthMeasurementUnitsId,
			finTabLength,
			finTabLengthMeasurementUnitId,
			finTabLengthMeasurementUnitsId,
			finWidth,
			finWidthLengthMeasurementUnitId,
			finWidthLengthMeasurementUnitsId,
			fluidMeasurementUnitId,
			fluidMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			motorTubeOD,
			motorTubeODLengthMeasurementUnitId,
			motorTubeODLengthMeasurementUnitsId,
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
			setNotify,
			setSuccessMessage,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			measurementUnitsFluidType,
			measurementUnitsLengthType,
			serviceToolsFoam,
			calculationData,
			calculationResults,
			formFoamRef,
			bodyTubeID,
			bodyTubeIDLengthMeasurementUnitId,
			bodyTubeIDLengthMeasurementUnitsId,
			finRootLength,
			finRootLengthMeasurementUnitId,
			finRootLengthMeasurementUnitsId,
			finTabLength,
			finTabLengthMeasurementUnitId,
			finTabLengthMeasurementUnitsId,
			finWidth,
			finWidthLengthMeasurementUnitId,
			finWidthLengthMeasurementUnitsId,
			fluidMeasurementUnitId,
			fluidMeasurementUnitsId,
			lengthMeasurementUnitId,
			lengthMeasurementUnitsId,
			motorTubeOD,
			motorTubeODLengthMeasurementUnitId,
			motorTubeODLengthMeasurementUnitsId,
			numberFins,
			calculationOk,
			initCalculationData,
			scope,
			validation
		};
	},
	validations () {
		return useFoamValidation;
	}
};
</script>
