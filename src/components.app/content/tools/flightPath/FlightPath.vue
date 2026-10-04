<template>
	<ToolsLayout>
		<ContentHeader
			:value="contentTitle"
		/>
		<!-- <ContentDescription id="strings.content.tools.flightPath" /> -->
		<v-row density="compact">
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
							<div class="pb-4"
								v-if="errors"
							>
								<v-banner
									bg-color="error"
									rounded
								>
									<v-banner-text>
										<span v-html="errorMessage"></span>
									</v-banner-text>
								</v-banner>
							</div>
							<div class="pb-4"
								v-if="notifySignal"
							>
								<v-banner
									:bg-color="notifyColor"
									rounded
								>
									<v-banner-text>
										<span v-html="notifyMessage"></span>
									</v-banner-text>
								</v-banner>
							</div>
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact">
								<v-card-item>
									<v-row density="compact">
										<v-col cols="12">
											<VtTextFieldWithValidation
												ref="flightDataTitleRef"
												v-model="flightDataTitle"
												vid="flightDataTitle"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.title')"
											/>
										</v-col>
										<v-col cols="12">
											<VtDateTimePickerField
												ref="flightDataDateRef"
												v-model="flightDataDate"
												vid="flightDataDate"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.date')"
											/>
										</v-col>
										<v-col cols="12">
											<VtTextFieldWithValidation
												ref="flightDataLocationRef"
												v-model="flightDataLocation"
												vid="flightDataLocation"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.location')"
											/>
										</v-col>
										<v-col cols="6">
											<VtSelectWithValidation
												ref="flightProcessorRef"
												v-model="flightProcessor"
												vid="flightProcessor"
												:items="flightProcessors"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.processors.title')"
											/>
										</v-col>
										<v-col cols="6">
											<VtNumberFieldWithValidation
												ref="flightPathFilterSpeedRef"
												v-model="flightPathFilterSpeed"
												vid="flightPathFilterSpeed"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.filter.speed')"
											/>
										</v-col>
										<v-col cols="12">
											<v-card
												variant="outlined"
											>
												<v-card-text>
													<v-row density="compact">
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
													<v-row density="compact">
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAltitudeIdRef"
																v-model="flightMeasurementUnitsAltitudeId"
																vid="flightMeasurementUnitsAltitudeId"
																:items="flightMeasurementUnitsOptionsAltitude"
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
													<v-row density="compact">
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
													<v-row density="compact">
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAltitudeOutputIdRef"
																v-model="flightMeasurementUnitsAltitudeOutputId"
																vid="flightMeasurementUnitsAltitudeOutputId"
																:items="flightMeasurementUnitsOptionsAltitude"
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
													<v-row density="compact">
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsDistanceOutputIdRef"
																v-model="flightMeasurementUnitsDistanceOutputId"
																vid="flightMeasurementUnitsDistanceOutputId"
																:items="flightMeasurementUnitsOptionsDistance"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.distance')"
															/>
														</v-col>
														<v-col cols="6">
															<VtSelectWithValidation
																ref="flightMeasurementUnitsAccelerationOutputIdRef"
																v-model="flightMeasurementUnitsAccelerationOutputId"
																vid="flightMeasurementUnitsAccelerationOutputId"
																:items="flightMeasurementUnitsOptionsAcceleration"
																:validation="validation"
																:label="$t('forms.content.tools.flightPath.measurementUnits.acceleration')"
															/>
														</v-col>
													</v-row>
												</v-card-text>
											</v-card>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Output format -->
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact"
								:title="$t('forms.content.tools.flightPath.export.format.title')"
							>
								<v-card-item>
									<v-row density="compact">
										<v-col cols="12">
											<VtSelectWithValidation
												ref="exportTemplateIdRef"
												v-model="exportTemplateId"
												vid="exportTemplateId"
												:items="exportTemplates"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.format.template')"
											/>
										</v-col>
										<v-col cols="12">
											<div class="text-caption pb-1">{{ $t('forms.content.tools.flightPath.export.format.templateDrop') }}</div>
											<DropFile
												accept=".hbs,.handlebars,.mustache"
												input-id="templateInput"
												@selected="dropTemplate"
											/>
										</v-col>
										<v-col cols="12"
											v-if="exportUserTemplateItems.length > 0"
										>
											<div class="text-caption pb-1">{{ $t('forms.content.tools.flightPath.export.format.userTemplates') }}</div>
											<v-chip
												v-for="item in exportUserTemplateItems"
												:key="item.id"
												class="mr-1 mb-1"
												closable
												@click:close="exportTemplateDelete(item.id)"
											>
												{{ item.id }}
											</v-chip>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Mission -->
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact"
								:title="$t('forms.content.tools.flightPath.export.mission.title')"
							>
								<v-card-item>
									<v-row density="compact">
										<v-col cols="12">
											<VtTextFieldWithValidation
												ref="exportMissionNameRef"
												v-model="exportMissionName"
												vid="exportMissionName"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.mission.name')"
											/>
										</v-col>
										<v-col cols="12">
											<VtCheckboxWithValidation
												v-model="exportLabelWaypointsWithMission"
												vid="exportLabelWaypointsWithMission"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.mission.onWaypoints')"
											/>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Placements -->
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact"
								:title="$t('forms.content.tools.flightPath.export.placements.title')"
							>
								<v-card-item>
									<v-row density="compact">
										<v-col cols="12">
											<v-btn-toggle
												v-model="exportPreset"
												color="primary"
												density="compact"
												divided
												variant="outlined"
											>
												<v-btn
													v-for="preset in exportPresets"
													:key="preset.id"
													:value="preset.id"
													size="small"
													@click="exportPresetApply(preset.id)"
												>
													{{ preset.name }}
												</v-btn>
											</v-btn-toggle>
										</v-col>
										<v-col cols="6">
											<VtSelectWithValidation
												ref="exportAltitudeReferenceRef"
												v-model="exportAltitudeReference"
												vid="exportAltitudeReference"
												:items="exportAltitudeReferences"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.placements.altitudeReference')"
											/>
										</v-col>
										<v-col cols="6">
											<VtSelectWithValidation
												ref="exportWaypointAltitudeReferenceRef"
												v-model="exportWaypointAltitudeReference"
												vid="exportWaypointAltitudeReference"
												:items="exportAltitudeReferences"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.placements.waypointAltitudeReference')"
											/>
										</v-col>
										<v-col cols="12">
											<VtCheckboxWithValidation
												v-model="exportDrawShadow"
												vid="exportDrawShadow"
												:validation="validation"
												:disabled="!exportShadowEnabled"
												:label="$t('forms.content.tools.flightPath.export.placements.shadow')"
											/>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Waypoints -->
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact"
								:title="$t('forms.content.tools.flightPath.waypoints.title')"
							>
								<v-card-item>
									<v-row density="compact">
										<v-col
											v-for="type in exportWaypointTypes"
											:key="type.id"
											cols="6"
										>
											<v-checkbox
												v-model="exportWaypoints[type.id]"
												:label="type.name"
												density="compact"
												hide-details
											/>
										</v-col>
										<v-col cols="12">
											<v-divider class="my-2" />
										</v-col>
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportShowWaypointLabels"
												vid="exportShowWaypointLabels"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.waypoints.showLabels')"
											/>
										</v-col>
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportIncludeDescriptions"
												vid="exportIncludeDescriptions"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.waypoints.descriptions')"
											/>
										</v-col>
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportColorWaypointPins"
												vid="exportColorWaypointPins"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.waypoints.colorPins')"
											/>
										</v-col>
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportColorWaypointPinsByFlight"
												vid="exportColorWaypointPinsByFlight"
												:validation="validation"
												:disabled="!exportColorWaypointPins"
												:label="$t('forms.content.tools.flightPath.export.waypoints.colorPinsByFlight')"
											/>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Flight path -->
							<v-card
								class="mb-4"
								flat
								bordered
								density="compact"
								:title="$t('forms.content.tools.flightPath.export.path.title')"
							>
								<v-card-item>
									<v-row density="compact">
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportIncludeFlightPath"
												vid="exportIncludeFlightPath"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.path.flightPath')"
											/>
										</v-col>
										<v-col cols="6">
											<VtCheckboxWithValidation
												v-model="exportIncludeGroundTrack"
												vid="exportIncludeGroundTrack"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.path.groundTrack')"
											/>
										</v-col>
										<v-col cols="6">
											<VtNumberFieldWithValidation
												ref="exportPathStrideRef"
												v-model="exportPathStride"
												vid="exportPathStride"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.path.stride')"
											/>
										</v-col>
										<v-col cols="6">
											<VtNumberFieldWithValidation
												ref="exportLaunchAltitudeRef"
												v-model="exportLaunchAltitude"
												vid="exportLaunchAltitude"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.path.launchAltitude')"
											/>
										</v-col>
										<v-col cols="12">
											<VtCheckboxWithValidation
												v-model="exportOneFilePerFlight"
												vid="exportOneFilePerFlight"
												:validation="validation"
												:label="$t('forms.content.tools.flightPath.export.path.oneFilePerFlight')"
											/>
										</v-col>
									</v-row>
								</v-card-item>
							</v-card>
							<!-- Colors -->
							<v-card
								flat
								bordered
								density="compact">
								<v-expansion-panels
									v-model="styles"
								>
									<v-expansion-panel
										:title="$t('forms.content.tools.flightPath.export.colors.title')"
										value="colors"
									>
										<v-expansion-panel-text>
											<div class="text-subtitle-2 pb-2">{{ $t('forms.content.tools.flightPath.export.colors.pins') }}</div>
											<v-row density="compact">
												<v-col
													v-for="type in exportWaypointTypes"
													:key="type.id"
													cols="12" lg="6"
												>
													<VtColorWithValidation
														class="mb-2"
														v-model="exportPinColors[type.id]"
														:vid="'exportPinColor_' + type.id"
														:validation="validation"
														:label="type.name"
													/>
												</v-col>
											</v-row>
											<div
												v-if="flightPathBranches.length > 0"
											>
												<div class="text-subtitle-2 py-2">{{ $t('forms.content.tools.flightPath.export.colors.flights') }}</div>
												<v-row
													v-for="branch in flightPathBranches"
													:key="branch.index"
													density="compact"
												>
													<v-col cols="12">
														<div class="text-caption">{{ branch.name }}</div>
													</v-col>
													<v-col cols="4">
														<VtColorWithValidation
															class="mb-2"
															v-model="exportBranchPathColors[branch.index]"
															:vid="'exportBranchPathColor_' + branch.index"
															:validation="validation"
															:label="$t('forms.content.tools.flightPath.export.colors.path')"
														/>
													</v-col>
													<v-col cols="4">
														<VtColorWithValidation
															class="mb-2"
															v-model="exportBranchGroundColors[branch.index]"
															:vid="'exportBranchGroundColor_' + branch.index"
															:validation="validation"
															:label="$t('forms.content.tools.flightPath.export.colors.ground')"
														/>
													</v-col>
													<v-col cols="4">
														<VtColorWithValidation
															class="mb-2"
															v-model="exportBranchPinColors[branch.index]"
															:vid="'exportBranchPinColor_' + branch.index"
															:validation="validation"
															:label="$t('forms.content.tools.flightPath.export.colors.pin')"
														/>
													</v-col>
												</v-row>
												<div class="text-caption pb-2">{{ $t('forms.content.tools.flightPath.export.colors.reprocess') }}</div>
											</div>
											<v-row density="compact">
												<v-col cols="12">
													<div style="float: right;">
														<v-btn
															:variant="buttonsForms.variant.clear"
															:color="buttonsForms.color.clear"
															class="ml-2"
															@click="clickExportOptionsReset"
														>
															{{ $t('buttons.reset') }}
														</v-btn>
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
							<v-row density="compact">
								<v-col cols="12" md="8" lg="12">
									<VtTextAreaWithValidation
										ref="flightPathInputRef"
										v-model="flightPathInput"
										vid="flightPathInput"
										:validation="validation"
										:blur="flightPathInputChange"
										:label="$t('forms.content.tools.flightPath.csv')"
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
					density="compact"
				>
					<v-col
						cols="12"
					>
						<v-expansion-panels
      						v-model="panelInstructions"
							class="mb-2"
						>
							<v-expansion-panel
								value="instructions"
							>
								<v-expansion-panel-title
									color="secondary"
								>
									{{ $t(`forms.content.tools.instructions.title`) }}
								</v-expansion-panel-title>
								<v-expansion-panel-text>
									<VtMarkdown v-model="flightInstructions" :use-github=false />
									<VtMarkdown v-model="flightPathInstructions" :use-github=false />
									<VtMarkdown v-model="templateInstructions" :use-github=false />
								</v-expansion-panel-text>
							</v-expansion-panel>
						</v-expansion-panels>
					</v-col>
				</v-row>
				<v-row
					id="flight-path"
					density="compact"
					style="color: black; background-color: white"
				>
					<v-col
						cols="12"
						ref="outputRef"
					>
						<pre>
{{ flightPathOutput ? flightPathOutput.join('\n') : '' }}
						</pre>
					</v-col>
				</v-row>
				<v-row
					density="compact"
					style="color: black; background-color: lightgray"
					class="mt-8"
				>
					<v-col
						cols="12"
					>
						<pre>
{{ flightPathData ? JSON.stringify(flightPathData, null, 4) : '' }}
						</pre>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row density="compact"
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
	<v-snackbar
		v-model="notifySignal"
		:color="notifyColor"
		:timeout="notifyTimeout"
	>
		{{ notifyMessage }}
	</v-snackbar>
