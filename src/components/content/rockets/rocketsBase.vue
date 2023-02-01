<script>
import { onMounted, ref} from 'vue';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useRocketBaseComponent } from '@/components/content/rockets/rocketBase';

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
		target,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine
	} = useRocketBaseComponent(props, context, options);

	const params = ref({});
	const rockets = ref([]);
	const title = ref(GlobalUtility.$trans.t('titles.rockets.title'));

	const fetch = async () => {
		const response = await serviceStore.dispatcher.requestRockets(correlationId(), params.value);
		if (hasFailed(response))
			return [];
		return response.results;
	}

	const rocketUrl = (item) => {
		return '/content/rocket/' + item.id;
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
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rockets,
		title,
		rocketUrl
	};
};
</script>
