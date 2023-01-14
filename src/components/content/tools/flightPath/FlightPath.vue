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
				{{ $t('titles.content.tools.flightPath') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" lg="3">
				<VFormControl
					ref="formFlightPathRef"
					:validation="validation"
					:resetForm="resetInput"
					buttonClearName="buttons.reset"
					buttonOkName="buttons.process"
					notifyMessageSaved=""
					@ok="flightPathProcess"
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
												:label="$t('forms.content.tools.flightPath.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightDataLocationRef"
												vid="flightDataLocation"
												v-model="flightDataLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VDateTimeField
												ref="flightDataDateRef"
												vid="flightDataDate"
												v-model="flightDataDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VSelectWithValidation
												ref="flightProcessorRef"
												v-model="flightProcessor"
												vid="flightProcessor"
												:items="flightProcessors"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.processors.title')"
											/>
										</v-col>
										<v-col cols="12">
											<v-card
												variant="outlined"
											>
												<v-card-text>
													<v-row dense>
														<v-col cols="12">
															<VSelectWithValidation
																ref="flightMeasurementUnitsIdRef"
																v-model="flightMeasurementUnitsId"
																vid="flightMeasurementUnitsId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.gps')"
															/>
														</v-col>
													</v-row>
													<v-row dense>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsDistanceIdRef"
																v-model="flightMeasurementUnitsDistanceId"
																vid="flightMeasurementUnitsDistanceId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsVelocityIdRef"
																v-model="flightMeasurementUnitsVelocityId"
																vid="flightMeasurementUnitsVelocityId"
																:items="flightMeasurementUnitsOptionsVelocity"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.velocity')"
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
														<v-col cols="12">
															<VSelectWithValidation
																ref="flightMeasurementUnitsOutputIdRef"
																v-model="flightMeasurementUnitsOutputId"
																vid="flightMeasurementUnitsOutputId"
																:items="flightMeasurementUnitsOptions"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.output')"
															/>
														</v-col>
													</v-row>
													<v-row dense>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsDistanceOutputIdRef"
																v-model="flightMeasurementUnitsDistanceOutputId"
																vid="flightMeasurementUnitsDistanceOutputId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VSelectWithValidation
																ref="flightMeasurementUnitsVelocityOutputIdRef"
																v-model="flightMeasurementUnitsVelocityOutputId"
																vid="flightMeasurementUnitsVelocityOutputId"
																:items="flightMeasurementUnitsOptionsVelocity"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.velocity')"
															/>
														</v-col>
													</v-row>
												</v-card-text>
											</v-card>
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
										:title="$t('forms.content.tools.flightPath.style.title')"
										value="foo"
									>
										<v-expansion-panel-text>
											<v-row dense>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinLaunchColor"
														vid="flightPathStylePinLaunchColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.launch.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathGroundColor"
														vid="flightPathStylePathGroundColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.ground.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathFlightColor"
														vid="flightPathStylePathFlightColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.flight.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinMaxAltitudeColor"
														vid="flightPathStylePinMaxAltitudeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxAltitude.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinMaxVelocityColor"
														vid="flightPathStylePinMaxVelocityColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxVelocity.color')"
													/>
													<VColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinTouchdownColor"
														vid="flightPathStylePinTouchdownColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.touchdown.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VCheckboxWithValidation
														ref="flightPathStylePinMaxVelocitySelectedRef"
														vid="flightPathStylePinLaunchSelected"
														v-model="flightPathStylePinLaunchSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.launch.color')"
													/>
													<VCheckboxWithValidation
														ref="flightPathStylePinMaxAltitudeSelectedRef"
														vid="flightPathStylePinMaxAltitudeSelected"
														v-model="flightPathStylePinMaxAltitudeSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxAltitude.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VCheckboxWithValidation
														ref="flightPathStylePinMaxVelocitySelectedRef"
														vid="flightPathStylePinMaxVelocitySelected"
														v-model="flightPathStylePinMaxVelocitySelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxVelocity.color')"
													/>
													<VCheckboxWithValidation
														ref="flightPathStylePinTouchdownSelectedRef"
														vid="flightPathStylePinTouchdownSelected"
														v-model="flightPathStylePinTouchdownSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.touchdown.color')"
													/>
												</v-col>
											</v-row>
											<v-row dense>
												<v-col cols="12">
													<div style="float: right;">
														<v-btn
															class="ml-2"
															color="primary"
															@click="clickFlightPathStylesReset"
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
						<v-btn
							v-if="!buttons.export.disabled"
							class="ml-2"
							color="primary"
							v-bind="props"
							@click="flightPathExport"
						>
							{{ $t('buttons.export') }}
						</v-btn>
					</template>
					<template v-slot:after>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="flightPathInputRef"
								vid="flightPathInput"
								v-model="flightPathInput"
								:validation="validation"
								:blur="flightPathInputChange"
								:label="$t('forms.content.tools.flightPath.csv')"
							/>
						</div>
						<div class="pt-4" style="float: right">
							<v-btn
								density="compact"
								@click="flightPathInputChange"
							>
								{{ $t('buttons.top') }}
							</v-btn>
						</div>
					</template>
				</VFormControl>
			</v-col>
			<v-col cols="12" lg="9" class="pl-4">
				<v-row
					id="flight-path"
					dense
					style="color: black; background-color: white"
				>
					<v-col
						cols="12"
						ref="outputRef"
					>
						<pre>
{{ output }}
						</pre>
					</v-col>
				</v-row>
				<v-row 
					v-if="false"
					dense
				>
					<v-col cols="12">
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templateMainRef"
								vid="templateMain"
								v-model="templateMain"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.main')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinLaunchRef"
								vid="templatePinLaunch"
								v-model="templatePinLaunch"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.launch')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinTouchdownRef"
								vid="templatePinTouchdown"
								v-model="templatePinTouchdown"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.touchdown')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinsAdditionalRef"
								vid="templatePinsAdditional"
								v-model="templatePinsAdditional"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.additional')"
							/>
						</div>
					</v-col>
				</v-row>
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
import { required } from '@vuelidate/validators';

import Papa from 'papaparse';

import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import { useFlightToolsBaseComponent } from '@/components/content/tools/flightToolBase';

import VCheckboxWithValidation from '@/library_vue_vuetify/components/form//VCheckboxWithValidation';
import VColorWithValidation from '@/library_vue_vuetify/components/form/VColorWithValidation';
import VDateTimeField from '@/library_vue_vuetify/components/form/VDateTimeFieldTemp';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@/library_vue_vuetify/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@/library_vue_vuetify/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightPath',
	components: {
		VCheckboxWithValidation,
		VColorWithValidation,
		VDateTimeField,
		VFormControl,
		VSelectWithValidation,
		VSwitchWithValidation,
		VTextAreaWithValidation,
		VTextFieldWithValidation
	},
	setup(props, context) {
		const {correlationId,
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
			flightMeasurementUnitsOptionsAcceleration,
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

				flightProcessor.value = serviceStore.getters.getFlightPathProcessor();

				flightPathStyleReset(correlationIdI, true);
				flightDataLoad(correlationIdI);
				flightMeasurementUnitsLoad(correlationIdI, flightProcessor.value);

				flightProcessors.value = VuetifyUtility.selectOptions(serviceFlightPath.serviceProcessors, GlobalUtility.$trans.t, 'forms.content.tools.flightPath.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
			}
		});

		const serviceDownload = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		const serviceFlightPath = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR);

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
		const flightPath = ref(null);
		const flightPathData = ref(null);
		const flightPathInput = ref(null);
		const flightPathStylePathFlightColor = ref(null);
		const flightPathStylePathGroundColor = ref(null);
		const flightPathStylePinLaunchColor = ref(null);
		const flightPathStylePinLaunchSelected = ref(true);
		const flightPathStylePinMaxAltitudeColor = ref(null);
		const flightPathStylePinMaxAltitudeSelected = ref(true);
		const flightPathStylePinMaxVelocityColor = ref(null);
		const flightPathStylePinMaxVelocitySelected = ref(true);
		const flightPathStylePinTouchdownColor = ref(null);
		const flightPathStylePinTouchdownSelected = ref(true);
		const output = ref(null);
		const templateMain = ref(serviceFlightPath.defaultTemplateMain);
		const templatePinLaunch = ref(serviceFlightPath.defaultTemplatePinLaunch);
		const templatePinsAdditional = ref('');
		const templatePinTouchdown = ref(serviceFlightPath.defaultTemplatePinTouchdown);

		const clickFlightPathStylesReset = () => {
			flightPathStyleReset(correlationId(), false);
		};
		
		const flightPathInputChange = () => {
			document.getElementById('top').scrollIntoView({behavior: 'smooth'});
		};
		const flightPathStyleLoad = (coorrelationId) => {
			if (String.isNullOrEmpty(flightProcessor.value))
				return;

			const style = serviceStore.getters.getFlightPathStyle(flightProcessor.value);
			if (!style)
				return;

			flightPathStylePinLaunchSelected.value = style.pin.launch.selected;
			flightPathStylePinMaxAltitudeSelected.value = style.pin.maxAltitude.selected;
			flightPathStylePinMaxVelocitySelected.value = style.pin.maxVelocity.selected;
			flightPathStylePinTouchdownSelected.value = style.pin.touchdown.selected;

			flightPathStylePathFlightColor.value = style.path.flight.color;
			flightPathStylePathGroundColor.value = style.path.ground.color;
			flightPathStylePinLaunchColor.value = style.pin.launch.color;
			flightPathStylePinMaxAltitudeColor.value = style.pin.maxAltitude.color;
			flightPathStylePinMaxVelocityColor.value = style.pin.maxVelocity.color;
			flightPathStylePinTouchdownColor.value = style.pin.touchdown.color;
		};
		const flightPathStyleReset = (correlationId, notify) => {
			flightPathStylePinLaunchSelected.value = true;
			flightPathStylePinMaxAltitudeSelected.value = true;
			flightPathStylePinMaxVelocitySelected.value = true;
			flightPathStylePinTouchdownSelected.value = true;

			flightPathStylePathFlightColor.value = serviceFlightPath.styleDefault.path.flight.color;
			flightPathStylePathGroundColor.value = serviceFlightPath.styleDefault.path.ground.color;
			flightPathStylePinLaunchColor.value = serviceFlightPath.styleDefault.pin.launch.color;
			flightPathStylePinMaxAltitudeColor.value = serviceFlightPath.styleDefault.pin.maxAltitude.color;
			flightPathStylePinMaxVelocityColor.value = serviceFlightPath.styleDefault.pin.maxVelocity.color;
			flightPathStylePinTouchdownColor.value = serviceFlightPath.styleDefault.pin.touchdown.color;

			if (notify)
				setNotify(correlationId, 'messages.reset');
		};
		const flightPathStyleSave = (correlationIdI) => {
			// const correlationIdI = correlationId();
			if (String.isNullOrEmpty(flightProcessor.value))
				return;

			const style = {
				id: flightProcessor.value,
				path: {
					flight: {
						color: flightPathStylePathFlightColor.value
					},
					ground: {
						color: flightPathStylePathGroundColor.value
					}
				},
				pin: {
					launch: {
						color: flightPathStylePinLaunchColor.value,
						selected: flightPathStylePinLaunchSelected.value
					},
					maxAltitude: {
						color: flightPathStylePinMaxAltitudeColor.value,
						selected: flightPathStylePinMaxAltitudeSelected.value
					},
					maxVelocity: {
						color: flightPathStylePinMaxVelocityColor.value,
						selected: flightPathStylePinMaxVelocitySelected.value
					},
					touchdown: {
						color: flightPathStylePinTouchdownColor.value,
						selected: flightPathStylePinTouchdownSelected.value
					}
				}
			};

			serviceStore.dispatcher.setFlightPathStyle(correlationIdI, style);

			// setNotify(correlationIdI, 'messages.saved');
		};
		const flightPathExport = () => {
			try {
				const correlationIdI = correlationId();
				if (CommonUtility.isNull(flightPathData.value))
					return;

				downloadProgress.value = true;

				const currentDate = flightDataDate.value ? new Date(flightDataDate.value) : new Date();
				const day = currentDate.getDate();
				const month = currentDate.getMonth() + 1;
				const year = currentDate.getFullYear();

				const name = 'flight-path-' + day + '-' + month + '-' + year + '.kml';
				
				serviceDownload.download(correlationIdI, flightPathData.value,
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
				logger.exception('FlightPath', 'flightPathExport', err, correlationId);
			}
		};
		const flightPathProcess = () => {
			if (String.isNullOrEmpty(flightProcessor.value))
				return;

			const correlationIdI = correlationId();
			reset(correlationIdI);
			output.value = '';

			processing.value = true;

			try {
				if (String.isNullOrEmpty(flightPathInput.value)) {
					setError(correlationIdI, GlobalUtility.$trans.t('errors.process.noInput'));	
					processing.value = false;
					return;
				}

				const data = Papa.parse(flightPathInput.value.trim());
				if (data.errors && data.errors.length > 0) {
					setError(correlationIdI, GlobalUtility.$trans.t('errors.process.unableToConvert'));
					processing.value = false;
					return;
				}

				const flightPath = {
					date: flightDataDate.value,
					style: {
						path: {
							flight: {
								color: flightPathStylePathFlightColor.value ?? serviceFlightPath.value.styleDefault.path.flight.color
							},
							ground: {
								color: flightPathStylePathGroundColor.value ?? serviceFlightPath.value.styleDefault.path.ground.color
							}
						},
						pin: {
							launch: {
								color: flightPathStylePinLaunchColor.value ?? serviceFlightPath.value.styleDefault.pin.launch.color,
								selected: flightPathStylePinLaunchSelected.value ?? true
							},
							maxAltitude: {
								color: flightPathStylePinMaxAltitudeColor.value ?? serviceFlightPath.value.styleDefault.pin.maxAltitude.color,
								selected: flightPathStylePinMaxAltitudeSelected.value ?? true
							},
							maxVelocity: {
								color: flightPathStylePinMaxVelocityColor.value ?? serviceFlightPath.value.styleDefault.pin.maxVelocity.color,
								selected: flightPathStylePinMaxVelocitySelected.value ?? true
							},
							touchdown: {
								color: flightPathStylePinTouchdownColor.value ?? serviceFlightPath.value.styleDefault.pin.touchdown.color,
								selected: flightPathStylePinTouchdownSelected.value ?? true
							}
						}
					},
					location: flightDataLocation.value,
					title: flightDataTitle.value
				};

				const flightPathResponse = serviceFlightPath.process(correlationIdI, data, flightProcessor.value, 
					flightPath,
					{
						measurementUnitsId: flightMeasurementUnitsId.value,
						measurementUnitsDistanceId: flightMeasurementUnitsDistanceId.value,
						measurementUnitsVelocityId: flightMeasurementUnitsVelocityId.value,
						measurementUnitsOutputId: flightMeasurementUnitsOutputId.value,
						measurementUnitsDistanceOutputId: flightMeasurementUnitsDistanceOutputId.value,
						measurementUnitsVelocityOutputId: flightMeasurementUnitsVelocityOutputId.value,
					},
					templateMain.value, templatePinLaunch.value, templatePinTouchdown.value, templatePinsAdditional.value);
				if (hasFailed(flightPathResponse))
					return; // TODO: error...

				flightPathData.value = flightPathResponse.results.flightPath;
				// this.output = JSON.stringify(flightPathResponse.results, null, 2);
				output.value = flightPathResponse.results.flightPath;

				serviceStore.dispatcher.setFlightPathProcessor(correlationIdI, flightProcessor.value);

				flightPathStyleSave(correlationIdI);
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
				logger.exception('FlightPath', 'flightPathProcess', err, correlationId);
			}
		};
		const reset = (correlationId) => {
			buttons.value.export.disabled = true;
			setErrorMessage(null);
			setErrorTimer(null);
			flightPath.value = null;
			flightPathData.value = null;
			processing.value = false;
		};
		const resetInput = () => {
			const correlationIdI = correlationId();
			reset(correlationIdI);
			flightDataReset(correlationIdI);
			flightMeasurementUnitsReset(correlationIdI);

			flightPathInput.value = null;
			flightDataTitle.value = null;
			buttons.value.process.disabled = true;

			setNotify(correlationIdI, 'messages.reset');
		}
		
		watch(() => flightProcessor.value,
			(value) => {
				if (!value)
					return;

				const correlationIdI = correlationId();
				flightPathStyleLoad(correlationIdI, value);
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
			serviceDownload,
			serviceFlightPath,
			buttons,
			downloadProgress,
			expanded,
			flightPath,
			flightPathData,
			flightPathInput,
			clickFlightPathStylesReset,
			flightPathStylePathFlightColor,
			flightPathStylePathGroundColor,
			flightPathStylePinLaunchColor,
			flightPathStylePinLaunchSelected,
			flightPathStylePinMaxAltitudeColor,
			flightPathStylePinMaxAltitudeSelected,
			flightPathStylePinMaxVelocityColor,
			flightPathStylePinMaxVelocitySelected,
			flightPathStylePinTouchdownColor,
			flightPathStylePinTouchdownSelected,
			// initialized,
			output,
			processing,
			styles,
			flightPathInputChange,
			flightPathStyleLoad,
			templateMain,
			templatePinLaunch,
			templatePinsAdditional,
			templatePinTouchdown,
			flightPathStyleReset,
			flightPathStyleSave,
			flightPathExport,
			flightPathProcess,
			reset,
			resetInput,
			scope: 'FlightPath',
			validation: useVuelidate({ $scope: 'FlightPath' })
		}
	},
	validations () {
		return {
			flightDataDate: { $autoDirty: true },
			flightDataLocation: { $autoDirty: true },
			flightDataTitle: { $autoDirty: true },
			flightPathInput: { required, $autoDirty: true },
			flightMeasurementUnitsId: { required, $autoDirty: true },
			flightMeasurementUnitsDistanceId: { required, $autoDirty: true },
			flightMeasurementUnitsVelocityId: { required, $autoDirty: true },
			flightMeasurementUnitsOutputId: { required, $autoDirty: true },
			flightMeasurementUnitsDistanceOutputId: { required, $autoDirty: true },
			flightMeasurementUnitsVelocityOutputId: { required, $autoDirty: true },
			flightProcessor: { required, $autoDirty: true },
			flightPathStylePinLaunchColor: { required, $autoDirty: true },
			flightPathStylePinLaunchSelected: { required, $autoDirty: true },
			flightPathStylePinMaxAltitudeColor: { required, $autoDirty: true },
			flightPathStylePinMaxAltitudeSelected: { required, $autoDirty: true },
			flightPathStylePinMaxVelocityColor: { required, $autoDirty: true },
			flightPathStylePinMaxVelocitySelected: { required, $autoDirty: true },
			flightPathStylePinTouchdownColor: { required, $autoDirty: true },
			flightPathStylePinTouchdownSelected: { required, $autoDirty: true }
		};
	}
};
</script>
