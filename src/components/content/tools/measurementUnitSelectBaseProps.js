import AppConstants from '@/constants';

import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export const useMeasurementUnitSelectBaseProps = {
	...useBaseControlEditProps,
	measurementUnitsId: {
		type: String,
		default: AppConstants.MeasurementUnits.english.id
	},
	measurementUnitsType: {
		type: String,
		default: null
	}
};
