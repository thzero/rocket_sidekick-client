<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				<v-card>
					<v-card-title class="text-center text-h5 pb-2">
						{{ contentTitle }}
					</v-card-title>
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

import Attribution from '@/components/content/info/Attribution';
import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
		Attribution,
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
