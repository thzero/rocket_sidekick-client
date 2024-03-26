<template>
	<div>
		<div class="pb-4"
			v-if="errors"
		>
			<v-banner
				color="error"
			>
				<v-banner-text>
					<span v-html="errorMessage"></span>
				</v-banner-text>
			</v-banner>
		</div>
		<ContentHeader
			:value="contentTitle"
		/>
		<!-- <ContentDescription id="strings.content.tools.flightInfo" /> -->
		<v-row dense>
			<v-col cols="12" lg="3">
				<VtFormControl
					ref="formFlightInfoRef"
					:validation="validation"
					:reset-additional="resetAdditionalInput"
					button-clear-name="buttons.reset"
					button-ok-name="buttons.process"
					notify-message-saved=""
					@ok="flightInfoProcess"
				>
					<template v-slot:default>
						<div class="pb-4">
							<v-card
								class="mb-4"
								flat
								bordered
								dense>
								<v-card-item>
									<v-row dense>
										<v-col cols="12">
											<VtTextFieldWithValidation
												ref="flightDataTitleRef"
												v-model="flightDataTitle"
												vid="flightDataTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VtTextFieldWithValidation
												ref="flightDataLocationRef"
												v-model="flightDataLocation"
												vid="flightDataLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VtDateTimePickerField
												ref="flightDataDateRef"
												v-model="flightDataDate"
												vid="flightDataDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VtSelectWithValidation
												ref="flightProcessorRef"
												v-model="flightProcessor"
												vid="flightProcessor"
												:items="flightProcessors"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.processors.title')"
											/>
										</v-col>
										<v-col cols="12">
											<v-card
												variant="outlined"
											>
												<v-card-text>
													<v-row dense>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsIdRef"
																v-model="flightMeasurementUnitsId"
																vid="flightMeasurementUnitsId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altimeter')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAccelerationIdRef"
																v-model="flightMeasurementUnitsAccelerationId"
																vid="flightMeasurementUnitsAccelerationId"
																:items="flightMeasurementUnitsOptionsAcceleration"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.acceleration')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAltitudeIdRef"
																v-model="flightMeasurementUnitsAltitudeId"
																vid="flightMeasurementUnitsAltitudeId"
																:items="flightMeasurementUnitsOptionsAltitude"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsVelocityIdRef"
																v-model="flightMeasurementUnitsVelocityId"
																vid="flightMeasurementUnitsVelocityId"
																:items="flightMeasurementUnitsOptionsVelocity"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.velocity')"
															/>
														</v-col>
													</v-row>
												</v-card-text>
											</v-card>
										</v-col>
										<v-col cols="12">
											<v-card
												variant="outlined"
											>
												<v-card-text>
													<v-row dense>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsOutputIdRef"
																v-model="flightMeasurementUnitsOutputId"
																vid="flightMeasurementUnitsOutputId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.output')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAccelerationOutputIdRef"
																v-model="flightMeasurementUnitsAccelerationOutputId"
																vid="flightMeasurementUnitsAccelerationOutputId"
																:items="flightMeasurementUnitsOptionsAcceleration"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.acceleration')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAltitudeOutputIdRef"
																v-model="flightMeasurementUnitsAltitudeOutputId"
																vid="flightMeasurementUnitsAltitudeOutputId"
																:items="flightMeasurementUnitsOptionsAltitude"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsVelocityOutputIdRef"
																v-model="flightMeasurementUnitsVelocityOutputId"
																vid="flightMeasurementUnitsVelocityOutputId"
																:items="flightMeasurementUnitsOptionsVelocity"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.velocity')"
															/>
														</v-col>
													</v-row>
												</v-card-text>
											</v-card>
										</v-col>
										<v-col cols="12">
											<v-row dense>
												<v-col cols="12">
													<v-row dense no-gutters align="center" class="fill-height">
														<v-col cols="4">
															<span
																:class="!flightInfoDataTypeActual ? 'disabled' : ''"
															>
																{{ $t('forms.content.tools.flightInfo.actual') }}
															</span>
														</v-col>
														<v-col cols="4">
															<VtSwitchWithValidation
																ref="flightInfoDataTypeUseRef"
																v-model="flightInfoDataTypeUse"
																vid="flightInfoDataTypeUse"
																:validation="validation"
															/>
														</v-col>
														<v-col cols="4" class="align-center justify-center">
															<span
																:class="!flightInfoDataTypeFiltered ? 'disabled' : ''"
															>
																{{ $t('forms.content.tools.flightInfo.filtered') }}
															</span>
														</v-col>
													</v-row>
												</v-col>
											</v-row>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<v-card
								flat
								bordered
								dense>
								<v-expansion-panels
									v-model="styles"
								>
									<v-expansion-panel
										:title="$t('forms.content.tools.flightInfo.style.title')"
										value="foo"
									>
										<v-expansion-panel-text>
											<v-row dense>
												<v-col cols="12" lg="6">
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeFColor"
														vid="flightInfoStyleAltitudeFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.filtered')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeColor"
														vid="flightInfoStyleAltitudeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityFColor"
														vid="flightInfoStyleVelocityFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.filtered')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityColor"
														vid="flightInfoStyleVelocityColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventApogeeColor"
														vid="flightInfoStyleEventApogeeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.title')"
													/>
													<VtColorWithValidation
														v-model="flightInfoStyleEventApogeeBorderColor"
														vid="flightInfoStyleEventApogeeBorderColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.border')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventDrogueColor"
														vid="flightInfoStyleEventDrogueColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.drogue.title')"
													/>
													<VtColorWithValidation
														v-model="flightInfoStyleEventDrogueBorderColor"
														vid="flightInfoStyleEventDrogueBorderColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.drogue.border')"
													/>
												</v-col>
											</v-row>
											<v-row dense>
												<v-col cols="12">
													<div style="float: right;">
														<v-btn
															:variant="buttonsForms.variant.clear"
															:color="buttonsForms.color.clear"
															class="ml-2"
															@click="clickStylesReset"
														>
															{{ $t('buttons.reset') }}
														</v-btn>
														<!-- <v-btn
															:variant="buttonsForms.variant.ok"
															:color="buttonsForms.color.ok"
															class="ml-2"
															@click="saveStyles"
														>
															{{ $t('buttons.save') }}
														</v-btn> -->
														</div>
												</v-col>
											</v-row>
										</v-expansion-panel-text>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-card>
						</div>
					</template>
					<template v-slot:buttons_post>
						<v-menu
							v-if="!buttons.export.disabled"
						>
							<template v-slot:activator="{ props }">
								<v-btn
									append-icon="mdi-menu-down"
									:color="buttonsForms.color.default"
									class="ml-2"
									v-bind="props"
								>
									{{ $t('buttons.export') }}
								</v-btn>
							</template>

							<v-list>
								<v-list-item
									@click="flightInfoExportImage"
								>
									<v-list-item-title>
										{{ $t('forms.content.tools.flightInfo.export.image') }}
									</v-list-item-title>
								</v-list-item>
								<v-list-item
									@click="flightInfoExportJson"
								>
									<v-list-item-title>{{ $t('forms.content.tools.flightInfo.export.json') }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</template>
					<template v-slot:after>
						<div class="pt-4">
							<v-row dense>
								<v-col cols="12" md="8" lg="12">
									<VtTextAreaWithValidation
										ref="flightInfoInputRef"
										v-model="flightInfoInput"
										vid="flightInfoInput"
										:validation="validation"
										:blur="flightInfoInputChange"
										:label="$t('forms.content.tools.flightInfo.csv')"
									/>
								</v-col>
								<v-col cols="12" md="4" lg="12">
									<DropFile 
										@selected="dropOutput"
									/>
								</v-col>
							</v-row>
						</div>
						<div class="pt-4" style="float: right">
							<v-btn
								density="compact"
								@click="flightInfoInputChange"
							>
								{{ $t('buttons.top') }}
							</v-btn>
						</div>
					</template>
				</VtFormControl>
			</v-col>
			<v-col cols="12" lg="9" class="pl-4">
				<div>
					<table style="width: 100%;">
						<tr>
							<td style="white-space: nowrap;">
								<v-chip
									color="secondary"
								>
									{{ $t('forms.content.tools.flightInfo.resolution')}}: {{ resolution }}
								</v-chip>
								<v-btn
									class="ml-2"
									size="small"
									:color="buttonsForms.color.default"
									@click="clickResolution(720)"
								>
									720
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									:color="buttonsForms.color.default"
									@click="clickResolution(1080)"
								>
									1080
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									:color="buttonsForms.color.default"
									@click="clickResolution(1440)"
								>
									1440
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									:color="buttonsForms.color.default"
									@click="clickResolution(1920)"
								>
									1920
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									:color="buttonsForms.color.default"
									@click="clickResolution(2048)"
								>
									2048
								</v-btn>
							</td>
							<td
								v-if="$vuetify.display.lgAndUp"
								style="width: 100%;"
							>
								<table style="width: 100%;">
									<tr>
										<td style="width: 100%;">
											<v-slider
												v-model="resolution"
												:min="720"
												:max="2048"
												step="1"
												class="ml-4"
												style="width: 100%;"
												dense
											/>
										</td>
										<td style="white-space: nowrap;">
											<v-btn
												class="ml-8 ml-4"
        										size="small"
												:color="buttonsForms.color.default"
												@click="clickResolution(this.resolution)"
											>
												{{ $t('forms.content.tools.flightInfo.set') }}
											</v-btn>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr
							v-if="$vuetify.display.mdAndDown"
						>
							<td
								style="width: 100%;"
							>
								<table style="width: 100%;">
									<tr>
										<td style="width: 100%;">
											<v-slider
												v-model="resolution"
												:min="720"
												:max="2048"
												step="1"
												class="ml-4"
												style="width: 100%;"
												dense
											/>
										</td>
										<td style="white-space: nowrap;">
											<v-btn
												class="ml-8 ml-4"
        										size="small"
												:color="buttonsForms.color.default"
												@click="clickResolution(this.resolution)"
											>
												{{ $t('forms.content.tools.flightInfo.set') }}
											</v-btn>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
				<table
					id="flight-info"
					:style="'color: black; background-color: white; width: ' + resolution + 'px;'"
				>
					<tr><td colspan="2">
						<v-progress-linear
							v-if="downloadProgress"
							indeterminate
							height="10"
							color="primary"
						/>
					</td></tr>
					<tr>
						<td>
							<FlightInfoChart
								ref="flightInfoChartRef"
								:chart-data="flightInfoChartData"
							/>
						</td>
						<td >
							<FlightInfoData
								id="flight-info"
								ref="flightInfoRef"
								v-model="flightInfo"
							/>
						</td>
					</tr>
				</table>
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
	<v-snackbar
		v-model="notifySignal"
		:color="notifyColor"
		:timeout="notifyTimeout"
    >
		{{ notifyMessage }}
    </v-snackbar>
</template>

<script>
import FlightInfoData from '@/components.app/content/tools/flightInfo/FlightInfoData';
import FlightInfoChart from '@/components.app/content/tools/flightInfo/charts/FlightInfo';

import { useFlightInfoBaseComponent } from '@/components.app/content/tools/flightInfo/flightInfoBase';
import { useFlightInfoValidation } from '@/components.app/content/tools/flightInfo/flightInfoValidation';

import ContentAttribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import ContentDescription from '@/components/content/Description';
import DropFile from '@/components.app/content/tools/dropFile';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtColorWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtColorWithValidation';
import VtDateTimePickerField from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldTemp';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'FlightInfo',
	components: {
		ContentAttribution,
		ContentDescription,
		ContentHeader,
		DropFile,
		FlightInfoData,
		FlightInfoChart,
		MeasurementUnitSelect2,
		VtColorWithValidation,
		VtDateTimePickerField,
		VtFormControl,
		VtSelectWithValidation,
		VtSwitchWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
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
			contentLoadSignal,
			contentLoadStart,
			contentLoadStop,
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
			flightDataDate,
			flightDataLocation,
			flightDataTitle,
			flightMeasurementUnitsId,
			flightMeasurementUnitsAccelerationId,
			flightMeasurementUnitsAltitudeId,
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsAccelerationOutputId,
			flightMeasurementUnitsAltitudeOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightInstructions,
			flightMeasurementUnitsOptionsAcceleration,
			flightMeasurementUnitsOptionsAltitude,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave,
			buttonsDialog,
			buttonsForms,
			buttons,
			downloadProgress,
			expanded,
			flightInfo,
			flightInfoChartData,
			flightInfoDataTypeActual,
			flightInfoDataTypeError,
			flightInfoDataTypeFiltered,
			flightInfoDataTypeUse,
			flightInfoDataTypeUseDisabled,
			flightInfoInput,
			flightInfoStyleAltitudeColor,
			flightInfoStyleAltitudeFColor,
			flightInfoStyleEventApogeeColor,
			flightInfoStyleEventApogeeBorderColor,
			flightInfoStyleEventDrogueColor,
			flightInfoStyleEventDrogueBorderColor,
			flightInfoStyleEventMainColor,
			flightInfoStyleEventMainBorderColor,
			flightInfoStyleVelocityColor,
			flightInfoStyleVelocityFColor,
			resolution,
			checkFlightInfoDataTypeUse,
			clickResolution,
			clickStylesReset,
			dropOutput,
			flightInfoInputChange,
			flightInfoStyleLoad,
			flightInfoStyleReset,
			flightInfoStyleSave,
			flightInfoExport,
			flightInfoExportDownload,
			flightInfoExportImage,
			flightInfoExportJson,
			flightInfoExportName,
			flightInfoExportText,
			flightInfoProcess,
			getScreenshotOfElement,
			reset,
			resetAdditionalInput,
			scope,
			validation
		} = useFlightInfoBaseComponent(props, context, { id: 'flightInfo' });

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
			contentLoadSignal,
			contentLoadStart,
			contentLoadStop,
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
			flightDataDate,
			flightDataLocation,
			flightDataTitle,
			flightMeasurementUnitsId,
			flightMeasurementUnitsAccelerationId,
			flightMeasurementUnitsAltitudeId,
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsAccelerationOutputId,
			flightMeasurementUnitsAltitudeOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightInstructions,
			flightMeasurementUnitsOptionsAcceleration,
			flightMeasurementUnitsOptionsAltitude,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave,
			buttonsDialog,
			buttonsForms,
			buttons,
			downloadProgress,
			expanded,
			flightInfo,
			flightInfoChartData,
			flightInfoDataTypeActual,
			flightInfoDataTypeError,
			flightInfoDataTypeFiltered,
			flightInfoDataTypeUse,
			flightInfoDataTypeUseDisabled,
			flightInfoInput,
			flightInfoStyleAltitudeColor,
			flightInfoStyleAltitudeFColor,
			flightInfoStyleEventApogeeColor,
			flightInfoStyleEventApogeeBorderColor,
			flightInfoStyleEventDrogueColor,
			flightInfoStyleEventDrogueBorderColor,
			flightInfoStyleEventMainColor,
			flightInfoStyleEventMainBorderColor,
			flightInfoStyleVelocityColor,
			flightInfoStyleVelocityFColor,
			resolution,
			checkFlightInfoDataTypeUse,
			clickResolution,
			clickStylesReset,
			dropOutput,
			flightInfoInputChange,
			flightInfoStyleLoad,
			flightInfoStyleReset,
			flightInfoStyleSave,
			flightInfoExport,
			flightInfoExportDownload,
			flightInfoExportImage,
			flightInfoExportJson,
			flightInfoExportName,
			flightInfoExportText,
			flightInfoProcess,
			getScreenshotOfElement,
			reset,
			resetAdditionalInput,
			scope,
			validation
		}
	},
	validations () {
		return useFlightInfoValidation(this.flightInfoDataTypeFiltered, this.flightInfoDataTypeActual);
	}
};
</script>