</template>

<script>
import { ref } from 'vue';

import { useFlightPathBaseComponent } from '@/components.app/content/tools/flightPath/flightPathBase';
import { useFlightPathValidation } from '@/components.app/content/tools/flightPath/flightPathValidation';

import templateInstructionsMarkdown from '@/components.app/content/tools/flightPath/templateInstructions.md?raw';

import ContentAttribution from '@/components/content/Attribution';
import ContentDescription from '@/components/content/Description';
import ContentHeader from '@/components/content/Header';
import DropFile from '@/components.app/content/tools/dropFile';
import ToolsLayout from '@/components/content/tools/Layout.vue';
import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtColorWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtColorWithValidation';
import VtDateTimePickerField from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldTemp';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'FlightPath',
	components: {
		ContentAttribution,
		ContentDescription,
		ContentHeader,
		DropFile,
		ToolsLayout,
		VtCheckboxWithValidation,
		VtColorWithValidation,
		VtDateTimePickerField,
		VtFormControl,
		VtMarkdown,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	setup(props, context) {
		const base = useFlightPathBaseComponent(props, context);
		const templateInstructions = ref(templateInstructionsMarkdown);

		return {
			...base,
			templateInstructions
		}
	},
	validations () {
		return useFlightPathValidation;
	}
};
</script>
