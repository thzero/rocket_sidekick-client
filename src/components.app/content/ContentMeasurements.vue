<template>
	<v-row>
		<v-col cols="12">
			<pre>{{ measurements }}</pre>
		</v-col>
	</v-row>
</template>

<script>
import { useContentMeasurementComponent } from '@/components.app/content/contentMeasurementsBase';

export default {
	name: 'ContentsMeasurementComponent',
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
			measurements
		} = useContentMeasurementComponent(props, context);

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
			measurements
		};
	}
};
</script>

<style scoped>
</style>
