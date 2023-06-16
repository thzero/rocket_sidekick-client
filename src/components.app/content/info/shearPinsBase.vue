<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useContentLoadSignalComponent } from '@/components/content/contentLoadSignal';
import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useShearPinsBaseComponent(props, context, options) {
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
		sortByOrder,
		target,
		content,
		contentDesc,
		contentDefinition,
		contentMarkup,
		handleAttribution,
		hasAttribution
	} = useInfoBaseComponent(props, context, options);
	
	const {
		contentLoadSignal,
		contentLoadStart,
		contentLoadStop,
	} = useContentLoadSignalComponent(props, context, options);

	const contentTitle = ref(LibraryClientUtility.$trans.t('titles.content.info.shearPins') + ' ' + LibraryClientUtility.$trans.t('titles.content.info.title'));
	
	const data = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.data)
			return [];
		return content.value.supplemental.data;
	});
	const hasLinks = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.links)
			return false;
		return content.value.supplemental.links.length > 0;
	});
	const links = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.links)
			return [];
		return content.value.supplemental.links;
	});

	onMounted(async () => {
		contentLoadStart();

		try {
			const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), 'info.shearPins');
			if (hasFailed(response))
				return;
			content.value = response.results;

			contentMarkup.value = response.results.markup;
		}
		finally {
			contentLoadStop();
		}
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
		sortByOrder,
		target,
		content,
		contentDesc,
		contentDefinition,
		contentMarkup,
		contentTitle,
		handleAttribution,
		hasAttribution,
		contentLoadSignal,
		data,
		hasLinks,
		links
	};
};
</script>
