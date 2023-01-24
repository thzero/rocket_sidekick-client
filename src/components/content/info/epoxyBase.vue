<script>
import { computed, ref } from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

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
		success
	} = useContentBaseComponent(props, context, options);

	const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

	const textChartDesc = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.chartDesc'));
	const textDesc = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.desc'));
	const textGuidance1 = ref(GlobalUtility.$trans.t('strings.content.info.epoxy.guidance1'));
	
	const content = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.info)
			return [];
		const content = temp.info.find(l => l.id === 'epoxy');
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
		if (String.isNullOrEmpty(tempF))
			return null;
		let temp = `${tempF}&#8457;`;
		if (!String.isNullOrEmpty(tempC))
			temp += ` (${tempC}&#8451;)`;
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
		textChartDesc,
		textDesc,
		textGuidance1,
		content,
		data,
		haveLinks,
		links,
		temperature
	};
};
</script>
