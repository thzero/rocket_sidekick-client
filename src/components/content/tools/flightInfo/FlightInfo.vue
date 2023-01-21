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
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.tools.flightInfo') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" lg="3">
				<VFormControl
					ref="formFlightInfoRef"
					:validation="validation"
					:resetForm="resetInput"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.process"
					notifyMessageSaved=""
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
											<VTextFieldWithValidation
												ref="flightDataTitleRef"
												vid="flightDataTitle"
												v-model="flightDataTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightDataLocationRef"
												vid="flightDataLocation"
												v-model="flightDataLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VDateTimeField
												ref="flightDataDateRef"
												vid="flightDataDate"
												v-model="flightDataDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
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
															<VSelectWithValidation
																ref="flightMeasurementUnitsIdRef"
																v-model="flightMeasurementUnitsId"
																vid="flightMeasurementUnitsId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altimeter')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsAccelerationIdRef"
																v-model="flightMeasurementUnitsAccelerationId"
																vid="flightMeasurementUnitsAccelerationId"
																:items="flightMeasurementUnitsOptionsAcceleration"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.acceleration')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsDistanceIdRef"
																v-model="flightMeasurementUnitsDistanceId"
																vid="flightMeasurementUnitsDistanceId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
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
															<VSelectWithValidation
																ref="flightMeasurementUnitsOutputIdRef"
																v-model="flightMeasurementUnitsOutputId"
																vid="flightMeasurementUnitsOutputId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.output')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsAccelerationOutputIdRef"
																v-model="flightMeasurementUnitsAccelerationOutputId"
																vid="flightMeasurementUnitsAccelerationOutputId"
																:items="flightMeasurementUnitsOptionsAcceleration"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.acceleration')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsDistanceOutputIdRef"
																v-model="flightMeasurementUnitsDistanceOutputId"
																vid="flightMeasurementUnitsDistanceOutputId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightInfo.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
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
															<VSwitchWithValidation
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
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeFColor"
														vid="flightInfoStyleAltitudeFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.filtered')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleAltitudeColor"
														vid="flightInfoStyleAltitudeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.altitude.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityFColor"
														vid="flightInfoStyleVelocityFColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.filtered')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleVelocityColor"
														vid="flightInfoStyleVelocityColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.velocity.title')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventApogeeColor"
														vid="flightInfoStyleEventApogeeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.title')"
													/>
													<VColorWithValidation
														v-model="flightInfoStyleEventApogeeBorderColor"
														vid="flightInfoStyleEventApogeeBorderColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.apogee.border')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightInfoStyleEventDrogueColor"
														vid="flightInfoStyleEventDrogueColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightInfo.style.event.drogue.title')"
													/>
													<VColorWithValidation
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
															class="ml-2"
															color="primary"
															@click="clickStylesReset"
														>
															{{ $t('buttons.reset') }}
														</v-btn>
														<!-- <v-btn
															class="ml-2"
															color="green"
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
									class="ml-2"
									color="primary"
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
							<VTextAreaWithValidation
								ref="flightInfoInputRef"
								vid="flightInfoInput"
								v-model="flightInfoInput"
								:validation="validation"
								:blur="flightInfoInputChange"
								:label="$t('forms.content.tools.flightInfo.csv')"
							/>
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
				</VFormControl>
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
									color="primary" 
									@click="clickResolution(720)"
								>
									720
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1080)"
								>
									1080
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1440)"
								>
									1440
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
									@click="clickResolution(1920)"
								>
									1920
								</v-btn>
								<v-btn
									class="ml-2"
									size="small"
									color="primary" 
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
												color="primary" 
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
												color="primary" 
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
							<flightInfoChart
								ref="flightInfoChartRef"
								:chart-data="flightInfoChartData"
							/>
						</td>
						<td >
							<flightInfoData
								id="flight-info"
								ref="flightInfoRef"
								v-model="flightInfo"
							/>
						</td>
					</tr>
				</table>
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
import { required, requiredUnless } from '@vuelidate/validators';

import flightInfoData from '@/components/content/tools/flightInfo/FlightInfoData';
import flightInfoChart from '@/components/content/tools/flightInfo/charts/FlightInfo';

import { useAppFlightInfoComponent } from '@/components/content/tools/flightInfo/appFlightInfo';

import VColorWithValidation from '@/library_vue_vuetify/components/form/VColorWithValidation';
import VDateTimeField from '@/library_vue_vuetify/components/form/VDateTimeFieldTemp';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@/library_vue_vuetify/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@/library_vue_vuetify/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightInfo',
	components: {
		flightInfoData,
		flightInfoChart,
		VColorWithValidation,
		VDateTimeField,
		VFormControl,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
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
			measurementUnitsId,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsDistanceDefaultId,
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
			flightDataDate,
			flightDataLocation,
			flightDataTitle,
			flightMeasurementUnitsId,
			flightMeasurementUnitsAccelerationId,
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsAccelerationOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightMeasurementUnitsOptionsAcceleration,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave,
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
			resetInput,
			scope,
			validation
		} = useAppFlightInfoComponent(props, context);

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
			measurementUnitsId,
			measurementUnitsAccelerationDefaultId,
			measurementUnitsAreaDefaultId,
			measurementUnitsFluidDefaultId,
			measurementUnitsDistanceDefaultId,
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
			flightDataDate,
			flightDataLocation,
			flightDataTitle,
			flightMeasurementUnitsId,
			flightMeasurementUnitsAccelerationId,
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsAccelerationOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightMeasurementUnitsOptionsAcceleration,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave,
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
			resetInput,
			scope,
			validation
		}
	},
	validations () {
		return {
			flightDataDate: { $autoDirty: true },
			flightDataLocation: { $autoDirty: true },
			flightDataTitle: { $autoDirty: true },
			flightInfoInput: { required, $autoDirty: true },
			flightInfoDataTypeActual: { requiredIfFiltered: requiredUnless(this.flightInfoDataTypeFiltered), $autoDirty: true },
			flightInfoDataTypeFiltered: { requiredIfActual: requiredUnless(this.flightInfoDataTypeActual), $autoDirty: true },
			flightInfoDataTypeUse: { required, $autoDirty: true },
			flightMeasurementUnitsId: { required, $autoDirty: true },
			flightMeasurementUnitsAccelerationId: { required, $autoDirty: true },
			flightMeasurementUnitsDistanceId: { required, $autoDirty: true },
			flightMeasurementUnitsVelocityId: { required, $autoDirty: true },
			flightMeasurementUnitsOutputId: { required, $autoDirty: true },
			flightMeasurementUnitsAccelerationOutputId: { required, $autoDirty: true },
			flightMeasurementUnitsDistanceOutputId: { required, $autoDirty: true },
			flightMeasurementUnitsVelocityOutputId: { required, $autoDirty: true },
			flightProcessor: { required, $autoDirty: true },
		};
	}
};
</script>
