<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useFoamBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		success,
		calculationOutput,
		calculateI,
		handleListener,
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
		resetFormI,
		serviceStore,
		sortByOrder,
		target,
		toFixed,
		settings,
	} = useToolsBaseComponent(props, context, options);

	const serviceToolsFoam = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FOAM);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const formFoamRef = ref(null);
	const bodyTubeID = ref(null);
	const finRootLength = ref(null);
	const finTabLength = ref(0.3);
	const finWidth = ref(null);
	const lengthMeasurementUnitId = ref(null);
	const measurementUnitslengthType = ref(AppConstants.MeasurementUnits.types.length);
	const motorTubeOD = ref(null);
	const numberFins = ref(null);

	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			calculationResultsI.value.foams = [];

			const responseFoams = await serviceToolsFoam.foams(correlationIdI);
			if (!responseFoams || !responseFoams.success) {
				return false; // TODO
			}

			initCalculationData(correlationIdI);
			const responseCalc = await serviceToolsFoam.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsId.value, settings);
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
			calculationResultsI.value.foams = [];
			
			let responseCalcFoam;
			let responseCalcFoamInstance;
			for (const foam of responseFoams.results) {
				foam.totalVolume = calculationResultsI.value.totalVolume;
				responseCalcFoam = await serviceToolsFoam.initializeCalculationFoam(correlationIdI, foam, measurementUnitsId.value);
				if (!responseCalcFoam || !responseCalcFoam.success) {
					continue; // TODO
				}

				responseCalcFoam.results.instance.addListener(correlationIdI, handleListener);
				responseCalcFoamInstance = responseCalcFoam.results.instance.calculate(correlationIdI, responseCalcFoam.results.steps, foam.manufacturer);
				if (!responseCalcFoamInstance || !responseCalcFoamInstance.success) {
					continue; // TODO
				}

				calculationResultsI.value.foams.push(responseCalcFoamInstance.results);
			}

			return true;
		});
	};
	const initCalculationData = (correlationId) => {
		calculationData.value.bodyTubeID = bodyTubeID.value;
		calculationData.value.units = lengthMeasurementUnitId.value;
		calculationData.value.finRootLength = finRootLength.value;
		calculationData.value.finTabLength = finTabLength.value;
		calculationData.value.finWidth = finWidth.value;
		calculationData.value.motorTubeOD = motorTubeOD.value;
		calculationData.value.numberFins = numberFins.value;
	};
	const reset = async (correlationId) => {
		await formFoamRef.value.reset(correlationId, false);
	};
	const resetForm = (correlationId) => {
		resetFormI(correlationId, calculationResults, (correlationId) => {
			calculationResults.value.foams = [];

			bodyTubeID.value = null;
			finRootLength.value = null;
			finTabLength.value = null;
			finWidth.value = null;
			motorTubeOD.value = null;
			numberFins .value = null;
		});
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsFoam.initialize(correlationId());
		lengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
	});

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		success,
		calculationOutput,
		calculateI,
		handleListener,
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
		resetFormI,
		serviceStore,
		sortByOrder,
		target,
		toFixed,
		settings,
		serviceToolsFoam,
		calculationData,
		calculationResults,
		formFoamRef,
		bodyTubeID,
		finRootLength,
		finTabLength,
		finWidth,
		lengthMeasurementUnitId,
		measurementUnitslengthType,
		motorTubeOD,
		numberFins,
		calculationOk,
		initCalculationData,
		reset,
		resetForm,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
