<script>
import { computed, ref } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

import LibraryClientUtility from '@thzero/library_client/utility/index';

export function useContentDescriptionBaseComponent(props, context, options) {
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

	const description = ref(LibraryClientUtility.$trans.t(props.id + '.desc'));
	const descriptionAdditionalId = props.id + '.descAdditional';

	const descriptionAdditional = computed(() => {
		return descriptionAdditionalId ? LibraryClientUtility.$trans.t(descriptionAdditionalId) : null;
	});
	const hasAdditional = computed(() => {
		return descriptionAdditional.value !== descriptionAdditionalId;
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
		description,
		descriptionAdditional,
		hasAdditional
	};
};
</script>
