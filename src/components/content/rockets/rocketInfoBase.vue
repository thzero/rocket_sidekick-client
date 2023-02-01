<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref} from 'vue';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useRocketBaseComponent } from '@/components/content/rockets/rocketBase';

export function useRocketInfoBaseComponent(props, context, options) {
	const routes = useRoute();

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

	const rocket = ref([]);
	const title = ref(GlobalUtility.$trans.t('titles.rockets.title'));

	const rocketId = computed(() => {
		return routes.params.id;
	});

	const albums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return [];
		return rocket.value.albums;
	});
	const hasAlbums = computed(() => {
		if (!rocket.value || !rocket.value.albums)
			return false;
		return rocket.value.albums.length > 0;
	});
	const hasLaunches = computed(() => {
		if (!rocket.value || !rocket.value.logs)
			return false;
		return rocket.value.logs.length > 0;
	});
	const hasAlbumsOrVideos= computed(() => {
		return hasAlbums.value || hasVideos.value;
	});
	const hasVideos = computed(() => {
		if (!rocket.value || !rocket.value.videos)
			return false;
		return rocket.value.videos.length > 0;
	});
	const fetch = async () => {
		const response = await serviceStore.dispatcher.requestRocketsById(correlationId(), rocketId.value);
		if (hasFailed(response))
			return [];
		return response.results;
	};
	const measurementUnitTranslate = (measurementUnitId, measurementUnit, measurementUnitType) => {
		if (String.isNullOrEmpty(measurementUnitId) || String.isNullOrEmpty(measurementUnit))
			return '';
		return GlobalUtility.$trans.t('measurementUnits.' + measurementUnitId + '.' + measurementUnitType + '.' + measurementUnit + 'Abbr');
	};
	const measurementUnitTranslateLength = (measurementUnitId, measurementUnit) => {
		return measurementUnitTranslate(measurementUnitId, measurementUnit, Constants.MeasurementUnits.length.id);
	};
	const measurementUnitTranslateWeight = (measurementUnitId, measurementUnit) => {
		return measurementUnitTranslate(measurementUnitId, measurementUnit, Constants.MeasurementUnits.weight.id);
	};
	const videos = computed(() => {
		if (!rocket.value || !rocket.value.videos)
			return [];
		return rocket.value.videos;
	});

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
		albums,
		hasAlbums,
		hasAlbumsOrVideos,
		hasLaunches,
		hasVideos,
		hasCoverUrl,
		rocketTypeIcon,
		rocketTypeIconDetermine,
		rocket,
		title,
		rocketId,
		measurementUnitTranslate,
		measurementUnitTranslateLength,
		measurementUnitTranslateWeight,
		videos
	};
};
</script>
