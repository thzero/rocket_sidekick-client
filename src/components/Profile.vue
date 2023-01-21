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

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	name: 'Profile',
	extends: base,
	setup(props) {
		const instance = getCurrentInstance();
		
		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

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
	// 		return GlobalUtility.$store.state.user;
	// 	}
	// }
};
</script>

<style scoped>
</style>
