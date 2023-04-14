<template>
	<v-row dense>
		<v-col cols="12">
			<v-btn
				v-if="!hasDetailItem"
				color="blue"
				variant="flat"
				@click="handleContentReset(item)"
			>
				{{ $t('buttons.reset') }} {{ $t('titles.content.name') }}
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { useAdminBaseComponent } from '@/components.app/admin/adminBase';

export default {
	name: 'Admin',
	setup (props, context) {
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
			handleContentReset
		} = useAdminBaseComponent(props, context);

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
			handleContentReset
		};
	}
};
</script>

<style scoped>
</style>
