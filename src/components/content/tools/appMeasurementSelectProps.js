import Constants from '@/constants';

import { useBaseControlEditProps } from '@/library_vue/components/baseControlEditProps';

export const useAppMeasurementSelectProps = {
	...useBaseControlEditProps,
	measurementUnitsId: {
		type: String,
		default: Constants.MeasurementUnits.english.id
	},
	measurementUnitsType: {
		type: String,
		default: null
	}
};
