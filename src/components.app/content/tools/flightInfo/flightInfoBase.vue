<script>
import { computed, nextTick, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import Papa from 'papaparse';
import html2canvas from 'html2canvas';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';

import { useButtonComponent } from '@thzero/library_client_vue3_vuetify3/components/buttonComponent';
import { useFlightToolsBaseComponent } from '@/components.app/content/tools/flightToolBase';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useFlightInfoBaseComponent(props, context) {
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
		// id: 'flightInfo',
		markupId: 'tools.flightInfo',
		onMounted: async (correlationIdI) => {
			reset(correlationIdI);

			flightProcessor.value = serviceStore.getters.getFlightInfoProcessor();

			flightInfoStyleReset(correlationIdI, false);

			flightDataLoad(correlationIdI);
			// flightMeasurementUnitsLoad(correlationIdI, flightProcessor.value);

			flightInfoDataTypeUse.value = serviceStore.getters.getFlightInfoDataTypeUse();

			flightProcessors.value = LibraryClientVueUtility.selectOptions(serviceFlightInfo.serviceProcessors, LibraryClientUtility.$trans.t, 'forms.content.tools.flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });

			resolution.value = serviceStore.getters.getFlightInfoResolution(correlationIdI) ?? AppConstants.FlightInfo.Resolution;
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.flightInfo')
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
		// m
		// measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsAltitudeDefaultId,
		measurementUnitsAltitudeType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitsLengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType,
		displayItemMeasurement,
		displayItemMeasurementLength,
		displayItemMeasurementWeight,
		measurementUnitsFromUnitId
	} = useToolsMeasurementUtilityComponent(props, context);

	const serviceDownload = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_DOWNLOAD);
	const serviceFlightInfo = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FLIGHT_INFO_PROCESSOR);

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
	const panelInstructions = ref(['instructions']);
	const resolution = ref(AppConstants.FlightInfo.Resolution);

	const flightInfoInstructions = computed(() => {
		if (!content.value || !content.value.processors)
			return '';

		if (String.isNullOrEmpty(flightProcessor.value))
			return '';

		const processor = content.value.processors.find(l => l.id === flightProcessor.value);
		if (!processor)
			return null;

		return processor.markup;
	});

	const checkDataForProcessor = (correlationId, data) => {
		const response = serviceFlightInfo.check(correlationId, data, flightProcessor.value);
			if (hasFailed(response)) {
				resetAdditionalInput2(correlationId);

				let errors = [];
				for(let item of response.errors) 
					errors.push(LibraryClientUtility.$trans.t(`errors.content.tools.flightInfo.${item.code}`));
				setErrorMessage(correlationId, errors.join('<br>'));

				return response;
			}

			setErrorMessage(correlationId, null);
			return success(correlationId);
	};
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
	const dropOutput = (value) => {
		const correlationIdI = correlationId();

		flightInfoInput.value = null;
		setErrorMessage(correlationId, null);
		
		if (value) {
			const data = Papa.parse(value.trim());
			const response = checkDataForProcessor(correlationIdI, data);
			if (hasFailed(response))
				return response;
			
			flightInfoInput.value = value.trim();
			return success(correlationIdI);
		}
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

				serviceDownload.downloadUrl(correlationId, 'data:image/png;base64,' + data,
					name,
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
		catch (err) {
			downloadProgress.value = false;
			logger.exception('FlightInfo', 'flightInfoExportDownload', err, correlationId);
		}
	};
	const flightInfoExportImage = () => {
		flightInfoExport(correlationId());
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
					setError(LibraryClientUtility.$trans.t('errors.process.noInput'));
					processing.value = false;
					return;
				}

				const data = Papa.parse(flightInfoInput.value.trim());
				if (data.errors && data.errors.length > 0) {
					setError(LibraryClientUtility.$trans.t('errors.process.unableToConvert'));
					processing.value = false;
					return;
				}

				const flightInfoDataTypes = {
					actual: flightInfoDataTypeActual.value,
					filtered: flightInfoDataTypeFiltered.value,
					use: flightInfoDataTypeUse.value
				};

				const flightInfoResults = serviceFlightInfo.process(correlationIdI, data, flightProcessor.value, {
						id: flightMeasurementUnitsId.value,
						accelerationId: flightMeasurementUnitsAccelerationId.value,
						altitudeId: flightMeasurementUnitsAltitudeId.value,
						velocityId: flightMeasurementUnitsVelocityId.value,
						outputId: flightMeasurementUnitsOutputId.value,
						accelerationtId: flightMeasurementUnitsAccelerationId.value,
						altitudeOutputId: flightMeasurementUnitsAltitudeOutputId.value,
						velocityOutputId: flightMeasurementUnitsVelocityOutputId.value,
					},
					flightInfoDataTypes);
				LibraryClientUtility.debug2('flightInfoResults', flightInfoResults);
				if (flightInfoResults.errors && data.errors.length > 0) {
					const errors = flightInfoResults.errors.map(e => LibraryClientUtility.$trans.t(e) + '<br/>');
					setError(errors);
					processing.value = false;
					return;
				}

				flightInfoResults.info.title = LibraryClientUtility.$trans.t('charts.flightInfo.title');
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

				// setNotify(correlationIdI, 'messages.processed');
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
		setErrorMessage(correlationId, null);
		flightInfo.value = null;
		flightInfoChartData.value = null;
		processing.value = false;
	};
	const resetAdditionalInput = () => {
		const correlationIdI = correlationId();
		resetAdditionalInput2(correlationId);
		flightProcessor.value = null;

		setNotify(correlationIdI, 'messages.reset');
	};
	const resetAdditionalInput2 = (correlationId) => {
		reset(correlationId);
		flightDataReset(correlationId);
		flightMeasurementUnitsReset(correlationId);

		flightInfoDataTypeActual.value = false;
		flightInfoDataTypeFiltered.value = true;
		flightInfoDataTypeUse.value = true;
		flightInfoDataTypeUseDisabled.value = false;
		flightInfoInput.value = null;
		
		buttons.value.process.disabled = true;
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

			const processor = serviceFlightInfo.serviceProcessors.find(l => l.id === value);
			flightMeasurementUnitsLoad(correlationIdI, processor);

			if (flightInfoInput.value) {
				const data = Papa.parse(flightInfoInput.value.trim());
				checkDataForProcessor(correlationIdI, data);
			}
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
		panelInstructions,
		resolution,
		flightInfoInstructions,
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
		scope: 'FlightInfo',
		validation: useVuelidate({ $scope: 'FlightInfo' })
	};
};
</script>
