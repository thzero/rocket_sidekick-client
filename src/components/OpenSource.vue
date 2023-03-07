<template>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<v-toolbar
				density="compact"
			>
				<v-toolbar-title class="text-center text-h5">
					<span>{{ $t('titles.openSource') }}</span>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<VOpenSource
				v-model="openSource"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { useAppOpenSourceComponent } from '@/components/appOpenSource';

import VOpenSource from '@thzero/library_client_vue3_vuetify3/components/VOpenSource';

export default {
	name: 'OpenSource',
	components: {
		VOpenSource
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
			openSource
		} = useAppOpenSourceComponent(props, context);

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
			openSource
		};
	}
};
</script>
