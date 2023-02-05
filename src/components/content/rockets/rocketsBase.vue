<script>
import { onMounted, ref} from 'vue';

import AppConstants from "@/constants";

import LibraryClientUtility from '@thzero/library_client/utility/index';

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
	const title = ref(
		(props.type === AppConstants.RocketTypes.Yours ? LibraryClientUtility.$trans.t('titles.rockets.yours') + ' ' : '') + LibraryClientUtility.$trans.t('titles.rockets.title')
	);

	const fetch = async () => {
		let response;
		if (props.type === AppConstants.RocketTypes.Site)
			response = await serviceStore.dispatcher.requestRockets(correlationId(), params.value);
		else if (props.type === AppConstants.RocketTypes.Yours)
			response = await serviceStore.dispatcher.requestRocketsUser(correlationId(), params.value);
		
		if (hasFailed(response))
			return [];
		return response.results;
	}

	const rocketUrl = (item) => {
		if (!item)
			return null;
		if (props.type === AppConstants.RocketTypes.Site)
			return '/rocket/' + item.id;
		if (props.type === AppConstants.RocketTypes.Yours)
			return '/yours/rocket/' + item.id;
		return null;
	};

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
