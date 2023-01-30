<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.rockets.title') }}</p>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<v-card
					v-for="item in rockets"
					:key="item.name"
				>
					<v-card-title>
	<p class="text-h6 text-center">{{ item.name }}</p>
					</v-card-title>
					<v-card-text>
<VMarkdown v-model="item.description" :use-github=false />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useRocketBaseComponent } from '@/components/content/rockets/rocketsBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'Rockets',
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
			success,
			serviceStore,
			sort,
			target,
			id,
			rocket
		} = useRocketBaseComponent(props, context);

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
			sort,
			target,
			id,
			rocket
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
