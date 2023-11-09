import { between, decimal, helpers , maxLength, minLength, required, requiredUnless } from '@vuelidate/validators';

export function useFlightInfoValidation(flightInfoDataTypeFiltered, flightInfoDataTypeActual) { 
	return {
		flightDataDate: { $autoDirty: true },
		flightDataLocation: { $autoDirty: true },
		flightDataTitle: {
			required,
			characters: helpers.withMessage('Invalid characters', helpers.regex(/^[a-zA-Z0-9]+(['"._\-a-zA-Z0-9 :;,\(\\+)@]*)*$/)),
			minLength: minLength(3),
			maxLength: maxLength(50),
			$autoDirty: true
		},
		flightInfoInput: { required, $autoDirty: true },
		flightInfoDataTypeActual: { requiredIfFiltered: requiredUnless(flightInfoDataTypeFiltered), $autoDirty: true },
		flightInfoDataTypeFiltered: { requiredIfActual: requiredUnless(flightInfoDataTypeActual), $autoDirty: true },
		flightInfoDataTypeUse: { required, $autoDirty: true },
		flightMeasurementUnitsId: { required, $autoDirty: true },
		flightMeasurementUnitsAccelerationId: { required, $autoDirty: true },
		flightMeasurementUnitsDistanceId: { required, $autoDirty: true },
		flightMeasurementUnitsVelocityId: { required, $autoDirty: true },
		flightMeasurementUnitsOutputId: { required, $autoDirty: true },
		flightMeasurementUnitsAccelerationOutputId: { required, $autoDirty: true },
		flightMeasurementUnitsDistanceOutputId: { required, $autoDirty: true },
		flightMeasurementUnitsVelocityOutputId: { required, $autoDirty: true },
		flightProcessor: { required, $autoDirty: true }
	};
}
