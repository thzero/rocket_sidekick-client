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
			v-model="contentTitle"
		/>
		<!-- <ContentDescription id="strings.content.tools.flightPath" /> -->
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
import VCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form//VCheckboxWithValidation';
import VColorWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VColorWithValidation';
import VDateTimeField from '@thzero/library_client_vue3_vuetify3/components/form/VDateTimeFieldTemp';
import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSelectWithValidation';
import VSwitchWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VSwitchWithValidation';
import VTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextAreaWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

export default {
	name: 'FlightPath',
	components: {
		ContentAttribution,
		ContentDescription,
		ContentHeader,
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
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			dateFormat,
			dateFormatMask,
			calculateI,
			formatNumber,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
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
			resetInput,
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
			serviceStore,
			sortByOrder,
			target,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			dateFormat,
			dateFormatMask,
			calculateI,
			formatNumber,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
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
