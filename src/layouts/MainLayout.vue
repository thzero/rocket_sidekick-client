<template>
	<v-app id="root">

		<v-app-bar
			app
			color="primary"
			density="compact"
		>
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click.stop="toggleDrawer"
				>
				</v-app-bar-nav-icon>
			</template>

			<v-app-bar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>

			<v-btn
				v-if="$vuetify.display.mdAndUp && features.Rockets"
				to="/rockets"
			>
				{{ $t('menu.content.rockets.title') }}
			</v-btn>
			<v-menu
				v-if="$vuetify.display.mdAndUp"
			>
				<template v-slot:activator="{ props }">
					<v-btn append-icon="mdi-menu-down"
						v-bind="props"
					>{{ $t('menu.content.info.title') }}</v-btn>
				</template>
				<v-list density="compact">
					<v-list-item
						v-for="item in info"
						:key="item.name"
						:to="contentLink(item)"
					>
						<v-list-item-title>{{ contentTitle(item) }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-menu
				v-if="$vuetify.display.mdAndUp"
			>
				<template v-slot:activator="{ props }">
					<v-btn append-icon="mdi-menu-down"
						v-bind="props"
					>{{ $t('menu.content.tools.title') }}</v-btn>
				</template>
				<v-list density="compact">
					<v-list-item
						v-for="item in tools"
						:key="item.name"
						:to="contentLink(item)"
					>
						<v-list-item-title>{{ contentTitle(item) }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-menu
				v-if="$vuetify.display.mdAndUp && features.Yours.value"
			>
				<template v-slot:activator="{ props }">
					<v-btn append-icon="mdi-menu-down"
						v-bind="props"
					>{{ $t('menu.yours.title') }}</v-btn>
				</template>
				<v-list density="compact">
					<v-list-item
						v-if="features.Yours.Checklists"
						to="/yours/checklists"
					>
						<v-list-item-title>{{ $t('menu.yours.checklists') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						v-if="features.Yours.Launches"
						to="/yours/launches"
					>
						<v-list-item-title>{{ $t('menu.yours.rockets') }}</v-list-item-title>
					</v-list-item>
					<v-divider></v-divider>
					<v-list-item
						v-if="features.Yours.Altimeters"
						to="yours/altimeters"
					>
						<v-list-item-title>{{ $t('menu.yours.altimeters') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						v-if="features.Yours.Parachutes"
						to="yours/parachutes"
					>
						<v-list-item-title>{{ $t('menu.yours.parachutes') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						v-if="features.Yours.Rockets"
						to="/yours/rockets"
					>
						<v-list-item-title>{{ $t('menu.yours.rockets') }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn
				v-if="$vuetify.display.mdAndUp"
				to="/content/links"
			>
				{{ $t('menu.content.links.title') }}
			</v-btn>
			<v-btn
				v-if="$vuetify.display.mdAndUp && features.MobileApp"
				to="/landing"
			>
				{{ $t('menu.content.app') }}
			</v-btn>

			<template v-slot:append>
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn
							v-bind="props"
							icon="mdi-dots-vertical"
						></v-btn>
					</template>
					<v-list density="compact">
						<v-list-item
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
						<!-- <v-list-item @click="clickSupport">
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
		</v-app-bar>

		<v-navigation-drawer
			v-model="drawer"
			temporary
		>
			<v-list density="compact">
				<v-list-item>
					{{ $t('menu.content.info.title') }}
					<v-list density="compact">
						<v-list-item
							v-for="item in info"
							:key="item.name"
							:to="contentLink(item)"
						>
							<v-list-item-title>{{ contentTitle(item) }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item>
				<v-list-item
					v-if="features.Rocket"
					to="/rockets"
				>
					<v-list-item-title>{{ $t('menu.content.rockets.title') }}</v-list-item-title>
				</v-list-item>
				<v-list-item>
					{{ $t('menu.content.tools.title') }}
					<v-list density="compact">
						<v-list-item
							v-for="item in tools"
							:key="item.name"
							:to="contentLink(item)"
						>
							<v-list-item-title>{{ contentTitle(item) }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item>
				<v-list-item
					v-if="features.Yours.value"
				>
					{{ $t('menu.yours.title') }}
					<v-list density="compact">
						<v-list-item
							v-if="features.Yours.Checklists"
							to="/yours/checklists"
						>
							<v-list-item-title>{{ $t('menu.yours.checklists') }}</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="features.Yours.Launches"
							to="/yours/launches"
						>
							<v-list-item-title>{{ $t('menu.yours.launches') }}</v-list-item-title>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item
							v-if="features.Yours.Altimeters"
							to="/yours/altimeters"
						>
							<v-list-item-title>{{ $t('menu.yours.altimeters') }}</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="features.Yours.Parachutes"
							to="/yours/parachutes"
						>
							<v-list-item-title>{{ $t('menu.yours.parachutes') }}</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="features.Yours.Rockets"
							to="/yours/rockets"
						>
							<v-list-item-title>{{ $t('menu.yours.rockets') }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item>
				<v-list-item
					to="/content/links"
				>
					<v-list-item-title>{{ $t('menu.content.links.title') }}</v-list-item-title>
				</v-list-item>
				<!-- <v-list-item>
					{{ $t('menu.links.title') }}
					<v-list density="compact">
						<v-list-item
							v-for="item in links"
							:key="item.name"
							:href="item.link"
							target="_blank"
						>
							<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item> -->
				<v-list-item
					v-if="features.MobileApp"
					to="/landing"
				>
					<v-list-item-title>{{ $t('menu.content.app') }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main id="top">
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
			[[ {{  online  }}]]
				<router-view />
			</v-container>
		</v-main>

		<VConfirmationDialog
			:non-recoverable="false"
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>
		<!-- <VDisplayDialog
			:signal="dialogDisplayMarkupSignal.signal"
			@cancel="dialogDisplayMarkupCancel"
			@ok="dialogDisplayMarkupOk"
		>
			!--eslint-disable vue/no-v-html --
			<div
				class="markdown-body"
				style="vertical-align: top;"
				v-html="displayMarkupValue"
			/>
			!--eslint-enable--
		</VDisplayDialog> -->

		<VLayoutFooter />

		<VLoadingOverlay
			:signal="isAuthCompleted"
		/>

		<VCookieComply
			:preferences="preferences"
		/>
	</v-app>
</template>

<script>
import { computed } from 'vue';

import { useAppMainLayout } from '@/layouts/appMainLayout';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import VCookieComply from '@thzero/library_client_vue3_vuetify3/components/VCookieComply';
import VConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VConfirmationDialog';
// import VDisplayDialog from '@thzero/library_client_vue3_vuetify3/components/VDisplayDialog';
import VLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VLayoutFooter';
import VLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VLoadingOverlay';

export default {
	name: 'MainLayout',
	components: {
		VConfirmationDialog,
		VCookieComply,
		// VDisplayDialog,
		VLayoutFooter,
		VLoadingOverlay
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
			closeOnContentClick,
			clickAbout,
			clickOpenSource,
			clickPrivcy,
			clickSignIn,
			clickSignOut,
			clickSupport,
			dialogSignOut,
			dialogSignOutOk,
			drawer,
			isAuthCompleted,
			isLoggedIn,
			serviceAuth,
			serviceStore,
			toggleDrawer,
			contentLink,
			contentTitle,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue,
			dialogNewCharacter,
			info,
			displaySignIn,
			// links,
			markup,
			preferences,
			serviceMarkup,
			tools
		} = useAppMainLayout(props, context);

		const online = computed(() => {
			return LibraryClientUtility.$store.getters.getOnline();
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
			features,
			closeOnContentClick,
			clickAbout,
			clickOpenSource,
			clickPrivcy,
			clickSignIn,
			clickSignOut,
			clickSupport,
			dialogSignOut,
			dialogSignOutOk,
			drawer,
			isAuthCompleted,
			isLoggedIn,
			serviceAuth,
			serviceStore,
			toggleDrawer,
			contentLink,
			contentTitle,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue,
			dialogNewCharacter,
			info,
			displaySignIn,
			// links,
			markup,
			preferences,
			serviceMarkup,
			tools,
			online
		};
	},
	// data: () => ({
	// 	closeOnContentClick: true,
	// 	// drawer: false,
	// 	dialogDisplayMarkupSignal: new DialogSupport(),
	// 	displayMarkupValue: null,
	// 	dialogNewCharacter: new DialogSupport()
	// }),
	// created() {
	// 	this._serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	// 	LibraryClientUtility.$EventBus.on('display-markup', (value) => {
	// 		this.markup(this.correlationId(), value);
	// 		this.dialogDisplayMarkupSignal.open();
	// 	});
	// },
	// methods: {
	// 	async dialogDisplayMarkupCancel() {
	// 		this.dialogDisplayMarkupSignal.cancel();
	// 	},
	// 	async dialogDisplayMarkupOk() {
	// 		this.dialogDisplayMarkupSignal.ok();
	// 	},
	// 	markup(correlationId, value) {
	// 		this.displayMarkupValue = value ? this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, value)) : null;
	// 	}
	// }
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
