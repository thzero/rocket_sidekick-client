<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';

export function useParachuteSizingBaseComponent(props, context) {
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
		toFixed
	} = useToolsBaseComponent(props, context, { 
		id: 'parachuteSizing',
		title: LibraryClientUtility.$trans.t('titles.content.tools.parachuteSizing')
	});
	
	const {
		measurementUnitsAccelerationDefaultId,
		measurementUnitsAccelerationType,
		measurementUnitsAreaDefaultId,
		measurementUnitsAreaType,
		measurementUnitsDensityDefaultId,
		measurementUnitsDensityType,
		measurementUnitsDistanceType,
		measurementUnitsDistanceDefaultId,
		measurementUnitsFluidDefaultId,
		measurementUnitsFluidType,
		measurementUnitsLengthDefaultId,
		measurementUnitslengthType,
		measurementUnitsVelocityDefaultId,
		measurementUnitsVelocityType,
		measurementUnitsVolumeDefaultId,
		measurementUnitsVolumeType,
		measurementUnitsWeightDefaultId,
		measurementUnitsWeightType
	} = useToolsMeasurementBaseComponent(props, context);

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
	const diameterLengthMeasurementUnitId = ref(null);
	const diameterLengthMeasurementUnitsId = ref(null);
	const mass = ref(null);
	const massWeightMeasurementUnitId = ref(null);
	const massWeightMeasurementUnitsId = ref(null);
	const parachuteSizingFormRef = ref(null);
	const contentMarkup = ref(LibraryClientUtility.$trans.t('strings.content.tools.parachuteSizing.info', { url: 'http://www.rocketmime.com/rockets/descent.html', title: 'Parachute Descent Calculations' }));

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
		calculationData.value.diameterLengthMeasurementUnitsId = diameterLengthMeasurementUnitsId.value;
		calculationData.value.diameterLengthMeasurementUnitId = diameterLengthMeasurementUnitId.value;
		calculationData.value.mass = mass.value;
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
		diameterLengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		massWeightMeasurementUnitsId.value = measurementUnitsIdSettings.value;

		airDensityMeasurementUnitId.value = measurementUnitsDensityDefaultId.value;
		desiredVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		diameterLengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
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
		measurementUnitsDensityType,
		measurementUnitslengthType,
		measurementUnitsVelocityType,
		measurementUnitsWeightType,
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
		diameterLengthMeasurementUnitId,
		diameterLengthMeasurementUnitsId,
		mass,
		massWeightMeasurementUnitId,
		massWeightMeasurementUnitsId,
		parachuteSizingFormRef,
		contentMarkup,
		calculationOk,
		initCalculationData,
		reset,
		resetForm,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
