<template>
	<v-row dense>
		<v-col cols="12" class="pb-2">
			<v-card>
				<v-card-text>
			<span>{{ description }}</span>
			<span
				v-if="hasAdditional"
			>
				{{ descriptionAdditional }}
			</span>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>
		
<script>
import { useContentDescriptionBaseComponent } from '@/components/content/descriptionBase';
import { useContentDescriptionBaseProps } from '@/components/content/descriptionBaseProps';

export default {
	name: 'ContentDescription',
	props: {
		...useContentDescriptionBaseProps
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
			description,
			descriptionAdditional,
			hasAdditional
		} = useContentDescriptionBaseComponent(props, context);

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
	}
};
</script>

<style scoped>
</style>
