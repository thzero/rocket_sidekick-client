<script>
import { onMounted, ref} from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useRocketBaseComponent(props, context, options) {
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

	const id = ref({});
	const rocket = ref([]);

	const fetch = async () => {
		return await serviceStore.dispatcher.requestRocketsById(correlationId(), id.value);
	}

	onMounted(async () => {
		rocket.value = await fetch();
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
		id,
		rocket
	};
};
</script>
