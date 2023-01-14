<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.title') }}</p>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.general') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksGeneral"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.guidance') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksGuidance"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.books') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksBooks"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.organizations') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksOrganizations"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.forums') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksForums"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.events') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksEvents"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.competitions') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksCompetitions"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col 
				v-if="$vuetify.display.mdAndUp"
			cols="6">
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.manufacturers') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksManufacturers"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.vendors') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksVendors"
				:key="item.name"
				:href="item.link"
				:target="target(item)"
				class="link"
			>
				<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
			</v-list-item>
		</v-list>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { computed } from 'vue';

import { useContentBaseComponent } from '@/components/content/contentBase';

export default {
	name: 'Links',
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
		serviceStore
	} = useContentBaseComponent(props, context);

		const links = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.links)
				return [];
			return temp.links.filter(l => l.enabled);
		});
		const linksBooks = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'book');
		});
		const linksCompetitions = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'competition');
		});
		const linksEvents = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'event');
		});
		const linksForums = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'forum');
		});
		const linksGeneral = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => String.isNullOrEmpty(l.category));
		});
		const linksGuidance = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'guidance');
		});
		const linksManufacturers = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'manufacturer');
		});
		const linksOrganizations = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'organization');
		});
		const linksVendors = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'vendor');
		});
		
		const target = (item) => {
			return !item.local ? 'blank' : '';
		};

		const sort = (links) => {
			links.sort((a, b) => a.order >= b.order);
		};

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
			links,
			linksBooks,
			linksCompetitions,
			linksEvents,
			linksForums,
			linksGeneral,
			linksGuidance,
			linksManufacturers,
			linksOrganizations,
			linksVendors,
			sort,
			target
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
