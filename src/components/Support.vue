<template>
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-title>
<p class="text-h6 text-center pb-4">{{ $t('titles.support') }}</p>
				</v-card-title>
				<v-card-text>
Forthcoming
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useBaseSupportComponent } from '@thzero/library_client_vue3/components/baseSupport';

export default {
	name: 'Support',
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
		} = useBaseSupportComponent(props, context);

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		};
	}
};
</script>

<style scoped>
</style>
