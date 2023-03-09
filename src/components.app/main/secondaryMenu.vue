<template>
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

<script>
import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

import AppConstants from '@/utility/constants';

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
			contentLink,
			contentTitle
		} = useBaseMenuComponent(props, context, {
			features: AppConstants.Features
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
			contentLink,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
