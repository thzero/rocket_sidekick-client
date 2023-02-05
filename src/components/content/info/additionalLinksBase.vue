<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useAdditionalLinksComponent(props, context, options) {
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

	const hasTitle = computed(() => {
		return !String.isNullOrEmpty(props.title)
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
		hasTitle
	};
};
</script>
