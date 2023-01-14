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
												ref="flightMeasurementsIdRef"
												v-model="flightMeasurementUnitsId"
												vid="flightMeasurementUnitsId"
												:items="flightMeasurementUnitsOptions"
												:readonly="!flightProcessor"
												:validation="validation"
												:label="$t('forms.content.tools.flightInfo.measurementUnits')"
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
import { nextTick, onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required, requiredUnless } from '@vuelidate/validators';

import Papa from 'papaparse';
import html2canvas from 'html2canvas';

import Constants from '@/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import flightInfoData from '@/components/content/tools/flightInfo/FlightInfoData';
import flightInfoChart from '@/components/content/tools/flightInfo/charts/FlightInfo';

import { useFlightToolsBaseComponent } from '@/components/content/tools/flightToolBase';

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
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave
		} = useFlightToolsBaseComponent(props, context, {
			onMounted: async (correlationIdI) => {
				reset(correlationIdI);

				flightProcessor.value = serviceStore.getters.getFlightInfoProcessor();

				flightInfoStyleReset(correlationIdI, false);

				flightDataLoad(correlationIdI);
				flightMeasurementUnitsLoad(correlationIdI, flightProcessor.value);

				flightInfoDataTypeUse.value = serviceStore.getters.getFlightInfoDataTypeUse();

				flightProcessors.value = VuetifyUtility.selectOptions(serviceFlightInfo.serviceProcessors, GlobalUtility.$trans.t, 'forms.content.tools.flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });

				resolution.value = serviceStore.getters.getFlightInfoResolution(correlationIdI) ?? Constants.FlightInfo.Resolution;
			}
		});

		const serviceDownload = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		const serviceFlightInfo = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR);

		const buttons = ref({
			export: {
				disabled: true
			},
			process: {
				disabled: true
			}
		});
		const downloadProgress = ref(false);
		const expanded = ref(false);
		const flightInfo = ref(null);
		const flightInfoChartData = ref(null);
		const flightInfoDataTypeActual = ref(true);
		const flightInfoDataTypeError = ref(false);
		const flightInfoDataTypeFiltered = ref(true);
		const flightInfoDataTypeUse = ref(true);
		const flightInfoDataTypeUseDisabled = ref(false);
		const flightInfoInput = ref(null);
		const flightInfoStyleAltitudeColor = ref(null);
		const flightInfoStyleAltitudeFColor = ref(null);
		const flightInfoStyleEventApogeeColor = ref(null);
		const flightInfoStyleEventApogeeBorderColor = ref(null);
		const flightInfoStyleEventDrogueColor = ref(null);
		const flightInfoStyleEventDrogueBorderColor = ref(null);
		const flightInfoStyleEventMainColor = ref(null);
		const flightInfoStyleEventMainBorderColor = ref(null);
		const flightInfoStyleVelocityColor = ref(null);
		const flightInfoStyleVelocityFColor = ref(null);
		const resolution = ref(Constants.FlightInfo.Resolution);
		
		const checkFlightInfoDataTypeUse = () => {
			flightInfoDataTypeUseDisabled.value = true;
			if (flightInfoDataTypeActual.value  && flightInfoDataTypeFiltered.value )
				flightInfoDataTypeUseDisabled.value = false;
			else if (flightInfoDataTypeActual.value )
				flightInfoDataTypeUse.value = false;
			else if (flightInfoDataTypeFiltered.value )
				flightInfoDataTypeUse.value = true;
		};
		const clickResolution = (resolution2) => {
			resolution.value = resolution2;

			const correlationIdI = correlationId();
			serviceStore.dispatcher.setFlightInfoResolution(correlationIdI, resolution2);

			if (!processing.value)
				flightInfoProcess(correlationIdI);
		};
		const clickStylesReset = () => {
			flightInfoStyleReset(correlationId(), false);
		};
		const flightInfoInputChange = () => {
			document.getElementById('top').scrollIntoView({behavior: 'smooth'});
		};
		const flightInfoStyleLoad = (correlationId) => {
			if (String.isNullOrEmpty(flightProcessor.value ))
				return;

			const style = serviceStore.getters.getFlightInfoStyle(flightProcessor.value);
			if (!style)
				return;

			flightInfoStyleAltitudeColor.value = style.altitude.color;
			flightInfoStyleAltitudeFColor .value = style.altitudeF.color;
			flightInfoStyleEventApogeeColor.value = style.event.apogee.color;
			flightInfoStyleEventApogeeBorderColor.value = style.event.apogeeBorder.color;
			flightInfoStyleEventDrogueColor .value = style.event.drogue.color;
			flightInfoStyleEventDrogueBorderColor.value = style.event.drogueBorder.color;
			flightInfoStyleEventMainColor.value = style.event.main.color;
			flightInfoStyleEventMainBorderColor.value = style.event.mainBorder.color;
			flightInfoStyleVelocityColor.value = style.velocity.color;
			flightInfoStyleVelocityFColor.value = style.velocityF.color;
		};
		const flightInfoStyleReset = (correlationId, notify) => {
			flightInfoStyleAltitudeColor.value = serviceFlightInfo.styleDefault.altitude.color;
			flightInfoStyleAltitudeFColor.value = serviceFlightInfo.styleDefault.altitudeF.color;
			flightInfoStyleEventApogeeColor.value = serviceFlightInfo.styleDefault.event.apogee.color;
			flightInfoStyleEventApogeeBorderColor.value = serviceFlightInfo.styleDefault.event.apogeeBorder.color;
			flightInfoStyleEventDrogueColor.value = serviceFlightInfo.styleDefault.event.drogue.color;
			flightInfoStyleEventDrogueBorderColor.value = serviceFlightInfo.styleDefault.event.drogueBorder.color;
			flightInfoStyleEventMainColor.value = serviceFlightInfo.styleDefault.event.main.color;
			flightInfoStyleEventMainBorderColor.value = serviceFlightInfo.styleDefault.event.mainBorder.color;
			flightInfoStyleVelocityColor.value = serviceFlightInfo.styleDefault.velocity.color;
			flightInfoStyleVelocityFColor.value = serviceFlightInfo.styleDefault.velocityF.color;

			if (notify)
				setNotify(correlationId, 'messages.reset');
		};
		const flightInfoStyleSave = (correlationIdI) => {
			// const correlationIdI = correlationId();
			if (String.isNullOrEmpty(flightProcessor.value))
				return;

			const style = {
				id: flightProcessor.value,
				altitude: {
					color: flightInfoStyleAltitudeColor.value
				},
				altitudeF: {
					color: flightInfoStyleAltitudeFColor.value
				},
				event: {
					apogee: {
						color: flightInfoStyleEventApogeeColor.value
					},
					apogeeBorder: {
						color: flightInfoStyleEventApogeeBorderColor.value
					},
					drogue: {
						color: flightInfoStyleEventDrogueColor.value
					},
					drogueBorder: {
						color: flightInfoStyleEventDrogueBorderColor.value
					},
					main: {
						color: flightInfoStyleEventMainColor.value
					},
					mainBorder: {
						color: flightInfoStyleEventMainBorderColor.value
					}
				},
				velocity: {
					color: flightInfoStyleVelocityColor.value
				},
				velocityF: {
					color: flightInfoStyleVelocityFColor.value
				}
			};

			serviceStore.dispatcher.setFlightInfoStyle(correlationIdI, style);
		};
		const flightInfoExport = (correlationId) => {
			try {
				const el = document.getElementById('flight-info');
				getScreenshotOfElement(correlationId, el, (data) => {
					const name = flightInfoExportName('png');
					downloadProgress.value = true;

					serviceDownload.downloadUrl(correlationIdI, 'data:image/png;base64,' + data,
						name,
						() => {
							AppUtility.debug2('download', 'completed');
							downloadProgress.value = false;
						},
						() => {
							AppUtility.debug2('download', 'cancelled');
							downloadProgress.value = false;
						},
						(arg) => {
							AppUtility.debug2('download', 'progress');
							AppUtility.debug2(arg);
						}
					);
				// eslint-disable-next-line
				});
			}
			catch (err) {
				downloadProgress.value = false;
				logger.exception('FlightInfo', 'flightInfoExport', err, correlationId);
			}
		};
		const flightInfoExportDownload = (correlationId, output, extension) => {
			try {
				const name = flightInfoExportName(correlationId, extension);
				downloadProgress.value = true;

				serviceDownload.download(correlationId, output,
					name,
					() => {
						AppUtility.debug2('download', 'completed');
						downloadProgress.value = false;
					},
					() => {
						AppUtility.debug2('download', 'cancelled');
						downloadProgress.value = false;
					},
					(arg) => {
						AppUtility.debug2('download', 'progress');
						AppUtility.debug2(arg);
					}
				);
			}
			catch (err) {
				downloadProgress.value = false;
				logger.exception('FlightInfo', 'flightInfoExportDownload', err, correlationId);
			}
		};
		const flightInfoExportImage = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputJson(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'json');
		};
		const flightInfoExportJson = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputJson(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'json');
		};
		const flightInfoExportName = (correlationId, extension) => {
			extension = !String.isNullOrEmpty(extension) ? extension : 'png';

			const currentDate = flightDataDate.value ? new Date(flightDataDate.value) : new Date();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();

			return 'flight-input-' + day + '-' + month + '-' + year + '.' + extension;
		};
		const flightInfoExportText = () => {
			const correlationIdI = correlationId();
			const output = serviceFlightInfo.processOutputText(correlationIdI, flightInfo.value);
			flightInfoExportDownload(correlationIdI, output, 'txt');
		};
		const flightInfoProcess = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			setNotify(correlationIdI, 'messages.processing');

			processing.value = true;

			setTimeout(() => {
				try {
					if (String.isNullOrEmpty(flightInfoInput.value)) {
						setError(GlobalUtility.$trans.t('errors.process.noInput'));
						processing.value = false;
						return;
					}

					const data = Papa.parse(flightInfoInput.value.trim());
					if (data.errors && data.errors.length > 0) {
						setError(GlobalUtility.$trans.t('errors.process.unableToConvert'));
						processing.value = false;
						return;
					}

					const flightInfoDataTypes = {
						actual: flightInfoDataTypeActual.value,
						filtered: flightInfoDataTypeFiltered.value,
						use: flightInfoDataTypeUse.value
					};

					const flightInfoResults = serviceFlightInfo.process(correlationIdI, data, flightProcessor.value, flightMeasurementUnitsId.value, flightInfoDataTypes);
					AppUtility.debug2('flightInfoResults', flightInfoResults);
					if (flightInfoResults.errors && data.errors.length > 0) {
						const errors = flightInfoResults.errors.map(e => GlobalUtility.$trans.t(e) + '<br/>');
						setError(errors);
						processing.value = false;
						return;
					}

					flightInfoResults.info.title = GlobalUtility.$trans.t('charts.flightInfo.title');
					if (!String.isNullOrEmpty(flightDataDate.value))
						flightInfoResults.info.date = flightDataDate.value;
					if (!String.isNullOrEmpty(flightMeasurementUnitsId.value))
						flightInfoResults.info.measurementUnits = flightMeasurementUnitsId.value;
					if (!String.isNullOrEmpty(flightDataLocation.value))
						flightInfoResults.info.location = flightDataLocation.value;
					if (!String.isNullOrEmpty(flightDataTitle.value && flightDataTitle.value))
						flightInfoResults.info.title = flightDataTitle.value;

					flightInfoChartData.value = flightInfoResults.info;
					flightInfo.value = flightInfoResults.info;

					flightInfoResults.info.style.altitude = flightInfoStyleAltitudeColor.value;
					flightInfoResults.info.style.altitudeF = flightInfoStyleAltitudeFColor.value;
					flightInfoResults.info.style.event.apogee = flightInfoStyleEventApogeeColor.value;
					flightInfoResults.info.style.event.apogeeBorder = flightInfoStyleEventApogeeBorderColor.value;
					flightInfoResults.info.style.event.drogue = flightInfoStyleEventDrogueColor.value;
					flightInfoResults.info.style.event.drogueBorder = flightInfoStyleEventDrogueBorderColor.value;
					flightInfoResults.info.style.event.main = flightInfoStyleEventMainColor.value;
					flightInfoResults.info.style.event.mainBorder = flightInfoStyleEventMainBorderColor.value;
					flightInfoResults.info.style.velocity = flightInfoStyleVelocityColor.value;
					flightInfoResults.info.style.velocityF = flightInfoStyleVelocityFColor.value;

					serviceStore.dispatcher.setFlightInfoDataTypeUse(correlationIdI, flightInfoDataTypeUse.value);

					serviceStore.dispatcher.setFlightInfoProcessor(correlationIdI, flightProcessor.value);

					flightInfoStyleSave(correlationIdI);
					flightDataSave(correlationIdI);
					flightMeasurementUnitsSave(correlationIdI, flightProcessor.value);

					setNotify(correlationIdI, 'messages.processed');

					buttons.value.export.disabled = false;
					processing.value = false;

					nextTick(() =>
						document.getElementById('top').scrollIntoView({behavior: 'smooth'})
					);
				}
				catch (err) {
					processing.value = false;
					logger.exception('FlightInfo', 'flightInfoProcess', err, correlationId);
				}
			}, 50);
		};
		const getScreenshotOfElement = (correlationId, element, callback, posX, posY, width, height) => {
			html2canvas(element).then(canvas => {
				// document.body.appendChild(canvas);
				posX = posX ?? 0;
				posY = posY ?? 0;
				width = width ?? canvas.width;
				height = height ?? canvas.height;
				const imageData = canvas.getContext('2d').getImageData(posX, posY, width, height).data;
				const outputCanvas = document.createElement('canvas');
				const outputContext = outputCanvas.getContext('2d');
				outputCanvas.width = width;
				outputCanvas.height = height;

				const idata = outputContext.createImageData(width, height);
				idata.data.set(imageData);
				outputContext.putImageData(idata, 0, 0);
				callback(outputCanvas.toDataURL().replace('data:image/png;base64,', ''));
			});
		};
		const reset = (correlationId) => {
			buttons.value.export.disabled = true;
			setErrorMessage(null);
			setErrorTimer(null);
			flightInfo.value = null;
			flightInfoChartData.value = null;
			processing.value = false;
		};
		const resetInput = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			flightDataReset(correlationIdI);
			flightMeasurementUnitsReset(correlationIdI);

			flightInfoDataTypeActual.value = true;
			flightInfoDataTypeFiltered.value = true;
			flightInfoDataTypeUse.value = true;
			flightInfoDataTypeUseDisabled.value = false;
			flightInfoInput.value = null;
			flightProcessor.value = null;
			buttons.value.process.disabled = true;

			setNotify(correlationIdI, 'messages.reset');
		};

		watch(() => flightInfoDataTypeActual.value,
			(value) => {
				checkFlightInfoDataTypeUse();
			}
		);
		watch(() => flightInfoDataTypeFiltered.value,
			(value) => {
				checkFlightInfoDataTypeUse();
			}
		);
		watch(() => flightProcessor.value,
			(value) => {
				if (!value)
					return;

				const correlationIdI = correlationId();
				flightInfoStyleLoad(correlationIdI, value);
				flightMeasurementUnitsLoad(correlationIdI, value);
			}
		);

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
			flightMeasurementUnitsDistanceId,
			flightMeasurementUnitsVelocityId,
			flightMeasurementUnitsOutputId,
			flightMeasurementUnitsDistanceOutputId,
			flightMeasurementUnitsVelocityOutputId,
			flightMeasurementUnitsOptions,
			flightProcessor,
			flightProcessors,
			processing,
			styles,
			initialized,
			flightMeasurementUnitsOptionsDistance,
			flightMeasurementUnitsOptionsVelocity,
			flightDataLoad,
			flightDataReset,
			flightDataSave,
			flightMeasurementUnitsLoad,
			flightMeasurementUnitsLoadOptions,
			flightMeasurementUnitsReset,
			flightMeasurementUnitsSave,
			serviceDownload,
			serviceFlightInfo,
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
			processing,
			resolution,
			styles,
			checkFlightInfoDataTypeUse,
			clickResolution,
			clickStylesReset,
			flightInfoInputChange,
			flightInfoStyleLoad,
			flightInfoStyleReset,
			flightInfoStyleSave,
			flightInfoExportDownload,
			flightInfoExportImage,
			flightInfoExportJson,
			flightInfoExportName,
			flightInfoExportText,
			flightInfoExport,
			flightInfoProcess,
			getScreenshotOfElement,
			reset,
			resetInput,
			scope: 'FlightInfo',
			validation: useVuelidate({ $scope: 'FlightInfo' })
		};
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
			flightProcessor: { required, $autoDirty: true },
		};
	}
};
</script>
