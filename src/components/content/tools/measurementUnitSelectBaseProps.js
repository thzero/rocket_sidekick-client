import AppConstants from '@/constants';

import { useBaseControlEditProps } from '@/library_vue/components/baseControlEditProps';

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
