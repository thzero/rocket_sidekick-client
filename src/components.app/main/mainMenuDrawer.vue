<template>
	<v-list density="compact">
		<v-list-item
			to="/"
		>
			<v-list-item-title>{{ $t('titles.home') }}</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="features.Rockets"
			to="/rockets"
		>
			<v-list-item-title>{{ $t('menu.content.rockets.title') }}</v-list-item-title>
		</v-list-item>
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
			v-if="features.Yours.value && isLoggedIn"
		>
			{{ $t('menu.yours.title') }}
			<v-list density="compact">
				<v-list-item
					v-if="features.Yours.Checklists"
					to="/user/checklists"
				>
					<v-list-item-title>{{ $t('menu.yours.checklists') }}</v-list-item-title>
				</v-list-item>
				<v-list-item
					v-if="features.Yours.Launches"
					to="/user/launches"
				>
					<v-list-item-title>{{ $t('menu.yours.launches') }}</v-list-item-title>
				</v-list-item>
				<v-divider
					v-if="features.Yours.Checklists && features.Yours.Launches"
				></v-divider>
				<v-list-item
					v-if="features.Yours.Altimeters"
					to="/user/altimeters"
				>
					<v-list-item-title>{{ $t('menu.yours.altimeters') }}</v-list-item-title>
				</v-list-item>
				<v-list-item
					v-if="features.Yours.Parachutes"
					to="/user/parachutes"
				>
					<v-list-item-title>{{ $t('menu.yours.parachutes') }}</v-list-item-title>
				</v-list-item>
				<v-list-item
					v-if="features.Yours.Rockets"
					to="/user/rockets"
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
			v-if="features.MobileAppLanding"
			to="/landing"
		>
			<v-list-item-title>{{ $t('menu.content.app') }}</v-list-item-title>
		</v-list-item>
	</v-list>
</template>

<script>
import AppSharedConstants from '@/utility/constants';

import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

export default {
	name: 'MainMenuDrawer',
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
		} = useBaseMenuComponent(props, context);

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
			isLoggedIn,
			contentLink,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
