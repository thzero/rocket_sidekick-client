<script>
import { computed, onMounted, ref } from 'vue';

import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useHighPowerBaseComponent(props, context, options) {
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
	const title = ref(GlobalUtility.$trans.t('titles.content.info.highPower'));

	const highPowerLinks = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.links)
			return [];
		return content.value.supplemental.links.filter(l => l.enabled);
	});
	const links = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.links)
			return [];
		return temp.links.filter(l => l.enabled);
	});
	const linksBooks = computed(() => {
		if (!highPowerLinks.value)
			return [];
		return highPowerLinks.value.filter(l => l.category === 'guidance');
	});
	const linksConstruction = computed(() => {
		if (!highPowerLinks.value)
			return [];
		return highPowerLinks.value.filter(l => l.category === 'construction');
	});
	const linksEvents = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'event' && l.highPower);
	});
	const linksForums = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'forum' && l.highPower);
	});
	const linksGuidance = computed(() => {
		if (!highPowerLinks.value)
			return [];
		return highPowerLinks.value.filter(l => l.category === 'guidance');
	});
	const linksManufacturers = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'manufacturer' && l.highPower);
	});
	const linksOrganizations = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'organization' && l.highPower);
	});
	const linksStudyGuides = computed(() => {
		if (!highPowerLinks.value)
			return [];
		return highPowerLinks.value.filter(l => l.category === 'study');
	});
	const linksTools = computed(() => {
		if (!highPowerLinks.value)
			return [];
		return highPowerLinks.value.filter(l => l.category === 'tools');
	});
	const linksVendors = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'vendor' && l.highPower);
	});
	const linksVideos = computed(() => {
		const output = [];
		if (highPowerLinks.value)
			output.push(...(highPowerLinks.value.filter(l => l.category === 'video')));
		if (links.value)
			output.push(...(links.value.filter(l => l.category === 'video' && l.highPower)));
		const temp = Intl.Collator();
		return output.sort((a, b) => temp.compare(a.title, b.title));
	});
	const slides = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.slides)
			return [];
		return content.value.supplemental.slides;
	});

	const slideUrl = (url) => {
		return Constants.External.imnages + url;
	};

	onMounted(async () => {
		const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), 'info.highPower');
		if (hasFailed(response))
			return;
		content.value = response.results;

		contentChartDesc.value = response.results.descriptionChart;
		contentDefinition.value = response.results.definition;
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
		title,
		highPowerLinks,
		links,
		linksBooks,
		linksConstruction,
		linksEvents,
		linksForums,
		linksGuidance,
		linksManufacturers,
		linksOrganizations,
		linksStudyGuides,
		linksTools,
		linksVendors,
		linksVideos,
		slides,
		slideUrl
	};
};
</script>
