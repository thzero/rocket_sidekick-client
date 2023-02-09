import AppConstants from '@/constants';

import ToolsService from '@/service/tools/index';

class ParachuteSizingToolsService extends ToolsService {
	constructor() {
		super();
	}

    init(injector) {
		this._serviceCalculationEngine = injector.getService(AppConstants.InjectorKeys.SERVICE_TOOLS_CALCULATION_ENGINE);
    }

	initialize() {
		return {
			airDensityMeasurementUnitId: null,
			airDensityMeasurementUnitsId: null,
			coeffDrag: null,
			airDensity: null,
			desiredVelocity: null,
			desiredVelocityMeasurementUnitId: null,
			desiredVelocityMeasurementUnitsId: null
		};
	}

	async initializeCalculation(correlationId, data, outputMeasurementUnitsId) {
		this._enforceNotNull('ParachuteSizingToolsService', 'initializeCalculation', data, 'data', correlationId);
		this._enforceNotEmpty('ParachuteSizingToolsService', 'initializeCalculation', outputMeasurementUnitsId, 'outputMeasurementUnitsId', correlationId);

		const airDensityMeasurementUnit = this._measurementUnitFromId(correlationId, data.airDensityMeasurementUnitsId, AppConstants.MeasurementUnits.density.id, data.airDensityMeasurementUnitId);
		let response = this._enforceNotNullResponse('ParachuteSizingToolsService', 'initializeCalculation', airDensityMeasurementUnit, 'airDensityMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		const desiredVelocityMeasurementUnit = this._measurementUnitFromId(correlationId, data.desiredVelocityMeasurementUnitsId, AppConstants.MeasurementUnits.velocity.id, data.desiredVelocityMeasurementUnitId);
		response = this._enforceNotNullResponse('ParachuteSizingToolsService', 'initializeCalculation', desiredVelocityMeasurementUnit, 'desiredVelocityMeasurementUnit', correlationId);
		if (this._hasFailed(response))
			return response;
		
		const calculationSteps = [
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'coeffDrag',
				value: data.coeffDrag
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'airDensity',
				value: data.airDensity,
				units: {
					from: airDensityMeasurementUnit,
					to: AppConstants.MeasurementUnits.metrics.density.km3
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeSet,
				var: 'desiredVelocity',
				value: data.desiredVelocity,
				units: {
					from: desiredVelocityMeasurementUnit,
					to: AppConstants.MeasurementUnits.metrics.velocity.ms
				}
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'numerator',
				evaluate: '8 * mass * 9.8 m/^2'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'denominator',
				evaluate: 'pi * coeffDrag * airDensity'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'temp',
				evaluate: 'sqrt numerator / denominator'
			},
			{
				type: this._serviceCalculationEngine.symTypeEvaluate,
				var: 'angleDegrees',
				evaluate: 'temp',
				result: true,
				format: this._serviceCalculationEngine.formatFixed(),
				unit: AppConstants.MeasurementUnits[outputMeasurementUnitsId].length.default
			}
		];
		
		return this._successResponse({
			steps: calculationSteps,
			instance: this._serviceCalculationEngine.initialize(correlationId)
		}, correlationId);
	}
}

export default ParachuteSizingToolsService;
