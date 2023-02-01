<template>
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-title>
<p class="text-h4 text-center">{{ modelValue }}</p>
				</v-card-title>
			</v-card>
		</v-col>
	</v-row>
</template>
		
<script>
import { useHeaderBaseComponent } from '@/components/content/headerBase';
import { useHeaderBaseProps } from '@/components/content/headerBaseProps';

export default {
	name: 'Header',
	props: {
		...useHeaderBaseProps
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
			title
		} = useHeaderBaseComponent(props, context);

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
			title
		};
	}
};
</script>

<style scoped>
</style>
