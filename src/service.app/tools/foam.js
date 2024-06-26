import AppCommonConstants from 'rocket_sidekick_common/constants';
import AppSharedConstants from '@/utility/constants';

import ToolsService from '@/service/tools/index';

class FoamToolsService extends ToolsService {
    async init(injector) {
		await super.init(injector);
		
		this._serviceCalculationEngine = injector.getService(AppSharedConstants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	foams(correlationId) {
		return this._successResponse([
			{
				manufacturer: 'FOAM-IT',
				expansion: 10,
				densityM: 0.080092317,
				densityE: 0.046296296
			},
			{
				manufacturer: 'Mac Performance',
				expansion: 15,
				densityM: 0.064073853,
				densityE: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 10,
				densityM: 0.09611078,
				densityE: 0.055555556
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 15,
				densityM: 0.064073853,
				densityE: 0.037037037
			},
			{
				manufacturer: 'Public Missiles',
				expansion: 20,
				densityM: 0.04805539,
				densityE: 0.027777778
			}
		]);
	}

	initialize() {
		return {
			bodyTubeID: null,
			finRootLength: null,
			finTabLength: null,
			finWidth: null,
			motorTubeOD: null,
			numberFins: null
		};
	}

	async initializeCalculation(correlationId, data, outputMeasurementUnitsId) {
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data, 'data', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.bodyTubeID, 'data.bodyTubeID', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.bodyTubeIDLengthMeasurementUnitId, 'data.bodyTubeIDLengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.bodyTubeIDLengthMeasurementUnitsId, 'data.bodyTubeIDLengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finRootLength, 'data.finRootLength', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finRootLengthMeasurementUnitId, 'data.finRootLengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finRootLengthMeasurementUnitsId, 'data.finRootLengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finTabLength, 'data.finTabLength', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finTabLengthMeasurementUnitId, 'data.finTabLengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finTabLengthMeasurementUnitsId, 'data.finTabLengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finWidth, 'data.finWidth', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finWidthLengthMeasurementUnitId, 'data.finWidthLengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.finWidthLengthMeasurementUnitsId, 'data.finWidthLengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.fluidMeasurementUnitId, 'data.fluidMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.fluidMeasurementUnitsId, 'data.fluidMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.lengthMeasurementUnitId, 'data.lengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.lengthMeasurementUnitsId, 'data.lengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.motorTubeOD, 'data.motorTubeOD', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.motorTubeODLengthMeasurementUnitId, 'data.motorTubeODLengthMeasurementUnitId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.motorTubeODLengthMeasurementUnitsId, 'data.motorTubeODLengthMeasurementUnitsId', correlationId);
		this._enforceNotNull('FoamToolsService', 'initializeCalculation', data.numberFins, 'data.numberFins', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'initializeCalculation', outputMeasurementUnitsId, 'outputMeasurementUnitsId', correlationId);

		const bodyTubeIDLengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.bodyTubeIDLengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.bodyTubeIDLengthMeasurementUnitId);
		let response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', bodyTubeIDLengthMeasurementUnit, 'bodyTubeIDLengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const finRootLengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.finRootLengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.finRootLengthMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', finRootLengthMeasurementUnit, 'finRootLengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const finTabLengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.finTabLengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.finTabLengthMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', finTabLengthMeasurementUnit, 'finTabLengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const finWidthLengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.finWidthLengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.finWidthLengthMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', finWidthLengthMeasurementUnit, 'finWidthLengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const fluidMeasurementUnit = this._measurementUnitFromId(correlationId, data.fluidMeasurementUnitsId, AppCommonConstants.MeasurementUnits.fluid.id, data.fluidMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', fluidMeasurementUnit, 'fluidMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const lengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.lengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.lengthMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', lengthMeasurementUnit, 'lengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const motorTubeODLengthMeasurementUnit = this._measurementUnitFromId(correlationId, data.motorTubeODLengthMeasurementUnitsId, AppCommonConstants.MeasurementUnits.length.id, data.motorTubeODLengthMeasurementUnitId);
		response = this._enforceNotNullResponse('FoamToolsService', 'initializeCalculation', motorTubeODLengthMeasurementUnit, 'motorTubeODLengthMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'bodyTubeID',
				value: data.bodyTubeID,
				units: {
					from: bodyTubeIDLengthMeasurementUnit,
					to: AppCommonConstants.MeasurementUnits.metrics.length.m
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'finRootLength',
				value: data.finRootLength,
				units: {
					from: finRootLengthMeasurementUnit,
					to: AppCommonConstants.MeasurementUnits.metrics.length.m
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'finTabLength',
				value: data.finTabLength,
				units: {
					from: finTabLengthMeasurementUnit,
					to: AppCommonConstants.MeasurementUnits.metrics.length.m
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'finWidth',
				value: data.finWidth,
				units: {
					from: finWidthLengthMeasurementUnit,
					to: AppCommonConstants.MeasurementUnits.metrics.length.m
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'motorTubeOD',
				value: data.motorTubeOD,
				units: {
					from: motorTubeODLengthMeasurementUnit,
					to: AppCommonConstants.MeasurementUnits.metrics.length.m
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeBodyTube',
				evaluate: 'pi * ((bodyTubeID / 2) ^ 2) * finRootLength'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeMotorTube',
				evaluate: 'pi * ((motorTubeOD / 2) ^ 2) * finRootLength'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeDifferenceBetweenBodyTube',
				evaluate: 'volumeBodyTube - volumeMotorTube'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeFins',
				evaluate: '(finTabLength ? finTabLength : finRootLength) * finWidth * (bodyTubeID - motorTubeOD)'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'volumeDifferenceWithoutFins',
				evaluate: 'volumeDifferenceBetweenBodyTube - volumeFins'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'totalVolume',
				evaluate: 'volumeBodyTube - volumeMotorTube - volumeFins',
				result: true,
				format: this._serviceCalculationEngine.formatFixed(),
				unit: fluidMeasurementUnit
			}
		];

		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}

	async initializeCalculationFoam(correlationId, data, outputMeasurementUnitsId) {
		this._enforceNotNull('FoamToolsService', 'initializeCalculationFoam', data, 'data', correlationId);
		this._enforceNotEmpty('FoamToolsService', 'initializeCalculationFoam', outputMeasurementUnitsId, 'outputMeasurementUnitsId', correlationId);

		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				data: {
					manufacturer: data.manufacturer,
					expansion: data.expansion
				},
				result: true
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'totalVolume',
				evaluate: data.totalVolume,
				unit: AppCommonConstants.MeasurementUnits.metrics.fluid.ml
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'density',
				value: data.densityM,
				unit: 'g/ml'
				// result: true,
				// format: this._serviceCalculationEngine.formatFixed()
			},
			// {
			// 	type: this._serviceCalculationEngine.symTypeSet,
			// 	var: 'densityE',
			// 	value: data.densityE,
			// 	unit: 'oz/in^3',
			// 	result: true,
			// 	format: this._serviceCalculationEngine.formatFixed()
			// },
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'foamWeight',
				evaluate: 'density * totalVolume',
				unit: AppCommonConstants.MeasurementUnits[outputMeasurementUnitsId].weight.default,
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'requiredAmount',
				evaluate: 'totalVolume / expansion',
				result: true,
				unit: AppCommonConstants.MeasurementUnits[outputMeasurementUnitsId].fluid.default,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'densityMD',
				value: data.densityM,
				unit: 'g/ml',
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'densityED',
				value: data.densityE,
				unit: 'oz/in^3',
				result: true,
				format: this._serviceCalculationEngine.formatFixed()
			}
		];

		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}
}

export default FoamToolsService;
