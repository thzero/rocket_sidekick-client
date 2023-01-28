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
		<v-list density="compact">
			<v-list-item
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useRocketsBaseComponent } from '@/components/content/rockets/rocketsBase';

export default {
	name: 'Rockets',
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
			rockets
		} = useRocketsBaseComponent(props, context);

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
			rockets
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
