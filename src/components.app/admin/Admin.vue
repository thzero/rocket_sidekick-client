<template>
	<v-row dense>
		<v-col cols="12">
			<v-btn
				v-if="canResetContent"
				color="blue"
				variant="flat"
				@click="handleResetContent(item)"
			>
				{{ $t('buttons.reset') }} {{ $t('titles.content.name') }}
			</v-btn>
		</v-col>
	</v-row>
	<v-snackbar
		v-model="notifySignal"
		:color="notifyColor"
		:timeout="notifyTimeout"
    >
		{{ notifyMessage }}
    </v-snackbar>
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			canResetContent,
			handleResetContent
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
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			setNotify,
			canResetContent,
			handleResetContent
		};
	}
};
</script>

<style scoped>
</style>
