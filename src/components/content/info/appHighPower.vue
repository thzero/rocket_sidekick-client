<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useAppHighPowerComponent(props, context, options) {
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
		serviceStore
	} = useContentBaseComponent(props, context, options);

	const highPower = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return {};
		if (!temp.info)
			return {};
		return temp.info.find(l => l.id === 'highPower');
	});
	const highPowerLinks = computed(() => {
		if (!highPower.value)
			return [];
		if (!highPower.value.links)
			return [];
		return highPower.value.links.filter(l => l.enabled);
	});
	const links = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.links)
			return [];
		return temp.links;
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

	const sort = (links) => {
		links.sort((a, b) => a.order >= b.order);
	};
	
	const target = (item) => {
		return !item.local ? 'blank' : '';
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
		highPower,
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
		sort,
		target
	};
};
</script>
