<script>
import { computed, onMounted, ref } from 'vue';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useContentBaseComponent } from '@/components/content/contentBase';

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
	} = useContentBaseComponent(props, context, options);

	const content = ref(null);
	const textChartDesc = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.chartDesc'));
	const textDesc = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.desc'));
	const textNMarkup = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.guidance1'));
	const textNMarkup2 = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.guidance2'));
	const textGuidance3 = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.guidance3'));
	
	const data = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.data)
			return [];
		return content.value.supplemental.data;
	});
	const haveLinks = computed(() => {
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

		textChartDesc.value = response.results.descriptionChart;
		textDesc.value = response.results.description;
		textNMarkup.value = response.results.markup;
		textNMarkup2.value = response.results.markup2;
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
		textChartDesc,
		textDesc,
		textNMarkup,
		textNMarkup2,
		textGuidance3,
		content,
		data,
		haveLinks,
		links,
		temperature
	};
};
</script>
