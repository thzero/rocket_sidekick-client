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
<div class="text-h4 text-center">{{ modelValue }}</div>
				</v-card-title>
			</v-card>
		</v-col>
	</v-row>
</template>
		
<script>
import { useContentHeaderBaseComponent } from '@/components/content/headerBase';
import { useContentHeaderBaseProps } from '@/components/content/headerBaseProps';

export default {
	name: 'ContentHeader',
	props: {
		...useContentHeaderBaseProps
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
			title
		};
	}
};
</script>

<style scoped>
</style>
