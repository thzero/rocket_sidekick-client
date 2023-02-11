<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import { useInfoBaseComponent } from '@/components/content/info/infoBase';

export function useInfoMarkupBaseComponent(props, context, options) {
	const routes = useRoute();

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
		// contentMarkup,
		// contentTitle,
		handleAttribution,
		hasAttribution
	} = useInfoBaseComponent(props, context, options);

	const contentId = computed(() => {
		return `info.${routes.params.id}`;
	});
	const contentMarkup = computed(() => {
		if (!content.value)
			return '';
		return content.value.markup;
	});
	const contentTitle = computed(() => {
		if (!content.value)
			return '';
		return content.value.title;
	});

	onMounted(async () => {
		const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), contentId.value);
		if (hasFailed(response))
			return;
		content.value = response.results;
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
		contentId,
		contentTitle
	};
};
</script>
