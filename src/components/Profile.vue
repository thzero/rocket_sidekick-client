<template>
	<div>
		<h1>Welcome, {{ name }}</h1>
		<div>
			<img
				v-if="hasPicture"
				:src="picture"
				class="responsive"
			>
		</div>
	</div>
</template>

<script>
import { computed, getCurrentInstance, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import base from '@thzero/library_client_vue3/components/base';

export default {
	name: 'Profile',
	extends: base,
	setup(props) {
		const instance = getCurrentInstance();

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const signedIn = ref(false);

		const hasPicture = computed(() => {
			return (instance.ctx.serviceStore.user != null && !String.isNullOrEmpty(instance.ctx.serviceStore.user.external.picture));
		});
		const name = computed(() => {
			return (instance.ctx.serviceStore.user != null && String.isNullOrEmpty(instance.ctx.serviceStore.user.external.name) ? instance.ctx.serviceStore.user.external.name : '');
		});
		const picture = computed(() => {
			return (instance.ctx.serviceStore.user != null && String.isNullOrEmpty(instance.ctx.serviceStore.user.external.picture) ? instance.ctx.serviceStore.user.external.picture : '');
		});
		const user = computed(() => {
			return instance.ctx.serviceStore.user;
		});

		return Object.assign(base.setup(props), {
			hasPicture,
			name,
			picture,
			signedIn,
			serviceStore,
			user
		});
	},
	// data: () => ({
	// 	signedIn: false
	// }),
	// computed: {
	// 	hasPicture() {
	// 		return (this.user != null && this.user.external.picture != null && this.user.external.picture !== '');
	// 	},
	// 	name() {
	// 		return (this.user != null && this.user.external.name != null ? this.user.external.name : '');
	// 	},
	// 	picture() {
	// 		return (this.user != null && this.user.external.picture != null ? this.user.external.picture : null);
	// 	},
	// 	user() {
	// 		return LibraryClientUtility.$store.state.user;
	// 	}
	// }
};
</script>

<style scoped>
</style>
