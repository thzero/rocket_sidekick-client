<template>
	<div>
		<ContentHeader v-model="contentTitle" />
		<v-row dense>
			<v-col cols="12" class="pb-2">
				<v-card>
					<v-card-text>
<VMarkdown v-model="contentMarkup" :use-github=false />
<Attribution v-model="content" @has-attribution="handleAttribution" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useInfoMarkupBaseComponent } from '@/components/content/info/infoMarkupBase';

import Attribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
		Attribution,
		ContentHeader,
		VMarkdown
	},
	setup(props, context) {
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
			handleAttribution,
			hasAttribution,
			contentId,
			contentTitle
		} = useInfoMarkupBaseComponent(props, context);

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
			handleAttribution,
			hasAttribution,
			contentId,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
