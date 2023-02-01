<script>
import { computed, onMounted, ref } from 'vue';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useEpoxyBaseComponent(props, context, options) {
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
		contentTitle,
		handleAttribution,
		hasAttribution
	} = useInfoBaseComponent(props, context, options);

	const contentChartDesc = ref(null);
	const contentMarkup2 = ref(null);
	const title = ref(GlobalUtility.$trans.t('titles.content.info.epoxy') + ' ' + GlobalUtility.$trans.t('titles.content.info.title'));
	
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
	const temperature = (tempF, tempC) => {
		if (String.isNullOrEmpty(tempF))
			return null;
		let temp = `${tempF}&#8457;`;
		if (!String.isNullOrEmpty(tempC))
			temp += ` (${tempC}&#8451;)`;
		return temp;
	};

	onMounted(async () => {
		const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), 'info.epoxy');
		if (hasFailed(response))
			return;
		content.value = response.results;

		contentChartDesc.value = response.results.descriptionChart;
		contentDesc.value = response.results.description;
		contentMarkup.value = response.results.markup;
		contentMarkup2.value = response.results.markup2;
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
		contentChartDesc,
		contentMarkup2,
		data,
		hasLinks,
		links,
		temperature,
		title
	};
};
</script>
