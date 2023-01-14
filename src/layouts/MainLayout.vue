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

			<v-spacer></v-spacer>

			<v-btn 
				v-if="$vuetify.display.mdAndUp && features.Checklists"
				to="/checklists"
			>
				{{ $t('menu.checklists.title') }}
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
						:to="item.link"
					>
						<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn 
				v-if="$vuetify.display.mdAndUp && features.Launches"
				to="/launches"
			>
				{{ $t('menu.launches.title') }}
			</v-btn>
			<v-menu
				v-if="$vuetify.display.mdAndUp && features.Rockets"
			>
				<template v-slot:activator="{ props }">
					<v-btn append-icon="mdi-menu-down"
						v-bind="props"
					>{{ $t('menu.rockets.title') }}</v-btn>
				</template>
				<v-list density="compact">
					<v-list-item
						to="/rockets/rockets"
					>
						<v-list-item-title>{{ $t('menu.rockets.rockets') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						to="/rockets/altimeters"
					>
						<v-list-item-title>{{ $t('menu.rockets.altimeters') }}</v-list-item-title>
					</v-list-item>
					<v-list-item
						to="/rockets/parachutes"
					>
						<v-list-item-title>{{ $t('menu.rockets.parachutes') }}</v-list-item-title>
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
						:to="item.link"
					>
						<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
					</v-list-item>
				</v-list>
				<!-- 
				<v-list density="compact" class="pl-2 pr-2">
					<hr/>
				</v-list>
				<v-list density="compact">
					<v-list-item
						to="/landing"
					>
						<v-list-item-title>{{ $t('menu.content.app') }}</v-list-item-title>
					</v-list-item>
				</v-list> -->
			</v-menu>
			<v-btn 
				v-if="$vuetify.display.mdAndUp"
				to="/content/links"
			>
				{{ $t('menu.content.links.title') }}
			</v-btn>
			<!-- <v-menu
				v-if="$vuetify.display.mdAndUp"
			>
				<template v-slot:activator="{ props }">
					<v-btn append-icon="mdi-menu-down"
						v-bind="props"
					>{{ $t('menu.content.links.title') }}</v-btn>
				</template>
				<v-list density="compact">
					<v-list-item
						v-for="item in links"
						:key="item.name"
						:href="item.link"
						target="_blank"
					>
						<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
					</v-list-item>
				</v-list density="compact">
			</v-menu> -->
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
				<v-list-item
					v-if="features.Checklists"
					to="/checklists"
				>
					<v-list-item-title>{{ $t('menu.checklists.title') }}</v-list-item-title>
				</v-list-item>
				<v-list-item>
					{{ $t('menu.content.info.title') }}
					<v-list density="compact">
						<v-list-item
							v-for="item in info"
							:key="item.name"
							:to="item.link"
						>
							<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item>
				<v-list-item
					v-if="features.Launches"
					to="/launches"
				>
					<v-list-item-title>{{ $t('menu.launches.title') }}</v-list-item-title>
				</v-list-item>
				<v-list-item
					v-if="features.Rockets"
				>
					{{ $t('menu.rockets.title') }}
					<v-list density="compact">
						<v-list-item
							to="/rockets/rockets"
						>
							<v-list-item-title>{{ $t('menu.rockets.rockets') }}</v-list-item-title>
						</v-list-item>
						<v-list-item
							to="/rockets/altimeters"
						>
							<v-list-item-title>{{ $t('menu.rockets.altimeters') }}</v-list-item-title>
						</v-list-item>
						<v-list-item
							to="/rockets/parachutes"
						>
							<v-list-item-title>{{ $t('menu.rockets.parachutes') }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-list-item>
				<v-list-item>
					{{ $t('menu.content.tools.title') }}
					<v-list density="compact">
						<v-list-item
							v-for="item in tools"
							:key="item.name"
							:to="item.link"
						>
							<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
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
import { computed, ref } from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseMainLayout } from '@/library_vue/layouts/baseMainLayout';

import VCookieComply from '@/library_vue_vuetify/components/VCookieComply';
import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
// import VDisplayDialog from '@/library_vue_vuetify/components/VDisplayDialog';
import VLayoutFooter from '@/library_vue_vuetify/components/VLayoutFooter';
import VLoadingOverlay from '@/library_vue_vuetify/components/VLoadingOverlay';

import DialogSupport from '@/library_vue/components/support/dialog';

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
			toggleDrawer
		} = useBaseMainLayout(props, context, {
			features: Constants.features
		});

		const serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

		const dialogDisplayMarkupSignal = ref(new DialogSupport());
		const displayMarkupValue = ref(null);
		const dialogNewCharacter = ref(new DialogSupport());

		const preferences = [
			{
				title: GlobalUtility.$trans.t('strings.cookieCompliance.performance.title'),
				description: GlobalUtility.$trans.t('strings.cookieCompliance.performance.description'),
				items: [
					{ 
						label: 'Active',
						value: 'performance', 
						isRequired: true 
					}
				],
			},
			// {
			// 	title: GlobalUtility.$trans.t('strings.cookieCompliance.session.title'),
			// 	description: GlobalUtility.$trans.t('strings.cookieCompliance.session.description'),
			// 	items: [
			// 		{ 
			// 			label: 'Active',
			// 			value: 'session', 
			// 			isRequired: true 
			// 		}
			// 	],
			// },
			{
				title: GlobalUtility.$trans.t('strings.cookieCompliance.analytics.title'),
				description: GlobalUtility.$trans.t('strings.cookieCompliance.analytics.description'),
				items: [
					{ 
						label: 'GoogleAnalytics', 
						value: 'ga', 
						isEnable: true 
					},
				],
			},
			// {
			// 	title: GlobalUtility.$trans.t('strings.cookieCompliance.xsrf.title'),
			// 	description: GlobalUtility.$trans.t('strings.cookieCompliance.xsrf.description'),
			// 	items: [
			// 		{ 
			// 			label: 'XSRF-TOKEN', 
			// 			value: 'performance', 
			// 			isEnable: true 
			// 		},
			// 	],
			// },
		];

		const displaySignIn = computed(() => {
			return !isLoggedIn && Constants.Features.Auth;
		});
		const info = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.info)
				return [];
			return temp.info.sort((a, b) => a.order >= b.order);
		});
		// const links = computed(() => {
		// 	let temp = serviceStore.state.content;
		// 	if (!temp)
		// 		return [];
		// 	if (!temp.links)
		// 		return [];
		// 	const links = temp.links.filter(l => String.isNullOrEmpty(l.category) || l.category === 'guidance');
		// 	if (!links)
		// 		return [];
		// 	links.push({
		// 		title : "menu.content.links.title",
		// 		link : "/links",
		// 		order : "99"
		// 	});
		// 	return links.sort((a, b) => a.order >= b.order);
		// });
		const tools = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.tools)
				return [];
			return temp.tools.sort((a, b) => a.order >= b.order);
		});

		const dialogDisplayMarkupCancel = async () => {
			dialogDisplayMarkupSignal.value.cancel();
		};
		const dialogDisplayMarkupOk = async () => {
			dialogDisplayMarkupSignal.value.ok();
		};
		const markup = (correlationId, value) => {
			displayMarkupValue.value = value ? serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, value)) : null;
		};
		
		GlobalUtility.$EventBus.on('display-markup', (value) => {
			markup(correlationId(), value);
			dialogDisplayMarkupSignal.value.open();
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
	// 	this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	// 	GlobalUtility.$EventBus.on('display-markup', (value) => {
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
