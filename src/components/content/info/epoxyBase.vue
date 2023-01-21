<script>
import { onMounted, ref } from 'vue';

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
	
	const data = ref(null);
	const links = ref(null);

	onMounted(async () => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.info)
			return [];
		const content = temp.info.find(l => l.id === 'epoxy');
		data.value = content ? content.data : [];
		links.value = content ? content.links : [];
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
		data,
		links
	};
};
</script>
