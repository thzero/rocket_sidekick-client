import { between, decimal, integer, maxLength, minLength, required } from '@vuelidate/validators';

export const useFlightPathValidation = {
	flightDataDate: { $autoDirty: true },
	flightDataLocation: { $autoDirty: true },
	flightDataTitle: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(50),
		$autoDirty: true
	},
	flightPathFilterSpeed: {
		required,
		decimal,
		between: between(0, 5000),
		$autoDirty: true
	},
	flightPathInput: { required, $autoDirty: true },
	flightMeasurementUnitsId: { required, $autoDirty: true },
	flightMeasurementUnitsAltitudeId: { required, $autoDirty: true },
	// flightMeasurementUnitsDistanceId: { required, $autoDirty: true },
	flightMeasurementUnitsVelocityId: { required, $autoDirty: true },
	flightMeasurementUnitsOutputId: { required, $autoDirty: true },
	flightMeasurementUnitsAltitudeOutputId: { required, $autoDirty: true },
	// flightMeasurementUnitsDistanceOutputId: { required, $autoDirty: true },
	flightMeasurementUnitsVelocityOutputId: { required, $autoDirty: true },
	flightProcessor: { required, $autoDirty: true },
	exportTemplateId: { required, $autoDirty: true },
	exportAltitudeReference: { required, $autoDirty: true },
	exportWaypointAltitudeReference: { required, $autoDirty: true },
	exportMissionName: { maxLength: maxLength(50), $autoDirty: true },
	exportPathStride: {
		required,
		integer,
		between: between(1, 1000),
		$autoDirty: true
	},
	exportLaunchAltitude: { decimal, $autoDirty: true }
};
