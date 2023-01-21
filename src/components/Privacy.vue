<template>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-toolbar
				density="compact"
			>
				<v-toolbar-title class="text-center text-h5">
					<span>{{ $t('titles.privacy') }}</span>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-card>
				<v-card-text>
<div class="mt-4">
	<p>
<VMarkdown v-model="privacyMarkup" :use-github=false />
	</p>
</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';

import { useBasePrivacyComponent } from '@/library_vue/components/basePrivacy';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';
import GlobalUtility from '@thzero/library_client/utility/global';

export default {
	name: 'Support',
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
		} = useBasePrivacyComponent(props, context);

		const privacyMarkup = ref(GlobalUtility.$trans.t('strings.privacy.text1'));

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
			privacyMarkup
		};
	}
};
</script>

<style scoped>
</style>

<style>
	.markdown h1 {
		text-align: left;
		margin-bottom: 24px;
		text-align: center;
	}
	.markdown h2 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown h3 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown p {
		text-align: left;
		margin-bottom: 24px;
	}
</style>
