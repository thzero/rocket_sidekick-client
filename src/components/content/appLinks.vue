<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useAppLinksComponent(props, context, options) {
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

	const links = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.links)
			return [];
		return temp.links.filter(l => l.enabled);
	});
	const linksBooks = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'book');
	});
	const linksCompetitions = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'competition');
	});
	const linksEvents = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'event');
	});
	const linksForums = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'forum');
	});
	const linksGeneral = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => String.isNullOrEmpty(l.category));
	});
	const linksGuidance = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'guidance');
	});
	const linksManufacturers = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'manufacturer');
	});
	const linksOrganizations = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'organization');
	});
	const linksVendors = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'vendor');
	});
	
	const target = (item) => {
		return !item.local ? 'blank' : '';
	};

	const sort = (links) => {
		links.sort((a, b) => a.order >= b.order);
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
		links,
		linksBooks,
		linksCompetitions,
		linksEvents,
		linksForums,
		linksGeneral,
		linksGuidance,
		linksManufacturers,
		linksOrganizations,
		linksVendors,
		sort,
		target
	};
};
</script>
