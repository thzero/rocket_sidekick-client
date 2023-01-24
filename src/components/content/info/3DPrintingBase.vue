<script>
import { computed } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useContentBaseComponent } from '@/components/content/contentBase';

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
		success
	} = useContentBaseComponent(props, context, options);

	const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	
	const content = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.info)
			return [];
		const content = temp.info.find(l => l.id === '3dprinting');
		return content;
	});
	const data = computed(() => {
		if (!content.value || !content.value.data)
			return [];
		return content.value.data;
	});
	const haveLinks = computed(() => {
		if (!content.value || !content.value.links)
			return false;
		return content.value.links.length > 0;
	});
	const links = computed(() => {
		if (!content.value || !content.value.links)
			return [];
		return content.value.links;
	});
	const temperature = (tempF, tempC) => {
		if (String.isNullOrEmpty(tempC))
			return null;
		let temp = `${tempC}&#8451;`;
		if (!String.isNullOrEmpty(tempF))
			temp += ` (${tempF})&#8457;`;
		return temp;
	}

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
		content,
		data,
		haveLinks,
		links,
		temperature
	};
};
</script>
