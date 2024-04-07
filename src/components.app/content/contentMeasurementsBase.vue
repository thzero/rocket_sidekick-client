<script>
import { onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useContentMeasurementComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const serviceUsageMetrics = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USAGE_METRICS);

	const measurements = ref(null);
	// const params = ref({
	// 	date: new Date('2024-02-01T00:00:00.000+00:00'),
	// 	sort: [ { id: 'date' }, { id: 'value', dir: false } ]
	// });
	const params = ref({});

	onMounted(async () => {
		measurements.value = await serviceUsageMetrics.listing(correlationId(), params.value);
	});

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		measurements
	};
};
</script>
