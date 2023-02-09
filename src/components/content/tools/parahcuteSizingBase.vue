<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useParachuteSizingBaseComponent(props, context, options) {
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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAreaDefaultId,
		measurementUnitsDensityDefaultId,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
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

	const serviceToolsParachuteSizing = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_PARACHUTE_SIZING);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const airDensity = ref(null);
	const airDensityMeasurementUnitId = ref(null);
	const airDensityMeasurementUnitsId = ref(null);
	const coeffDrag = ref(null);
	const desiredVelocity = ref(null);
	const desiredVelocityMeasurementUnitId = ref(null);
	const desiredVelocityMeasurementUnitsId = ref(null);
	const mass = ref(null);
	const massWeightMeasurementUnitId = ref(null);
	const massWeightMeasurementUnitsId = ref(null);
	const measurementUnitsVelocityType = ref(AppConstants.MeasurementUnits.types.velocity);
	const measurementUnitsWeightType = ref(AppConstants.MeasurementUnits.types.weight);
	const parachuteSizingFormRef = ref(null);

	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			initCalculationData(correlationIdI);
			const responseCalc = await serviceToolsParachuteSizing.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsIdOutput.value, settings);
			if (!responseCalc || !responseCalc.success) {
				return false; // TODO
			}

			responseCalc.results.instance.addListener(correlationIdI, handleListener);
			const responseCalcInstance = responseCalc.results.instance.calculate(correlationIdI, responseCalc.results.steps, 'volume');
			if (!responseCalcInstance || !responseCalcInstance.success) {
				return false; // TODO
			}
			calculationResultsI.value = responseCalcInstance.results;
			calculationResultsI.value.calculated = false;

			return true;
		});
	};
	const initCalculationData = (correlationId) => {
		calculationData.value.airDensity = airDensity.value;
		calculationData.value.airDensityMeasurementUnitId = airDensityMeasurementUnitId.value;
		calculationData.value.airDensityMeasurementUnitsId = airDensityMeasurementUnitsId.value;
		calculationData.value.coeffDrag = coeffDrag.value;
		calculationData.value.desiredVelocity = desiredVelocity.value;
		calculationData.value.desiredVelocityMeasurementUnitId = desiredVelocityMeasurementUnitId.value;
		calculationData.value.desiredVelocityMeasurementUnitsId = desiredVelocityMeasurementUnitsId.value;
		calculationData.value.desiredVelocity = mass.value;
		calculationData.value.massWeightMeasurementUnitId = massWeightMeasurementUnitId.value;
		calculationData.value.massWeightMeasurementUnitsId = massWeightMeasurementUnitsId.value;
	};
	const reset = async (correlationId) => {
		await parachuteSizingFormRef.value.reset(correlationId, false);
	};
	const resetForm = (correlationId) => {
		resetFormI(correlationId, calculationResults, (correlationId) => {
			calculationResults.value.foams = [];

			airDensity.value = null;
			coeffDrag.value = null;
			desiredVelocity.value = null;
			mass.value = null;
		});
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsParachuteSizing.initialize(correlationId());
		airDensityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		desiredVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		massWeightMeasurementUnitsId.value = measurementUnitsIdSettings.value;

		airDensityMeasurementUnitId.value = measurementUnitsDensityDefaultId.value;
		desiredVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		massWeightMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
	});

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
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAreaDefaultId,
		measurementUnitsDensityDefaultId,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
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
		serviceToolsParachuteSizing,
		calculationData,
		calculationResults,
		airDensity,
		airDensityMeasurementUnitId,
		airDensityMeasurementUnitsId,
		coeffDrag,
		desiredVelocity,
		desiredVelocityMeasurementUnitId,
		desiredVelocityMeasurementUnitsId,
		mass,
		massWeightMeasurementUnitId,
		massWeightMeasurementUnitsId,
		measurementUnitsVelocityType,
		measurementUnitsWeightType,
		parachuteSizingFormRef,
		calculationOk,
		initCalculationData,
		reset,
		resetForm,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
