<script>
import { computed, onMounted, ref} from 'vue';

import Constants from '@/common/constants';

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

	const fetch = async () => {
		const response = await serviceStore.dispatcher.requestRocketsById(correlationId(), rocketId.value);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const hasCoverUrl = (item) => {
		if (!item)
			return null;
		return !String.isNullOrEmpty(item.coverUrl);
	};
	const rocketTypeIcon = (item) => {
		const icon = rocketTypeIconDetermine(item);
		if (!icon)
			return null;
		return '/icons/' + icon;
	};
	const rocketTypeIconDetermine = (item) => {
		if (!item)
			return null;
		if (item.typeId === Constants.RocketTypes.highone)
			return 'rocket_level1.png';
		if (item.typeId === Constants.RocketTypes.hightwo)
			return 'rocket_level2.png';
		if (item.typeId === Constants.RocketTypes.highthree)
			return 'rocket_level3.png';
		if (item.typeId === Constants.RocketTypes.low)
			return 'rocket_low.png';
		if (item.typeId === Constants.RocketTypes.mid)
			return 'rocket_mid.png';
		return null;
	};

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
		rocketTypeIconDetermine
	};
};
</script>
