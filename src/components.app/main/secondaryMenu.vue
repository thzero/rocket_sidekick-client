<template>
	<v-menu>
		<template v-slot:activator="{ props }">
			<v-btn
				v-bind="props"
				icon="mdi-dots-vertical"
			></v-btn>
		</template>
		<v-list density="compact">
			<!-- settings and support require a signed-in user (router.js) -->
			<v-list-item
				v-if="isLoggedIn"
				to="/settings"
			>
				<template v-slot:prepend>
					<v-icon>mdi-cog</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
			</v-list-item>
			<v-list-item @click="clickAbout">
				<!-- to="/about" -->
				<template v-slot:prepend>
					<v-icon>mdi-information</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.about') }}</v-list-item-title>
			</v-list-item>
			<v-list-item @click="clickPrivcy">
				<!-- to="/privacy" -->
				<template v-slot:prepend>
					<v-icon>mdi-information</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.privacy') }}</v-list-item-title>
			</v-list-item>
			<!-- <v-list-item
				v-if="isLoggedIn"
				@click="clickSupport"
			>
				<template v-slot:prepend>
					<v-icon>mdi-help</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.support') }}</v-list-item-title>
			</v-list-item> -->
			<v-list-item @click="clickOpenSource">
				<!-- to="/openSource" -->
				<template v-slot:prepend>
					<v-icon>mdi-open-source-initiative</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.openSource') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="isAdmin"
				to="/admin"
			>
				<template v-slot:prepend>
					<v-icon color="red darken-2">
						mdi-security
					</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.admin') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="displaySignIn"
				@click="clickSignIn"
			>
				<template v-slot:prepend>
					<v-icon color="green darken-2">
						mdi-account
					</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.signIn') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="isLoggedIn"
				@click="clickSignOut"
			>
				<template v-slot:prepend>
					<v-icon color="red darken-2">
						mdi-account
					</v-icon>
				</template>
				<v-list-item-title>{{ $t('titles.signOut') }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import { ref, watch } from 'vue';

import AppSharedConstants from '@/utility/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

export default {
	name: 'SecondaryMenu',
	props: {
		...baseBaseMenuProps
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
			features,
			info,
			tools,
			isLoggedIn,
			contentLink,
			contentTitle
		} = useBaseMenuComponent(props, context, {
			features: AppSharedConstants.Features
		});

		const serviceSecurity = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_SECURITY);
		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		// the same check the /admin route's guard makes (router.js requiresAuthRoles)
		const isAdmin = ref(false);
		watch(() => [ isLoggedIn.value, serviceStore.user ],
			async ([ loggedIn, user ]) => {
				isAdmin.value = loggedIn ? await serviceSecurity.authorizationCheckRoles(correlationId(), user, [ 'admin' ]) : false;
			},
			{ immediate: true }
		);

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
			features,
			info,
			tools,
			isAdmin,
			isLoggedIn,
			contentLink,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
