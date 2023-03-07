<script>
import { computed, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export function useContentHeaderBaseComponent(props, context, options) {
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
		target
	} = useContentBaseComponent(props, context, options);

	const dialogHelpSignal = ref(new DialogSupport());

	const hasHelp = computed(() => {
		return !String.isNullOrEmpty(helpMarkup.value) || !String.isNullOrEmpty(helpMarkupId.value);
	});
	const helpMarkup = computed(() => {
		if (!String.isNullOrEmpty(props.helpMarkupId))
			return LibraryClientUtility.$trans.t(props.helpMarkupId);
		return props.helpMarkup;
	});
	const helpMarkupId = computed(() => {
		return props.helpMarkupId;
	});

	const handleHelp = async () => {
		dialogHelpSignal.value.open(correlationId());
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
		serviceStore,
		sortByOrder,
		target,
		dialogHelpSignal,
		handleHelp,
		helpMarkup,
		hasHelp
	};
};
</script>
