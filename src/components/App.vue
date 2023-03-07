<template>
	<router-view />
</template>

<script>
import { onMounted } from 'vue';

import { useTheme } from 'vuetify';
import { SplashScreen } from '@capacitor/splash-screen';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseAppComponent } from '@thzero/library_client_vue3/components/baseApp';

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
			success
		} = useBaseAppComponent(
			props,
			context,
			{
				initializeI: async () => {
					return [
						serviceStore.dispatcher.initialize(correlationId())
					];
				}
			}
		);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		// const initialize = async () => {
		// 	return [
		// 		serviceStore.dispatcher.initialize(correlationId())
		// 	];
		// };

		const theme = useTheme();
		const userTheme = () => {
			return !String.isNullOrEmpty(serviceStore.userTheme) ? serviceStore.userTheme : 'defaultTheme';
		};

		theme.global.name.value = userTheme;
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme.global.name.value = userTheme() + 'Dark';
		}
		// theme.global.current.dark = darkMode;

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			const themeRequested = userTheme() + (event.matches ? 'Dark' : '');
			theme.global.name.value = themeRequested;
		});

		onMounted(async () => {
			SplashScreen.hide();
		});

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
			initialize,
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

	.measurementUnits {
		width: 125px;
	}
</style>
