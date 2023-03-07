<template>
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-title>
				<!-- <div style="float: left;">
<slot name="before" />
					</div>
					<div style="float: right;">
<slot name="after" />
					</div> -->
<div class="text-h4 text-center">
	{{ modelValue }}
	<span
		v-if="hasHelp"
		style="float: right;"
	>
		<v-btn
			icon="mdi-help-circle-outline"
			color="info"
			@click="handleHelp"
		/>
	</span>
</div>
				</v-card-title>
			</v-card>
		</v-col>
	</v-row>
	<VDisplayDialog
		:signal="dialogHelpSignal.signal"
	>
		<!--eslint-disable vue/no-v-html -->
		<div
			class="markdown-body"
			style="vertical-align: top;"
			v-html="helpMarkup"
		/>
		<!--eslint-enable-->
	</VDisplayDialog>
</template>

<script>
import { useContentHeaderBaseComponent } from '@/components/content/headerBase';
import { useContentHeaderBaseProps } from '@/components/content/headerBaseProps';

import VDisplayDialog from '@thzero/library_client_vue3_vuetify3/components/VDisplayDialog';

export default {
	name: 'ContentHeader',
	props: {
		...useContentHeaderBaseProps
	},
	components: {
		VDisplayDialog
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
			dialogHelpSignal,
			handleHelp,
			helpMarkup,
			hasHelp
		} = useContentHeaderBaseComponent(props, context);

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
	}
};
</script>

<style scoped>
</style>
