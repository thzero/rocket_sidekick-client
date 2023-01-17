<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.markup') + ' ' + $t('titles.content.info.markup') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="pb-2">
<VMarkdown v-model="markup" :use-github=false />
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import { onMounted, ref } from 'vue';

// import LibraryConstants from '@thzero/library_client/constants';

// import GlobalUtility from '@thzero/library_client/utility/global';

import { useContentBaseComponent } from '@/components/content/contentBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
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
			success
		} = useContentBaseComponent(props, context);

		const markup = ref('');

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
			markup
		};
	}
};
</script>

<style scoped>
	.header {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		text-align: left;
		margin-bottom: 12px;
		min-height: 100px;
	}
</style>
