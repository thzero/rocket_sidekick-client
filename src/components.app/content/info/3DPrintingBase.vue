<script>
import { computed, onMounted, ref } from 'vue';

import AppSharedConstants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useContentLoadSignalComponent } from '@/components/content/contentLoadSignal';
import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function use3DPrintingBaseComponent(props, context, options) {
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

	const contentChartDesc = ref(null);
	const contentTitle = ref(LibraryClientUtility.$trans.t('titles.content.info.3dprinting') + ' ' + LibraryClientUtility.$trans.t('titles.content.info.title'));

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
	const linksCollections = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'collections');
	});
	const linksGeneral = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => String.isNullOrEmpty(l.category));
	});
	const linksModeling = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'modeling');
	});
	const linksTools = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'tools');
	});
	const slides = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.slides)
			return [];
		return content.value.supplemental.slides;
	});

	const slideUrl = (url) => {
		return AppSharedConstants.External.imnages + url;
	};
	const temperature = (tempF, tempC) => {
		if (String.isNullOrEmpty(tempC))
			return null;
		let temp = `${tempC}&#8451;`;
		if (!String.isNullOrEmpty(tempF))
			temp += ` (${tempF})&#8457;`;
		return temp;
	};

	onMounted(async () => {
		contentLoadStart();

		try {
			const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), 'info.3dprinting');
			if (hasFailed(response))
				return;
			content.value = response.results;

			contentChartDesc.value = response.results.descriptionChart;
			contentDesc.value = response.results.description;
			contentDefinition.value = response.results.definition;
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
		contentChartDesc,
		data,
		hasLinks,
		links,
		linksCollections,
		linksGeneral,
		linksModeling,
		linksTools,
		slides,
		slideUrl,
		temperature
	};
};
</script>
