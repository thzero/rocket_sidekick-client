<script>
import { computed, onMounted, ref, watch } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '@thzero/library_client_vue3/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementUtilityComponent } from '@/components/content/tools/toolsMeasurementUtilityComponent';

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
		setSuccessMessage
	} = useToolsBaseComponent(props, context, options);

	const {
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
	} = useToolsMeasurementUtilityComponent(props, context, options);

	const flightDataDate = ref(null);
	const flightDataLocation = ref(null);
	const flightDataTitle = ref(null);
	const flightMeasurementUnitsId = ref(null);
	const flightMeasurementUnitsAccelerationId = ref(null);
	const flightMeasurementUnitsAltitudeId = ref(null);
	const flightMeasurementUnitsDistanceId = ref(null);
	const flightMeasurementUnitsVelocityId = ref(null);
	const flightMeasurementUnitsOutputId = ref(null);
	const flightMeasurementUnitsAccelerationOutputId = ref(null);
	const flightMeasurementUnitsAltitudeOutputId = ref(null);
	const flightMeasurementUnitsDistanceOutputId = ref(null);
	const flightMeasurementUnitsVelocityOutputId = ref(null);
	const flightMeasurementUnitsOptions = ref([]);
	const flightProcessor = ref(null);
	const flightProcessors = ref([]);
	const processing = ref(false);
	const styles = ref(false);

	const initialized = ref(false);

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const flightInstructions = computed(() => {
		if (!content.value)
			return '';

		return content.value.markup;
	});
	const flightMeasurementUnitsOptionsAcceleration = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = AppCommonConstants.MeasurementUnits[flightMeasurementUnitsId.value].acceleration;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.acceleration.' + item + 'Abbr') }; });
	});
	const flightMeasurementUnitsOptionsAltitude = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = AppCommonConstants.MeasurementUnits[flightMeasurementUnitsId.value].altitude;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.altitude.' + item + 'Abbr') }; });
	});
	const flightMeasurementUnitsOptionsDistance = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = AppCommonConstants.MeasurementUnits[flightMeasurementUnitsId.value].distance;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.distance.' + item + 'Abbr') }; });
	});
	const flightMeasurementUnitsOptionsVelocity = computed(() => {
		if (String.isNullOrEmpty(flightMeasurementUnitsId.value))
			return [];
		const object = AppCommonConstants.MeasurementUnits[flightMeasurementUnitsId.value].velocity;
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + flightMeasurementUnitsId.value + '.velocity.' + item + 'Abbr') }; });
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
		flightProcessor.value = null;
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
	const flightMeasurementUnitsLoading = ref(false);
	const flightMeasurementUnitsLoad = (correlationId, processor) => {
		try {
			flightMeasurementUnitsLoading.value = true;
				
			if (!processor)
				throw Error('Invalid processor.');

			const measurementUnits = serviceStore.getters.getFlightMeasurementUnits(correlationId);

			let input = measurementUnits && measurementUnits.input ? measurementUnits.input.find(l => l.id === processor.id) : null;
			if (!input) {
				input = processor.measurementUnitDefaults;
				input.id = processor.id;
			}
			flightMeasurementUnitsId.value = input ? input.unitsId : null;
			flightMeasurementUnitsAccelerationId.value = input ? input.accelerationId : null;
			flightMeasurementUnitsAltitudeId.value = input ? input.altitudeId : null;
			flightMeasurementUnitsDistanceId.value = input ? input.distanceId : null;
			flightMeasurementUnitsVelocityId.value = input ? input.velocityId : null;

			flightMeasurementUnitsOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.units : null;
			if (String.isNullOrEmpty(flightMeasurementUnitsOutputId.value))
				flightMeasurementUnitsOutputId.value = AppUtility.measurementUnitsIdDefault(correlationId, settings.value);

			flightMeasurementUnitsAccelerationOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.accelerationId : null;
			if (String.isNullOrEmpty(flightMeasurementUnitsAccelerationOutputId.value))
				flightMeasurementUnitsAccelerationOutputId.value = AppUtility.measurementUnitAccelerationId(correlationId, settings.value);
			if (String.isNullOrEmpty(flightMeasurementUnitsAltitudeOutputId.value))
				flightMeasurementUnitsAltitudeOutputId.value = AppUtility.measurementUnitAltitudeId(correlationId, settings.value);
			flightMeasurementUnitsDistanceOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.distanceId : null;
			if (String.isNullOrEmpty(flightMeasurementUnitsDistanceOutputId.value))
				flightMeasurementUnitsDistanceOutputId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value);
			flightMeasurementUnitsVelocityOutputId.value = measurementUnits && measurementUnits.output ? measurementUnits.output.velocityId : null;
			if (String.isNullOrEmpty(flightMeasurementUnitsVelocityOutputId.value))
				flightMeasurementUnitsVelocityOutputId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value);
		}
		finally {
			setTimeout(() => {
				flightMeasurementUnitsLoading.value = false;
			}, 50);
		}
	};
	const flightMeasurementUnitsLoadOptions = (correlationId) => {
		flightMeasurementUnitsOptions.value = LibraryClientVueUtility.selectOptions(AppUtility.measurementUnitsOptions(), LibraryClientUtility.$trans.t, 'measurementUnits');
	};
	const flightMeasurementUnitsReset = (correlationId) => {
		flightMeasurementUnitsAccelerationId.value = AppUtility.measurementUnitAccelerationId(correlationId, settings.value, flightMeasurementUnitsId.value);
		flightMeasurementUnitsAltitudeId.value = AppUtility.measurementUnitAltitudeId(correlationId, settings.value, flightMeasurementUnitsId.value);
		flightMeasurementUnitsDistanceId.value = AppUtility.measurementUnitDistanceId(correlationId, settings.value, flightMeasurementUnitsId.value);
		flightMeasurementUnitsVelocityId.value = AppUtility.measurementUnitVelocityId(correlationId, settings.value, flightMeasurementUnitsId.value);

		flightMeasurementUnitsOutputId.value = AppUtility.measurementUnitsIdDefault(correlationId, settings.value);
		flightMeasurementUnitsAccelerationOutputId.value = AppUtility.measurementUnitAccelerationId(correlationId, settings.value);
		flightMeasurementUnitsAltitudeOutputId.value = AppUtility.measurementUnitAltitudeId(correlationId, settings.value);
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
			altitudeId: flightMeasurementUnitsAltitudeId.value,
			distanceId: flightMeasurementUnitsDistanceId.value,
			velocityId: flightMeasurementUnitsVelocityId.value,
		};
		measurementUnits.input = measurementUnits.input ? measurementUnits.input : [];
		measurementUnits.input = LibraryCommonUtility.updateArrayByObject(measurementUnits.input, input);
		measurementUnits.output = {
			unitsId: flightMeasurementUnitsOutputId.value,
			accelerationId: flightMeasurementUnitsAccelerationOutputId.value,
			altitudeId: flightMeasurementUnitsAltitudeOutputId.value,
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

		try {
			contentLoadStart();
	
			const contentId = options ? options.markupId : null;
			if (contentId) {
				const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), contentId);
				if (hasFailed(response))
					return;

				content.value = response.results;
			}
		}
		finally {
			contentLoadStop();
		}
	});

	watch(() => flightMeasurementUnitsId.value,
		(value) => {
			if (!initialized.value)
				return;

			if (!flightMeasurementUnitsLoading.value) {
				flightMeasurementUnitsAccelerationId.value = null;
				flightMeasurementUnitsAltitudeId.value = null;
				flightMeasurementUnitsDistanceId.value = null;
				flightMeasurementUnitsVelocityId.value = null;
			}
		}
	);
	watch(() => flightMeasurementUnitsOutputId.value,
		(value) => {
			if (!initialized.value)
				return;
			
			flightMeasurementUnitsAccelerationOutputId.value = AppUtility.measurementUnitAccelerationId(correlationId, settings.value, value);
			flightMeasurementUnitsAltitudeOutputId.value = AppUtility.measurementUnitAltitudeId(correlationId, settings.value, value);
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
	};
};
</script>
