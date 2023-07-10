<template>
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
		v-if="$vuetify.display.mdAndUp && features.Yours.value && isLoggedIn"
	>
		<template v-slot:activator="{ props }">
			<v-btn append-icon="mdi-menu-down"
				v-bind="props"
			>{{ $t('menu.yours.title') }}</v-btn>
		</template>
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
			<v-list-item
				v-if="features.Yours.Rockets"
				to="/user/rockets"
			>
				<v-list-item-title>{{ $t('menu.yours.rockets') }}</v-list-item-title>
			</v-list-item>
			<v-divider
				v-if="features.Yours.Checklists || features.Yours.Launches || features.Yours.Rockets"
			></v-divider>
			<v-list-subheader>
				{{ $t('menu.yours.parts') }}
			</v-list-subheader>
			<v-list-item
				v-if="features.Yours.Altimeters"
				to="/user/altimeters"
			>
				<v-list-item-title>{{ $t('menu.yours.altimeters') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.ChuteProtectors"
				to="/user/chuteProtectors"
			>
				<v-list-item-title>{{ $t('menu.yours.chuteProtectors') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.ChuteReleases"
				to="/user/chuteReleases"
			>
				<v-list-item-title>{{ $t('menu.yours.chuteReleases') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.DeploymentBags"
				to="/user/deploymentBags"
			>
				<v-list-item-title>{{ $t('menu.yours.deploymentBags') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.Motors"
				to="/user/motors"
			>
				<v-list-item-title>{{ $t('menu.yours.motors') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.MotorsCases"
				to="/user/motorCases"
			>
				<v-list-item-title>{{ $t('menu.yours.motorCases') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.Parachutes"
				to="/user/parachutes"
			>
				<v-list-item-title>{{ $t('menu.yours.parachutes') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.Streamers"
				to="/user/streamers"
			>
				<v-list-item-title>{{ $t('menu.yours.streamers') }}</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="features.Yours.Trackers"
				to="/user/trackers"
			>
				<v-list-item-title>{{ $t('menu.yours.trackers') }}</v-list-item-title>
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
		v-if="$vuetify.display.mdAndUp && features.MobileAppLanding"
		to="/landing"
	>
		{{ $t('menu.content.app') }}
	</v-btn>
</template>

<script>
import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

export default {
	name: 'ManuMenu',
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
