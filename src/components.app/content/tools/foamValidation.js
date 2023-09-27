import { between, decimal, integer, helpers, required } from '@vuelidate/validators';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

const finTabFinRoot = (value, siblings, vm) => {
	value = AppUtility.convertNumber(value);
	if (siblings.finRootLength && (value > AppUtility.convertNumber(siblings.finRootLength)))
		return false;
	return true;
}

const finWidth = (value, siblings, vm) => {
	value = AppUtility.convertNumber(value);
	if (!siblings.motorTubeOD)
		return true;
	const motorTubeOD = AppUtility.convertNumber(siblings.motorTubeOD);
	const delta = value / motorTubeOD;
	if (delta > 0.5)
		return false;
	return true;
}

const motorTubeBodyTube = (value, siblings, vm) => {
	value = AppUtility.convertNumber(value);
	if (siblings.bodyTubeID && (value >= AppUtility.convertNumber(siblings.bodyTubeID)))
		return false;
	return true;
}

export const useFoamValidation = {
	bodyTubeID: { required, decimal, between: between(0, 9999), $autoDirty: true },
	bodyTubeIDLengthMeasurementUnitId: { $autoDirty: true },
	bodyTubeIDLengthMeasurementUnitsId: { required, $autoDirty: true },
	finRootLength: { required, decimal, between: between(0, 9999), $autoDirty: true },
	finRootLengthMeasurementUnitId: { $autoDirty: true },
	finRootLengthMeasurementUnitsId: { required, $autoDirty: true },
	finTabLength: {
		decimal, between: between(0, 999999),
		finTabFinRoot: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.finTabFinRoot'), finTabFinRoot),
		$autoDirty: true
	},
	finTabLengthMeasurementUnitId: { $autoDirty: true },
	finTabLengthMeasurementUnitsId: { required, $autoDirty: true },
	finWidth: {
		required, decimal, between: between(0, 999999),
		motorTfinWidthubeBodyTube: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.finWidth'), finWidth),
		$autoDirty: true
	},
	finWidthLengthMeasurementUnitId: { $autoDirty: true },
	finWidthLengthMeasurementUnitsId: { required, $autoDirty: true },
	fluidMeasurementUnitId: { $autoDirty: true },
	fluidMeasurementUnitsId: { required, $autoDirty: true },
	lengthMeasurementUnitId: { $autoDirty: true },
	lengthMeasurementUnitsId: { required, $autoDirty: true },
	motorTubeOD: {
		required, decimal, between: between(0, 9999),
		motorTubeBodyTube: helpers.withMessage(LibraryClientUtility.$trans.t('errors.content.tools.foam.motorTubeBodyTube'), motorTubeBodyTube),
		$autoDirty: true
	},
	motorTubeODLengthMeasurementUnitId: { $autoDirty: true },
	motorTubeODLengthMeasurementUnitsId: { required, $autoDirty: true },
	numberFins: { required, integer, between: between(0, 999999), $autoDirty: true }
};