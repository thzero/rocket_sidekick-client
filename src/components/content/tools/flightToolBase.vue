<script>
import { computed, onMounted, ref, watch } from 'vue';

import Constants from '@/constants';

import AppUtility from '@/utility/app';
import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';
import VuetifyUtility from '@/library_vue_vuetify/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useFlightToolsBaseComponent(props, context, options) {
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
		settings
	} = useToolsBaseComponent(props, context, options);

	const flightDataDate = ref(null);
	const flightDataLocation = ref(null);
	const flightDataTitle = ref(null);
	const flightMeasurementUnitsId = ref(null);
	const flightMeasurementUnitsAccelerationId = ref(null);
	const flightMeasurementUnitsDistanceId = ref(null);
	const flightMeasurementUnitsVelocityId = ref(null);
	const flightMeasurementUnitsOutputId = ref(null);
	const flightMeasurementUnitsAccelerationOutputId = ref(null);
	const flightMeasurementUnitsDistanceOutputId = ref(null);
	const flightMeasurementUnitsVelocityOutputId = ref(null);
	const flightMeasurementUnitsOptions = ref([]);
	const flightProcessor = ref(null);
	const flightProcessors = ref([]);
	const processing = ref(false);
	const styles = ref(false);

	const initialized = ref(false);

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const flightMeasurementUnitsOptionsAcceleration = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = Constants.MeasurementUnits[flightMeasurementUnitsId.value].acceleration;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.acceleration.' + item + 'Abbr') }; });
	});
	const flightMeasurementUnitsOptionsDistance = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = Constants.MeasurementUnits[flightMeasurementUnitsId.value].distance;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.distance.' + item + 'Abbr') }; });
	});
	const flightMeasurementUnitsOptionsVelocity = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = Constants.MeasurementUnits[flightMeasurementUnitsId.value].velocity;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: GlobalUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.velocity.' + item + 'Abbr') }; });
	});

	const flightDataLoad = (correlationId) => {
		// flightDataDate.value = serviceStore.getters.getFlightDate();
		// flightDataLocation.value = serviceStore.getters.getFlightLocation();
		// flightDataTitle.value = serviceStore.getters.getFlightTitle();
		const flightData = serviceStore.getters.getFlightData();
		flightDataDate.value = flightData.date;
		flightDataLocation.value = flightData.location;
		flightDataTitle.value = flightData.title;
	};
	const flightDataReset = (correlationId) => {
		flightDataDate.value = null;
		flightDataLocation.value = null;
		flightPathProcessor.value = null;
	};
	const flightDataSave = (correlationId) => {
		// serviceStore.dispatcher.setFlightDate(correlationIdI, flightDataDate.value);
		// serviceStore.dispatcher.setFlightLocation(correlationIdI, flightDataLocation.value);
		// serviceStore.dispatcher.setFlightTitle(correlationIdI, flightDataTitle.value);
		serviceStore.dispatcher.setFlightData(correlationId, {
			date: flightDataDate.value,
			location: flightDataLocation.value,
			title: flightDataTitle.value
		});
	};
	const flightMeasurementUnitsLoad = (correlationId, processor) => {
		if (String.isNullOrEmpty(processor))
			return;

		const measurementUnits = serviceStore.getters.getFlightMeasurementUnits(correlationId);

		const input = measurementUnits && measurementUnits.input ? measurementUnits.input.find(l => l.id === processor) : null;
		flightMeasurementUnitsId.value = input ? input.unitsId : null;
		flightMeasurementUnitsAccelerationId.value = input ? input.accelerationId : null;
		flightMeasurementUnitsDistanceId.value = input ? input.distanceId : null;
		flightMeasurementUnitsVelocityId.value = input ? input.velocityId : null;

		flightMeasurementUnitsOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.units : null;
		if (String.isNullOrEmpty(flightMeasurementUnitsOutputId.value))
			flightMeasurementUnitsOutputId.value = AppUtility.measurementUnitsId(correlationId, settings.value);

		flightMeasurementUnitsAccelerationOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.accelerationId : null;
		if (String.isNullOrEmpty(flightMeasurementUnitsAccelerationOutputId.value))
			flightMeasurementUnitsAccelerationOutputId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value);
		flightMeasurementUnitsDistanceOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.distanceId : null;
		if (String.isNullOrEmpty(flightMeasurementUnitsDistanceOutputId.value))
			flightMeasurementUnitsDistanceOutputId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		flightMeasurementUnitsVelocityOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.velocityId : null;
		if (String.isNullOrEmpty(flightMeasurementUnitsVelocityOutputId.value))
			flightMeasurementUnitsVelocityOutputId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
	};
	const flightMeasurementUnitsLoadOptions = (correlationId) => {
		flightMeasurementUnitsOptions.value = VuetifyUtility.selectOptions(AppUtility.measurementUnitsOptions(), GlobalUtility.$trans.t, 'measurementUnits');
	};
	const flightMeasurementUnitsReset = (correlationId) => {
		flightMeasurementUnitsAccelerationId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value, flightMeasurementUnitsId.value);
		flightMeasurementUnitsDistanceId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value, flightMeasurementUnitsId.value);
		flightMeasurementUnitsVelocityId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value, flightMeasurementUnitsId.value);

		flightMeasurementUnitsOutputId.value = AppUtility.measurementUnitsId(correlationId, settings.value);
		flightMeasurementUnitsAccelerationOutputId.value = AppUtility.measurementUnitsAccelerationId(correlationId, settings.value);
		flightMeasurementUnitsDistanceOutputId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
		flightMeasurementUnitsVelocityOutputId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
	};
	const flightMeasurementUnitsSave = (correlationId, processor) => {
		if (String.isNullOrEmpty(processor))
			return;

		let measurementUnits = serviceStore.getters.getFlightMeasurementUnits(correlationId);
		measurementUnits = measurementUnits ? measurementUnits : {};
		const input = {
			id: processor,
			unitsId: flightMeasurementUnitsId.value,
			accelerationId: flightMeasurementUnitsAccelerationId.value,
			distanceId: flightMeasurementUnitsDistanceId.value,
			velocityId: flightMeasurementUnitsVelocityId.value,
		};
		measurementUnits.input = measurementUnits.input ? measurementUnits.input : [];
		measurementUnits.input = CommonUtility.updateArrayByObject(measurementUnits.input, input);
		measurementUnits.output = {
			unitsId: flightMeasurementUnitsOutputId.value,
			accelerationId: flightMeasurementUnitsAccelerationOutputId.value,
			distanceId: flightMeasurementUnitsDistanceOutputId.value,
			velocityId: flightMeasurementUnitsVelocityOutputId.value,
		};
		serviceStore.dispatcher.setFlightMeasurementUnits(correlationId, measurementUnits);
	};

	onMounted(async () => {
		flightMeasurementUnitsLoadOptions(correlationId());

		if (options && options.onMounted)
			await options.onMounted(correlationId);

		setTimeout(() => {
			initialized.value = true;
		}, 50);
	});
		
	watch(() => flightMeasurementUnitsId.value,
		(value) => {
			if (!initialized.value)
				return;
			flightMeasurementUnitsAccelerationId.value = null;
			flightMeasurementUnitsDistanceId.value = null;
			flightMeasurementUnitsVelocityId.value = null;
		}
	);
	watch(() => flightMeasurementUnitsOutputId.value,
		(value) => {
			if (!initialized.value)
				return;
			flightMeasurementUnitsDistanceOutputId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value, value);
			flightMeasurementUnitsVelocityOutputId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value, value);
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
		flightMeasurementUnitsSave
	};
};
</script>
