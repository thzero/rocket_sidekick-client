<script>
import { onMounted, ref} from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketsBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		serviceStore,
		sort,
		target
	} = useContentBaseComponent(props, context, options);

	const params = ref({});
	const rockets = ref([]);

	const fetch = async () => {
		const response = await serviceStore.dispatcher.requestRockets(correlationId(), params.value);
		if (hasFailed(response))
			return [];
		return response.results;
	}

	onMounted(async () => {
		rockets.value = await fetch();
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
		serviceStore,
		sort,
		target,
		rockets
	};
};
</script>
