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
		<!-- <ContentDescription id="strings.content.tools.flightPath" /> -->
		<v-row dense>
			<v-col cols="12" lg="3">
				<VtFormControl
					ref="formFlightPathRef"
					:validation="validation"
					:reset-additional="resetAdditionalInput"
					button-clear-name="buttons.reset"
					button-ok-name="buttons.process"
					notify-message-saved=""
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
												v-model="flightDataTitle"
												vid="flightDataTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VTextFieldWithValidation
												ref="flightDataLocationRef"
												v-model="flightDataLocation"
												vid="flightDataLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.location')"
											/>
										</v-col>
										<v-col cols="12">
											<VtDateTimePickerFieldTemp
												ref="flightDataDateRef"
												v-model="flightDataDate"
												vid="flightDataDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VtSelectWithValidation
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
															<VtSelectWithValidation
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
															<VtSelectWithValidation
																ref="flightMeasurementUnitsDistanceIdRef"
																v-model="flightMeasurementUnitsDistanceId"
																vid="flightMeasurementUnitsDistanceId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
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
															<VtSelectWithValidation
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
															<VtSelectWithValidation
																ref="flightMeasurementUnitsDistanceOutputIdRef"
																v-model="flightMeasurementUnitsDistanceOutputId"
																vid="flightMeasurementUnitsDistanceOutputId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.altitude')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
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
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinLaunchColor"
														vid="flightPathStylePinLaunchColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.launch.color')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathGroundColor"
														vid="flightPathStylePathGroundColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.ground.color')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePathFlightColor"
														vid="flightPathStylePathFlightColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.flight.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinMaxAltitudeColor"
														vid="flightPathStylePinMaxAltitudeColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxAltitude.color')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinMaxVelocityColor"
														vid="flightPathStylePinMaxVelocityColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxVelocity.color')"
													/>
													<VtColorWithValidation
													 	class="mb-2"
														v-model="flightPathStylePinTouchdownColor"
														vid="flightPathStylePinTouchdownColor"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.touchdown.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtCheckboxWithValidation
														ref="flightPathStylePinMaxVelocitySelectedRef"
														v-model="flightPathStylePinLaunchSelected"
														vid="flightPathStylePinLaunchSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.launch.color')"
													/>
													<VtCheckboxWithValidation
														ref="flightPathStylePinMaxAltitudeSelectedRef"
														v-model="flightPathStylePinMaxAltitudeSelected"
														vid="flightPathStylePinMaxAltitudeSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxAltitude.color')"
													/>
												</v-col>
												<v-col cols="12" lg="6">
													<VtCheckboxWithValidation
														ref="flightPathStylePinMaxVelocitySelectedRef"
														v-model="flightPathStylePinMaxVelocitySelected"
														vid="flightPathStylePinMaxVelocitySelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.maxVelocity.color')"
													/>
													<VtCheckboxWithValidation
														ref="flightPathStylePinTouchdownSelectedRef"
														v-model="flightPathStylePinTouchdownSelected"
														vid="flightPathStylePinTouchdownSelected"
														:validation="validation"
														:label="$t('forms.content.tools.flightPath.style.touchdown.color')"
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
															@click="clickFlightPathStylesReset"
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
						<v-btn
							v-if="!buttons.export.disabled"
							:color="buttonsForms.color.default"
							class="ml-2"
							@click="flightPathExport"
						>
							{{ $t('buttons.export') }}
						</v-btn>
					</template>
					<template v-slot:after>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="flightPathInputRef"
								v-model="flightPathInput"
								vid="flightPathInput"
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
				</VtFormControl>
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
								v-model="templateMain"
								vid="templateMain"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.main')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinLaunchRef"
								v-model="templatePinLaunch"
								vid="templatePinLaunch"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.launch')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinTouchdownRef"
								v-model="templatePinTouchdown"
								vid="templatePinTouchdown"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.touchdown')"
							/>
						</div>
						<div class="pt-4">
							<VTextAreaWithValidation
								ref="templatePinsAdditionalRef"
								v-model="templatePinsAdditional"
								vid="templatePinsAdditional"
								:validation="validation"
								:label="$t('forms.content.tools.flightPath.templates.pins.additional')"
							/>
						</div>
					</v-col>
				</v-row>
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
import { required } from '@vuelidate/validators';

import { useFlightPathBaseComponent } from '@/components.app/content/tools/flightPath/flightPathBase';

import ContentAttribution from '@/components/content/Attribution';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import MeasurementUnitSelect2 from '@/components/content/MeasurementUnitSelect2';
import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtColorWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtColorWithValidation';
import VtDateTimePickerFieldTemp from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldTemp';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightPath',
	components: {
		ContentAttribution,
		ContentDescription,
		ContentHeader,
		MeasurementUnitSelect2,
		VtCheckboxWithValidation,
		VtColorWithValidation,
		VtDateTimePickerFieldTemp,
		VtFormControl,
		VtSelectWithValidation,
		VtSwitchWithValidation,
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
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
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
			buttonsDialog,
			buttonsForms,
			measurementUnitsDistanceType,
			measurementUnitsVelocityType,
			serviceDownload,
			serviceFlightPath,
			buttons,
			downloadProgress,
			expanded,
			flightPath,
			flightPathData,
			flightPathInput,
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
			output,
			clickFlightPathStylesReset,
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
			resetAdditionalInput,
			scope,
			validation
		} = useFlightPathBaseComponent(props, context);

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
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
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
			buttonsDialog,
			buttonsForms,
			measurementUnitsDistanceType,
			measurementUnitsVelocityType,
			serviceDownload,
			serviceFlightPath,
			buttons,
			downloadProgress,
			expanded,
			flightPath,
			flightPathData,
			flightPathInput,
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
			output,
			clickFlightPathStylesReset,
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
			resetAdditionalInput,
			scope,
			validation
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
