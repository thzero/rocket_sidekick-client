import { between, decimal, maxLength, minLength, required } from '@vuelidate/validators';

export const useFlightPathValidation = { 
	flightDataDate: { $autoDirty: true },
	flightDataLocation: { $autoDirty: true },
	flightDataTitle: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	flightPathInput: { required, $autoDirty: true },
	flightMeasurementUnitsId: { required, $autoDirty: true },
	flightMeasurementUnitsAltitudeId: { required, $autoDirty: true },
	flightMeasurementUnitsDistanceId: { required, $autoDirty: true },
	flightMeasurementUnitsVelocityId: { required, $autoDirty: true },
	flightMeasurementUnitsOutputId: { required, $autoDirty: true },
	flightMeasurementUnitsAltitudeOutputId: { required, $autoDirty: true },
	flightMeasurementUnitsDistanceOutputId: { required, $autoDirty: true },
	flightMeasurementUnitsVelocityOutputId: { required, $autoDirty: true },
	flightProcessor: { required, $autoDirty: true },
	flightPathStylePinLaunchColor: { required, $autoDirty: true },
	flightPathStylePinLaunchSelected: { required, $autoDirty: true },
	flightPathStylePinMaxAltitudeColor: { required, $autoDirty: true },
	flightPathStylePinMaxAltitudeSelected: { required, $autoDirty: true },
	flightPathStylePinMaxVelocityColor: { required, $autoDirty: true },
	flightPathStylePinMaxVelocitySelected: { required, $autoDirty: true },
	flightPathStylePinTouchdownColor: { required, $autoDirty: true },
	flightPathStylePinTouchdownSelected: { required, $autoDirty: true }
};
