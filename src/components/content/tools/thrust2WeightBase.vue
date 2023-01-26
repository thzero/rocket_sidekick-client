<script>
import { onMounted, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import DialogSupport from '@/library_vue/components/support/dialog';

import { useToolsBaseComponent } from '@/components/content/tools/toolsBase';

export function useThrust2WeightBaseComponent(props, context, options) {
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
		setNotify,
		toFixed,
		settings
	} = useToolsBaseComponent(props, context, options);

	const serviceToolsThrust2Weight = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_TOOLS_THRUST2WEIGHT);

	const calculationResults = initCalculationResults(correlationId(), ref({}));
	const dialogMotorSearchRef = ref(null);
	const dialogMotorSearchManager = ref(new DialogSupport());
	const formThrust2WeightRef = ref(null);
	const mass = ref(null);
	const massMeasurementUnitId = ref(null);
	const maxLaunchRodTime = ref(null);
	const maxLaunchRodTimeDefault = ref(0.3);
	const measurementUnitsWeightType = ref(Constants.MeasurementUnits.types.weight);
	const motorLookup1 = ref(null);
	const motorLookup2 = ref(null);
	const motorLookup3 = ref(null);
	const motorLookup4 = ref(null);
	const motorLookupSelection = ref(null);
	const motorSelected1 = ref(true);
	const motorSelected2 = ref(false);
	const motorSelected3 = ref(false);
	const motorSelected4 = ref(false);
	const motorLookupUrl1 = ref(null);
	const motorLookupUrl2 = ref(null);
	const motorLookupUrl3 = ref(null);
	const motorLookupUrl4 = ref(null);
	const thrustAverage1 = ref(null);
	const thrustAverage2 = ref(null);
	const thrustAverage3 = ref(null);
	const thrustAverage4 = ref(null);
	const thrustInitial1 = ref(null);
	const thrustInitial2 = ref(null);
	const thrustInitial3 = ref(null);
	const thrustInitial4 = ref(null);
	const thrustPeak1 = ref(null);
	const thrustPeak2 = ref(null);
	const thrustPeak3 = ref(null);
	const thrustPeak4 = ref(null);

	const motorRef = [];
	motorRef.push({
		key: 1,
		calculationData: serviceToolsThrust2Weight.initialize(correlationId()),
		motorLookup: motorLookup1,
		motorLookupUrl: motorLookupUrl1,
		motorSelected: motorSelected1,
		thrustAverage: thrustAverage1,
		thrustInitial: thrustInitial1,
		thrustPeak: thrustPeak1
	});
	motorRef.push({
		key: 2,
		calculationData: serviceToolsThrust2Weight.initialize(correlationId()),
		motorLookup: motorLookup2,
		motorLookupUrl: motorLookupUrl2,
		motorSelected: motorSelected2,
		thrustAverage: thrustAverage2,
		thrustInitial: thrustInitial2,
		thrustPeak: thrustPeak2
	});
	motorRef.push({
		key: 3,
		calculationData: serviceToolsThrust2Weight.initialize(correlationId()),
		motorLookup: motorLookup3,
		motorLookupUrl: motorLookupUrl3,
		motorSelected: motorSelected3,
		thrustAverage: thrustAverage3,
		thrustInitial: thrustInitial3,
		thrustPeak: thrustPeak3
	});
	motorRef.push({
		key: 4,
		calculationData: serviceToolsThrust2Weight.initialize(correlationId()),
		motorLookup: motorLookup4,
		motorLookupUrl: motorLookupUrl4,
		motorSelected: motorSelected4,
		thrustAverage: thrustAverage4,
		thrustInitial: thrustInitial4,
		thrustPeak: thrustPeak4
	});
	
	const calculationOk = async () => {
		calculateI(correlationId(), calculationResults, async (correlationIdI, calculationResultsI) => {
			initCalculationData(correlationIdI);

			calculationResultsI.value.data = [];

			let responseCalc;
			// for (let item of calculationResultsI.value.data) {
			let temp;
			for (let item of motorRef) {
				if (!item.motorSelected.value)
					continue;

				responseCalc = await executeCalculation(correlationIdI, item.calculationData, item.key);
				if (hasSucceeded(responseCalc)) {
					temp = {};
					temp.key = item.key;
					temp.average = responseCalc.results.average;
					temp.initial = responseCalc.results.initial;
					temp.peak = responseCalc.results.peak;
					calculationResults.value.data.push(temp);
				}
			}

			return true;
		});
	};
	const clickMotorSearch = async (selection) => {
		motorLookupSelection.value = selection;
		await dialogMotorSearchRef.value.reset(correlationId());
		dialogMotorSearchManager.value.open();
	};
	const executeCalculation = async (correlationId, calculationData, key) => {
		const response = await serviceToolsThrust2Weight.initializeCalculation(correlationId, calculationData, measurementUnitsId.value, settings);
		if (!hasSucceeded(response))
			return error();

		response.results.instance.addListener(correlationId, handleListener);
		return response.results.instance.calculate(correlationId, response.results.steps, 'motor' + key);
	};
	const hasResults = () => {
		return motorLookup1.value || motorLookup2.value || motorLookup3.value || motorLookup4.value;
	};
	const initCalculationData = (correlationId) => {
		for (let item of motorRef) {
			item.calculationData.mass = mass.value;
			item.calculationData.units = massMeasurementUnitId.value;
			item.calculationData.maxLaunchRodTime = maxLaunchRodTime.value;
			item.calculationData.thrustAverage = item.thrustAverage.value;
			item.calculationData.thrustInitial =item. thrustInitial.value;
			item.calculationData.thrustPeak = item.thrustPeak.value;
		}
	};
	const reset = async (correlationId) => {
		await formThrust2WeightRef.value.reset(correlationId, false);
	};
	const resetForm = (correlationId) => {
		resetFormI(correlationId, calculationResults, (correlationId) => {
			mass.value = null;
			
			motorLookupSelection.value = null;
			for (let item of motorRef) {
				item.motorLookup.value = null;
				if (item.key !== 1)
					item.motorSelected.value = false;
				item.motorLookupUrl.value = null;
				item.thrustAverage.value = null;
				item.thrustInitial.value = null;
				item.thrustPeak.value = null;
			}

			maxLaunchRodTime.value = maxLaunchRodTimeDefault.value;
		});
	};
	const selectMotor = async (item) => {
		const correlationIdI = correlationId();
		if (!motorLookupSelection.value)
			return;

		const response = await serviceStore.dispatcher.requestMotor(correlationIdI, item.motorId);
		if (hasSucceeded(response)) {
			initCalculationData(correlationIdI);
			
			const reference = motorRef.find(l => l.key == motorLookupSelection.value)

			const response2 = await serviceToolsThrust2Weight.update(correlationIdI, response.results, reference.calculationData);
			if (hasSucceeded(response2)) {
				reference.motor.value = item.designation;

				reference.calculationData = response2.results;
				reference.thrustAverage.value = calculationData.thrustAverage;
				reference.thrustInitial.value = calculationData.thrustInitial;
				reference.thrustPeak.value = calculationData.thrustPeak;

				setNotify(correlationId, 'messages.thrust2Weight.motor.selected');
				dialogMotorSearchManager.value.ok();
				return;
			}

			setNotify(correlationId, 'messages.thrust2Weight.motor.selected');
		}
		dialogMotorSearchManager.value.ok();
	}

	onMounted(async () => {
		reset(false);
		
		massMeasurementUnitId.value = measurementUnitsWeightDefaultId.value;
	});

	watch(() => motorSelected1.value,
		(value) => {
			if (value)
				return;
			thrustAverage1.value = null;
			thrustInitial1.value = null;
			thrustPeak1.value = null;
		}
	);
	watch(() => motorSelected2.value,
		(value) => {
			if (value)
				return;
			thrustAverage2.value = null;
			thrustInitial2.value = null;
			thrustPeak2.value = null;
		}
	);
	watch(() => motorSelected3.value,
		(value) => {
			if (value)
				return;
			thrustAverage3.value = null;
			thrustInitial3.value = null;
			thrustPeak3.value = null;
		}
	);
	watch(() => motorSelected4.value,
		(value) => {
			if (value)
				return;
			thrustAverage4.value = null;
			thrustInitial4.value = null;
			thrustPeak4.value = null;	
		}
	);

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
		serviceToolsThrust2Weight,
		calculationResults,
		dialogMotorSearchRef,
		dialogMotorSearchManager,
		formThrust2WeightRef,
		mass,
		massMeasurementUnitId,
		maxLaunchRodTime,
		maxLaunchRodTimeDefault,
		measurementUnitsWeightType,
		motorLookup1,
		motorLookup2,
		motorLookup3,
		motorLookup4,
		motorLookupSelection,
		motorSelected1,
		motorSelected2,
		motorSelected3,
		motorSelected4,
		motorLookupUrl1,
		motorLookupUrl2,
		motorLookupUrl3,
		motorLookupUrl4,
		thrustAverage1,
		thrustAverage2,
		thrustAverage3,
		thrustAverage4,
		thrustInitial1,
		thrustInitial2,
		thrustInitial3,
		thrustInitial4,
		thrustPeak1,
		thrustPeak2,
		thrustPeak3,
		thrustPeak4,
		calculationOk,
		clickMotorSearch,
		hasResults,
		reset,
		resetForm,
		selectMotor,
		scope: 'Thrust2Weight',
		validation: useVuelidate({ $scope: 'Thrust2Weight' })
	};
};
</script>
