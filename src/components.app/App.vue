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

	.text-contrast {
		color: rgb(var(--v-theme-contrast))
	}

	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}

	.measurementUnitExtraLong {
		width: 140px;
	}
	.measurementUnitExtraExtraLong {
		width: 160px;
	}
	.measurementUnitLong {
		width: 125px;
	}
	.measurementUnitMedium {
		width: 115px;
	}
	.measurementUnitsMedium {
		width: 125px;
	}
	.router-link {
	}
	.toolbar-button {
	}
	.toolbar-title {
		text-decoration: none;
	}
	.v-expansion-panel-text__wrapper {
		padding-bottom: 0px !important;
		padding-left: 12px !important;
		padding-right: 0px !important;
	}
	.v-expansion-panel--active > .v-expansion-panel-title {
		min-height: 0px !important;
	}
</style>
