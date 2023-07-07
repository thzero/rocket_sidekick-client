<script>
import { onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';
import { useToolsMeasurementBaseComponent } from '@/components/content/tools/toolsMeasurementBase';
import { useToolsMeasurementSettingsComponent } from '@/components/content/tools/toolsMeasurementSettings';

export function useFoamBaseComponent(props, context) {
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
		contentLoadSignal,
		serviceStore,
		contentLoadStart,
		contentLoadStop,
		sortByOrder,
		target,
		calculationOutput,
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
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
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify
	} = useToolsBaseComponent(props, context, {
		id: 'foam',
		resetForm: (correlationId) => {
			calculationResults.value.foams = [];

			bodyTubeID.value = null;
			finRootLength.value = null;
			finTabLength.value = null;
			finWidth.value = null;
			motorTubeOD.value = null;
			numberFins .value = null;
		},
		title: LibraryClientUtility.$trans.t('titles.content.tools.foam')
	});

	const {
		measurementUnitsIdOutput,
		measurementUnitsIdSettings
	} = useToolsMeasurementSettingsComponent(props, context);

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

	const serviceToolsFoam = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_FOAM);

	const calculationData = ref(null);
	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const formFoamRef = ref(null);
	const bodyTubeID = ref(null);
	const finRootLength = ref(null);
	const finTabLength = ref(0.3);
	const finWidth = ref(null);
	const fluidMeasurementUnitId = ref(null);
	const fluidMeasurementUnitsId = ref(null);
	const lengthMeasurementUnitId = ref(null);
	const lengthMeasurementUnitsId = ref(null);
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
			const responseCalc = await serviceToolsFoam.initializeCalculation(correlationIdI, calculationData.value, measurementUnitsIdOutput.value, settings);
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
				responseCalcFoam = await serviceToolsFoam.initializeCalculationFoam(correlationIdI, foam, measurementUnitsIdOutput.value);
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
		calculationData.value.fluidMeasurementUnitId = fluidMeasurementUnitId.value;
		calculationData.value.fluidMeasurementUnitsId = fluidMeasurementUnitsId.value;
		calculationData.value.finRootLength = finRootLength.value;
		calculationData.value.finTabLength = finTabLength.value;
		calculationData.value.finWidth = finWidth.value;
		calculationData.value.lengthMeasurementUnitId = lengthMeasurementUnitId.value;
		calculationData.value.lengthMeasurementUnitsId = lengthMeasurementUnitsId.value;
		calculationData.value.motorTubeOD = motorTubeOD.value;
		calculationData.value.numberFins = numberFins.value;
	};
	const reset = async (correlationId) => {
		await formFoamRef.value.reset(correlationId, false);
	};

	onMounted(async () => {
		reset(false);

		calculationData.value = serviceToolsFoam.initialize(correlationId());
		fluidMeasurementUnitId.value = measurementUnitsFluidDefaultId.value;
		fluidMeasurementUnitsId.value = measurementUnitsIdSettings.value;
		lengthMeasurementUnitId.value = measurementUnitsLengthDefaultId.value;
		lengthMeasurementUnitsId.value = measurementUnitsIdSettings.value;
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
		contentLoadSignal,
		serviceStore,
		contentLoadStart,
		contentLoadStop,
		sortByOrder,
		target,
		calculationOutput,
		content,
		contentTitle,
		errors,
		errorMessage,
		errorTimer,
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
		resetFormI,
		setErrorMessage,
		setErrorTimer,
		setNotify,
		measurementUnitsIdOutput,
		measurementUnitsIdSettings,
		measurementUnitsFluidType,
		measurementUnitslengthType,
		serviceToolsFoam,
		calculationData,
		calculationResults,
		formFoamRef,
		bodyTubeID,
		finRootLength,
		finTabLength,
		finWidth,
		fluidMeasurementUnitId,
		fluidMeasurementUnitsId ,
		lengthMeasurementUnitId,
		lengthMeasurementUnitsId,
		motorTubeOD,
		numberFins,
		calculationOk,
		initCalculationData,
		scope: 'Foam',
		validation: useVuelidate({ $scope: 'Foam' })
	};
};
</script>
