<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';

export function useWeathercockingBaseComponent(props, context) {
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
		content,
		calculationOutput,
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
		id: 'weathercocking',
		title: LibraryClientUtility.$trans.t('titles.content.tools.weathercocking')
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

	const serviceToolsWeathercocking = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_WEATHERCOCKING);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const exitVelocity = ref(null);
	const exitVelocityMeasurementUnitId = ref(null);
	const exitVelocityMeasurementUnitsId = ref(null);
	const weathercockingFormRef = ref(null);
	const windVelocity = ref(null);
	const windVelocityMeasurementUnitId = ref(null);
	const windVelocityMeasurementUnitsId = ref(null);

	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			initCalculationData(correlationIdI);
			const responseCalc = await serviceToolsWeathercocking.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsIdOutput.value, settings);
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
		calculationData.value.exitVelocity = exitVelocity.value;
		calculationData.value.exitVelocityMeasurementUnitId = exitVelocityMeasurementUnitId.value;
		calculationData.value.exitVelocityMeasurementUnitsId = exitVelocityMeasurementUnitsId.value;
		calculationData.value.windVelocity = windVelocity.value;
		calculationData.value.windVelocityMeasurementUnitId = windVelocityMeasurementUnitId.value;
		calculationData.value.windVelocityMeasurementUnitsId = windVelocityMeasurementUnitsId.value;
	};
	const reset = async (correlationId) => {
		await weathercockingFormRef.value.reset(correlationId, false);
	};
	const resetForm = (correlationId) => {
		resetFormI(correlationId, calculationResults, (correlationId) => {
			calculationResults.value.foams = [];

			windVelocity.value = null;
			exitVelocity.value = null;
		});
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsWeathercocking.initialize(correlationId());
		exitVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		exitVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
		windVelocityMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		windVelocityMeasurementUnitId.value = measurementUnitsVelocityDefaultId.value;
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
		measurementUnitsVelocityType,
		serviceToolsWeathercocking,
		calculationData,
		calculationResults,
		exitVelocity,
		exitVelocityMeasurementUnitsId,
		exitVelocityMeasurementUnitId,
		weathercockingFormRef,
		windVelocity,
		windVelocityMeasurementUnitsId,
		windVelocityMeasurementUnitId,
		calculationOk,
		initCalculationData,
		reset,
		resetForm,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
