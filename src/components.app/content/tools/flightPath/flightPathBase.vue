<script>
import { computed, nextTick, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import Papa from 'papaparse';

import AppConstants from '@/constants';
import AppCommonConstants from 'rocket_sidekick_common/constants';

import ConvertUtility from 'rocket_sidekick_common/utility/convert.js';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { isoDate, slug } from '@/service.app/tools/flightPath/model/geo';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useFlightToolsBaseComponent } from '@/components.app/content/tools/flightToolBase';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useFlightPathBaseComponent(props, context) {
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
		flightMeasurementUnitsSave
	} = useFlightToolsBaseComponent(props, context, {
		markupId: 'tools.flightPath',
		onMounted: async (correlationIdI) => {
			reset(correlationIdI);

			flightProcessor.value = serviceStore.getters.getFlightPathProcessor();

			exportTemplatesLoad(correlationIdI);
			exportOptionsLoad(correlationIdI);
			flightDataLoad(correlationIdI);

			flightProcessors.value = LibraryClientVueUtility.selectOptions(serviceFlightPath.serviceProcessors, LibraryClientUtility.$trans.t, 'forms.content.tools.flightPath.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.flightPath')
	});

	const {
		buttonsDialog,
		buttonsForms
	} = useButtonComponent(props, context);

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

	const {
		measurementUnitsAltitudeType,
		measurementUnitsVelocityType
	} = useToolsMeasurementUtilityComponent(props, context);

	const serviceDownload = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_DOWNLOAD);
	const serviceFlightPath = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_PATH_PROCESSOR);

	const trans = (key) => LibraryClientUtility.$trans.t(`forms.content.tools.flightPath.${key}`);

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
	const flightPathData = ref(null);
	const flightPathDataExport = ref(null);
	const flightPathFilterSpeed = ref(300);
	const flightPathInput = ref(null);
	const flightPathOutput = ref(null);
	const panelInstructions = ref(['instructions']);

	// Export options. The fresh state must match the "flightPath" preset.
	const exportAltitudeReference = ref('automatic');
	const exportBranchGroundColors = ref({});
	const exportBranchPathColors = ref({});
	const exportBranchPinColors = ref({});
	const exportColorWaypointPins = ref(true);
	const exportColorWaypointPinsByFlight = ref(false);
	const exportDrawShadow = ref(false);
	const exportIncludeDescriptions = ref(true);
	const exportIncludeFlightPath = ref(true);
	const exportIncludeGroundTrack = ref(true);
	const exportLabelWaypointsWithMission = ref(false);
	const exportLaunchAltitude = ref(null);
	// The stored value in meters, so it can be shown once the input units are known.
	const exportLaunchAltitudeMeters = ref(null);
	const exportMissionName = ref('');
	const exportOneFilePerFlight = ref(false);
	const exportPathStride = ref(1);
	const exportPinColors = ref({ ...serviceFlightPath.pinColorsDefault });
	const exportPreset = ref('flightPath');
	const exportShowWaypointLabels = ref(true);
	const exportTemplateId = ref('kml');
	const exportTemplates = ref([]);
	const exportUserTemplates = ref([]);
	const exportWaypointAltitudeReference = ref('automatic');
	const exportWaypoints = ref(Object.fromEntries(serviceFlightPath.waypointTypes.map(type => [type, true])));

	const exportAltitudeReferences = computed(() => {
		return serviceFlightPath.altitudeReferences.map(id => ({ id: id, name: trans(`export.placements.altitudeReferences.${id}`) }));
	});
	const exportPresets = computed(() => {
		return serviceFlightPath.presets.map(preset => ({ id: preset.id, name: trans(`export.placements.presets.${preset.id}`) }));
	});
	// Nothing to extrude to once both halves of the geometry lie on the ground.
	const exportShadowEnabled = computed(() => {
		return exportAltitudeReference.value !== 'clamped' || exportWaypointAltitudeReference.value !== 'clamped';
	});
	const exportWaypointTypes = computed(() => {
		return serviceFlightPath.waypointTypes.map(type => ({ id: type, name: trans(`waypoints.${type}`) }));
	});
	const exportUserTemplateItems = computed(() => {
		return (exportUserTemplates.value ?? []).map(l => ({ id: l.id }));
	});
	const flightPathBranches = computed(() => {
		return flightPathData.value ? flightPathData.value : [];
	});

	const flightPathInstructions = computed(() => {
		if (!content.value || !content.value.processors)
			return '';

		if (String.isNullOrEmpty(flightProcessor.value))
			return '';

		const processor = content.value.processors.find(l => l.id === flightProcessor.value);
		if (!processor)
			return null;

		return processor.markup;
	});

	const inputAltitudeUnit = () => {
		const system = AppCommonConstants.MeasurementUnits[flightMeasurementUnitsId.value];
		if (!system)
			return null;
		return system.altitude[flightMeasurementUnitsAltitudeId.value] ?? system.altitude[system.altitude.default];
	};

	const checkDataForProcessor = (correlationId, data) => {
		const response = serviceFlightPath.check(correlationId, data, flightProcessor.value);
		if (hasFailed(response)) {
			resetAdditionalInput2(correlationId);
			setErrorMessage(correlationId, errorsFromResponse(response));
			return response;
		}

		setErrorMessage(correlationId, null);
		return success(correlationId);
	};
	const errorsFromResponse = (response) => {
		const errorsI = [];
		for (const item of (response.errors ?? [])) {
			const code = item && item.code ? item.code : null;
			const key = `errors.content.tools.flightPath.${code}`;
			const text = code ? LibraryClientUtility.$trans.t(key) : null;
			errorsI.push(text && text !== key ? text : (item && item.message ? item.message : LibraryClientUtility.$trans.t('errors.process.unableToConvert')));
		}
		if (errorsI.length === 0)
			errorsI.push(LibraryClientUtility.$trans.t('errors.process.unableToConvert'));
		return errorsI.join('<br>');
	};
	const clickExportOptionsReset = () => {
		const correlationIdI = correlationId();
		exportOptionsApply(correlationIdI, serviceFlightPath.options(correlationIdI));
		exportTemplateId.value = 'kml';
		setNotify(correlationIdI, 'messages.reset');
	};
	const dropOutput = (value) => {
		const correlationIdI = correlationId();

		flightPathInput.value = null;
		flightPathData.value = null;
		flightPathDataExport.value = null;
		flightPathOutput.value = '';
		setErrorMessage(correlationIdI, null);

		if (value) {
			const data = Papa.parse(value.trim());
			const response = checkDataForProcessor(correlationIdI, data);
			if (hasFailed(response))
				return response;

			flightPathInput.value = value.trim();
			return success(correlationIdI);
		}
	};
	const dropTemplate = (value, fileName) => {
		const correlationIdI = correlationId();
		const response = serviceFlightPath.userTemplate(correlationIdI, fileName, value);
		if (hasFailed(response)) {
			setErrorMessage(correlationIdI, errorsFromResponse(response));
			return;
		}

		serviceStore.dispatcher.setFlightPathTemplate(correlationIdI, { id: response.results.id, source: response.results.source });
		exportTemplatesLoad(correlationIdI);
		exportTemplateId.value = response.results.id;
		setErrorMessage(correlationIdI, null);
		setNotify(correlationIdI, 'messages.saved');
	};
	const exportOptionsApply = (correlationId, options) => {
		const values = options.toObject();
		exportAltitudeReference.value = values.altitudeReference;
		exportBranchGroundColors.value = { ...values.branchGroundColors };
		exportBranchPathColors.value = { ...values.branchColors };
		exportBranchPinColors.value = { ...values.branchPinColors };
		exportColorWaypointPins.value = values.colorWaypointPins;
		exportColorWaypointPinsByFlight.value = values.colorWaypointPinsByFlight;
		exportDrawShadow.value = values.drawShadow;
		exportIncludeDescriptions.value = values.includeDescriptions;
		exportIncludeFlightPath.value = values.includeFlightPath;
		exportIncludeGroundTrack.value = values.includeGroundTrack;
		exportLabelWaypointsWithMission.value = values.labelWaypointsWithMission;
		exportMissionName.value = values.missionName;
		exportOneFilePerFlight.value = values.oneFilePerFlight;
		exportPathStride.value = values.pathStride;
		exportPinColors.value = { ...serviceFlightPath.pinColorsDefault, ...values.pinColors };
		exportShowWaypointLabels.value = values.showWaypointLabels;
		exportWaypointAltitudeReference.value = values.waypointAltitudeReference;
		exportWaypoints.value = Object.fromEntries(serviceFlightPath.waypointTypes.map(type => [type, values.waypoints.includes(type)]));
		flightPathFilterSpeed.value = values.filterMaxSpeedMps;

		exportLaunchAltitudeMeters.value = values.launchAltitudeMeters;
		exportLaunchAltitudeDisplay();

		exportPresetSync();
	};
	// Shows the stored launch elevation in the input altitude unit, once that unit is known.
	const exportLaunchAltitudeDisplay = () => {
		const unit = inputAltitudeUnit();
		if (exportLaunchAltitudeMeters.value === null || !unit) {
			exportLaunchAltitude.value = null;
			return;
		}
		exportLaunchAltitude.value = ConvertUtility.round(ConvertUtility.convert(exportLaunchAltitudeMeters.value, 'm', unit), 2);
	};
	const exportOptionsBuild = (correlationId) => {
		const unit = inputAltitudeUnit();
		const launchAltitude = LibraryClientUtility.convertNumber(exportLaunchAltitude.value);
		return serviceFlightPath.options(correlationId, {
			altitudeReference: exportAltitudeReference.value,
			branchColors: exportBranchPathColors.value,
			branchGroundColors: exportBranchGroundColors.value,
			branchPinColors: exportBranchPinColors.value,
			colorWaypointPins: exportColorWaypointPins.value,
			colorWaypointPinsByFlight: exportColorWaypointPinsByFlight.value,
			// A ticked but disabled shadow exports false, so the file never disagrees with the panel.
			drawShadow: exportDrawShadow.value && exportShadowEnabled.value,
			filterMaxSpeedMps: LibraryClientUtility.convertNumber(flightPathFilterSpeed.value),
			includeDescriptions: exportIncludeDescriptions.value,
			includeFlightPath: exportIncludeFlightPath.value,
			includeGroundTrack: exportIncludeGroundTrack.value,
			labelWaypointsWithMission: exportLabelWaypointsWithMission.value,
			// Without a known input unit the field cannot be read, so the stored value stands.
			launchAltitudeMeters: unit ? (launchAltitude !== null ? ConvertUtility.convert(launchAltitude, unit, 'm') : null) : exportLaunchAltitudeMeters.value,
			missionName: exportMissionName.value,
			oneFilePerFlight: exportOneFilePerFlight.value,
			pathStride: exportPathStride.value,
			pinColors: exportPinColors.value,
			showWaypointLabels: exportShowWaypointLabels.value,
			waypointAltitudeReference: exportWaypointAltitudeReference.value,
			waypoints: Object.entries(exportWaypoints.value).filter(([, selected]) => selected).map(([type]) => type)
		});
	};
	const exportOptionsLoad = (correlationId) => {
		const stored = serviceStore.getters.getFlightPathExport();
		const options = serviceFlightPath.options(correlationId, stored && stored.options ? stored.options : null);
		exportOptionsApply(correlationId, options);
		if (stored && !String.isNullOrEmpty(stored.templateId) && exportTemplates.value.find(l => l.id === stored.templateId))
			exportTemplateId.value = stored.templateId;
	};
	// Remembers how the tool is set up, never what this particular flight was called.
	const exportOptionsSave = (correlationId) => {
		const options = exportOptionsBuild(correlationId);
		serviceStore.dispatcher.setFlightPathExport(correlationId, {
			templateId: exportTemplateId.value,
			options: options.toStored()
		});
	};
	const exportPresetApply = (id) => {
		const correlationIdI = correlationId();
		const options = exportOptionsBuild(correlationIdI);
		options.applyPreset(id);
		exportOptionsApply(correlationIdI, options);
	};
	// Highlights the preset whose every value matches the controls, or none.
	const exportPresetSync = () => {
		exportPreset.value = serviceFlightPath.presetMatching(correlationId(), exportOptionsBuild(correlationId()));
	};
	const exportTemplateDelete = (id) => {
		const correlationIdI = correlationId();
		serviceStore.dispatcher.deleteFlightPathTemplate(correlationIdI, id);
		exportTemplatesLoad(correlationIdI);
		if (exportTemplateId.value === id)
			exportTemplateId.value = 'kml';
	};
	const exportTemplatesLoad = (correlationId) => {
		exportUserTemplates.value = serviceStore.getters.getFlightPathTemplates() ?? [];
		exportTemplates.value = serviceFlightPath.templates(correlationId, exportUserTemplates.value).map(template => {
			const key = `export.templates.${template.id}`;
			const name = template.builtIn ? trans(key) : template.displayName;
			return { id: template.id, name: (name && name !== `forms.content.tools.flightPath.${key}`) ? name : template.displayName };
		});
	};
	const flightPathInputChange = () => {
		document.getElementById('top').scrollIntoView({behavior: 'smooth'});
	};
	const flightPathExport = () => {
		try {
			const correlationIdI = correlationId();
			if (LibraryCommonUtility.isNull(flightPathDataExport.value))
				return;

			downloadProgress.value = true;

			const currentDate = flightDataDate.value ? new Date(flightDataDate.value) : new Date();
			const namePrefix = slug(exportMissionName.value || flightDataTitle.value);
			const nameDate = isoDate(currentDate);
			const multiple = flightPathDataExport.value.length > 1;

			let index = 0;
			for (const item of flightPathDataExport.value) {
				index++;
				const name = `${namePrefix}-${nameDate}${multiple ? '-' + index : ''}.${item.extension}`;
				serviceDownload.download(correlationIdI, item.content, name,
					() => {
						LibraryClientUtility.debug2('download', 'completed');
						downloadProgress.value = false;
					},
					() => {
						LibraryClientUtility.debug2('download', 'cancelled');
						downloadProgress.value = false;
					},
					(arg) => {
						LibraryClientUtility.debug2('download', 'progress');
						LibraryClientUtility.debug2(arg);
					}
				);
			}
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
		flightPathOutput.value = '';

		processing.value = true;

		try {
			if (String.isNullOrEmpty(flightPathInput.value)) {
				setErrorMessage(correlationIdI, LibraryClientUtility.$trans.t('errors.process.noInput'));
				processing.value = false;
				return;
			}

			const data = Papa.parse(flightPathInput.value.trim());
			if (data.errors && data.errors.length > 0) {
				setErrorMessage(correlationIdI, LibraryClientUtility.$trans.t('errors.process.unableToConvert'));
				processing.value = false;
				return;
			}

			const flightPath = {
				date: flightDataDate.value,
				location: flightDataLocation.value,
				title: flightDataTitle.value
			};

			const options = exportOptionsBuild(correlationIdI);
			const flightPathResponse = serviceFlightPath.process(correlationIdI, data, flightProcessor.value,
				flightPath,
				{
					measurementUnitsId: flightMeasurementUnitsId.value,
					measurementUnitsAccelerationId: flightMeasurementUnitsAccelerationId.value,
					measurementUnitsAltitudeId: flightMeasurementUnitsAltitudeId.value,
					measurementUnitsDistanceId: flightMeasurementUnitsDistanceId.value,
					measurementUnitsVelocityId: flightMeasurementUnitsVelocityId.value,
					measurementUnitsOutputId: flightMeasurementUnitsOutputId.value,
					measurementUnitsAccelerationOutputId: flightMeasurementUnitsAccelerationOutputId.value,
					measurementUnitsAltitudeOutputId: flightMeasurementUnitsAltitudeOutputId.value,
					measurementUnitsDistanceOutputId: flightMeasurementUnitsDistanceOutputId.value,
					measurementUnitsVelocityOutputId: flightMeasurementUnitsVelocityOutputId.value,
				},
				options, exportTemplateId.value, exportUserTemplates.value);
			if (hasFailed(flightPathResponse)) {
				setErrorMessage(correlationIdI, errorsFromResponse(flightPathResponse));
				processing.value = false;
				return;
			}

			flightPathData.value = flightPathResponse.results.flightPaths;
			flightPathDataExport.value = flightPathResponse.results.flightPathsOutput;
			flightPathOutput.value = flightPathResponse.results.flightPathsOutput.map(l => l.content);

			// Settings are remembered only once a document was actually produced.
			serviceStore.dispatcher.setFlightPathProcessor(correlationIdI, flightProcessor.value);
			exportOptionsSave(correlationIdI);
			flightDataSave(correlationIdI);
			flightMeasurementUnitsSave(correlationIdI, flightProcessor.value);

			setSuccessMessage(correlationIdI, LibraryClientUtility.$trans.t('messages.processed'));

			panelInstructions.value = [];
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
		setErrorMessage(correlationId, null);
		flightPathData.value = null;
		flightPathDataExport.value = null;
		flightPathOutput.value = '';
		processing.value = false;
	};
	const resetAdditionalInput = () => {
		const correlationIdI = correlationId();
		resetAdditionalInput2(correlationIdI);
		flightDataTitle.value = null;
		exportMissionName.value = '';

		setNotify(correlationIdI, 'messages.reset');
	};
	const resetAdditionalInput2 = () => {
		const correlationIdI = correlationId();
		reset(correlationIdI);
		flightDataReset(correlationIdI);
		flightMeasurementUnitsReset(correlationIdI);

		flightPathInput.value = null;
		flightPathData.value = null;
		flightPathDataExport.value = null;
		flightPathOutput.value = '';

		buttons.value.process.disabled = true;
	}

	watch(() => flightProcessor.value,
		(value) => {
			if (!value)
				return;

			setErrorMessage(correlationId(), null);

			const correlationIdI = correlationId();

			const processor = serviceFlightPath.serviceProcessors.find(l => l.id === value);
			flightMeasurementUnitsLoad(correlationIdI, processor);

			if (flightPathInput.value) {
				const data = Papa.parse(flightPathInput.value.trim());
				checkDataForProcessor(correlationIdI, data);
			}
		}
	);
	// The launch elevation is stored in meters; show it once the input unit is known.
	watch(() => flightMeasurementUnitsAltitudeId.value,
		() => {
			if (exportLaunchAltitude.value === null)
				exportLaunchAltitudeDisplay();
		}
	);
	// Every control a preset covers keeps the preset highlight honest.
	watch(
		[
			exportAltitudeReference,
			exportWaypointAltitudeReference,
			exportIncludeFlightPath,
			exportIncludeGroundTrack,
			exportDrawShadow,
			() => ({ ...exportWaypoints.value })
		],
		() => exportPresetSync(),
		{ deep: true }
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
		measurementUnitsAltitudeType,
		measurementUnitsVelocityType,
		serviceDownload,
		serviceFlightPath,
		buttons,
		downloadProgress,
		expanded,
		flightPathBranches,
		flightPathData,
		flightPathDataExport,
		flightPathFilterSpeed,
		flightPathInput,
		flightPathOutput,
		panelInstructions,
		exportAltitudeReference,
		exportAltitudeReferences,
		exportBranchGroundColors,
		exportBranchPathColors,
		exportBranchPinColors,
		exportColorWaypointPins,
		exportColorWaypointPinsByFlight,
		exportDrawShadow,
		exportIncludeDescriptions,
		exportIncludeFlightPath,
		exportIncludeGroundTrack,
		exportLabelWaypointsWithMission,
		exportLaunchAltitude,
		exportMissionName,
		exportOneFilePerFlight,
		exportPathStride,
		exportPinColors,
		exportPreset,
		exportPresets,
		exportShadowEnabled,
		exportShowWaypointLabels,
		exportTemplateId,
		exportTemplates,
		exportUserTemplateItems,
		exportUserTemplates,
		exportWaypointAltitudeReference,
		exportWaypointTypes,
		exportWaypoints,
		flightPathInstructions,
		clickExportOptionsReset,
		dropOutput,
		dropTemplate,
		exportPresetApply,
		exportTemplateDelete,
		flightPathInputChange,
		flightPathExport,
		flightPathProcess,
		reset,
		resetAdditionalInput,
		scope: 'FlightPath',
		validation: useVuelidate({ $scope: 'FlightPath' })
	};
};
</script>
