<template>
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-title>
<p class="text-h6 text-center pb-4">Mobile App</p>
				</v-card-title>
				<v-card-text >
<VMarkdown v-model="text" :use-github=false />

<p class="text-h6 text-center pt-4 pb-4">Download it today!</p>

	<v-row>
		<v-col cols="3">
		</v-col>
		<v-col cols="3" class="text-center">
			<div v-if="deviceiOsAvailable">
<a :href="deviceiOsUrl"><img src="/images/mobile/ios-app-store.svg" height="44"></a>
			</div>
			<div v-if="!deviceiOsAvailable">
<div class="pb-2">{{ $t('mobileApp.notYetAvailable') }}</div>
<img src="/images/mobile/ios-app-store.svg" height="44" alt="Apple iOS Store" />
			</div>
		</v-col>
		<v-col cols="3" class="text-center">
			<div v-if="deviceAndroidAvailable">
<a :href="deviceAndroidUrl"><img src="/images/mobile/google-play-store.png" height="44"></a>
			</div>
			<div v-if="!deviceAndroidAvailable">
<div class="pb-2">{{ $t('mobileApp.notYetAvailable') }}</div>
<img src="/images/mobile/google-play-store.png" height="44" alt="Google Play Store" />
			</div>
		</v-col>
	</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { computed, ref } from 'vue';

import AppConstants from '@/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@/library_vue/components/base';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'MobileApp',
	components: {
		VMarkdown
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
			success
		} = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const deviceAndroidUrl = ref(AppConstants.External.store.android);
		const deviceiOsUrl = ref(AppConstants.External.store.ios);

		const deviceAndroidAvailable = computed(() => {
			return !String.isNullOrEmpty(deviceAndroidUrl.value);
		});
		const deviceiOsAvailable = computed(() => {
			return !String.isNullOrEmpty(deviceAndroidUrl.value);
		});
		const text = computed(() => {
			return LibraryClientUtility.$trans.t('mobileApp.text1');
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
			deviceAndroidUrl,
			deviceiOsUrl,
			deviceAndroidAvailable,
			deviceiOsAvailable,
			serviceStore,
			text,
		};
	}
};
</script>

<style scoped>
</style>
