<template>
	<router-view />
</template>

<script>
import { useAppComponent } from '@/components/app';

export default {
	name: 'App',
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
			serviceStore
		} = useAppComponent();

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
			serviceStore
		};
	}
};
</script>

<style scoped>
</style>

<style>
	/* .bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: black;
			background: url( '/images/background.png') no-repeat center center;
			background-attachment: fixed;
	} */

	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}

	.measurementUnitExtraLong {
		width: 120px;
	}
	.measurementUnitLong {
		width: 105px;
	}
	.measurementUnitMedium {
		width: 100px;
	}
	.measurementUnitsMedium {
		width: 125px;
	}
</style>
