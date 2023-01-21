<script>
import { nextTick, onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import Papa from 'papaparse';

import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import { useFlightToolsBaseComponent } from '@/components/content/tools/flightToolBase';

export function useAppFlightPathComponent(props, context) {
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
	const templateMain = ref(serviceFlightPath.templateMainDefault);
	const templatePinLaunch = ref(serviceFlightPath.templatePinLaunchDefault);
	const templatePinsAdditional = ref('');
	const templatePinTouchdown = ref(serviceFlightPath.templatePinTouchdownDefault);

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
		output,
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
	};
};
</script>
