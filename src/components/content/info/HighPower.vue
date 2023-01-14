<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.info.highPower') }}</p>
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
<p>{{ $t('strings.content.info.highPower.welcome1') }}<br><br></p>

		<q class="font-italic" cite="https://www.nar.org/high-power-rocketry-info">{{ $t('strings.content.info.highPower.welcome1NAR') }}.</q> -- <a href="https://www.nar.org" target="_blank">National Association of Rocketry (NAR)</a>
<br><br>
		
<p>{{ $t('strings.content.info.highPower.welcome2') }}<br><br></p>

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
	<p class="text-h6 text-center">{{ $t('titles.content.links.construction') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksConstruction"
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
	<p class="text-h6 text-center">{{ $t('titles.content.links.tools') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksTools"
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
				<v-card class="mt-2">
					<v-card-title>
	<p class="text-h6 text-center">{{ $t('titles.content.links.study') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksStudyGuides"
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

		const highPower = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return {};
			if (!temp.info)
				return {};
			return temp.info.find(l => l.id === 'highPower');
		});
		const highPowerLinks = computed(() => {
			if (!highPower.value)
				return [];
			if (!highPower.value.links)
				return [];
			return highPower.value.links.filter(l => l.enabled);
		});
		const links = computed(() => {
			let temp = serviceStore.state.content;
			if (!temp)
				return [];
			if (!temp.links)
				return [];
			return temp.links;
		});
		const linksBooks = computed(() => {
			if (!highPowerLinks.value)
				return [];
			return highPowerLinks.value.filter(l => l.category === 'guidance');
		});
		const linksConstruction = computed(() => {
			if (!highPowerLinks.value)
				return [];
			return highPowerLinks.value.filter(l => l.category === 'construction');
		});
		const linksEvents = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'event' && l.highPower);
		});
		const linksForums = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'forum' && l.highPower);
		});
		const linksGuidance = computed(() => {
			if (!highPowerLinks.value)
				return [];
			return highPowerLinks.value.filter(l => l.category === 'guidance');
		});
		const linksManufacturers = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'manufacturer' && l.highPower);
		});
		const linksOrganizations = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'organization' && l.highPower);
		});
		const linksStudyGuides = computed(() => {
			if (!highPowerLinks.value)
				return [];
			return highPowerLinks.value.filter(l => l.category === 'study');
		});
		const linksTools = computed(() => {
			if (!highPowerLinks.value)
				return [];
			return highPowerLinks.value.filter(l => l.category === 'tools');
		});
		const linksVendors = computed(() => {
			if (!links.value)
				return [];
			return links.value.filter(l => l.category === 'vendor' && l.highPower);
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
			highPower,
			highPowerLinks,
			links,
			linksBooks,
			linksConstruction,
			linksEvents,
			linksForums,
			linksGuidance,
			linksManufacturers,
			linksOrganizations,
			linksStudyGuides,
			linksTools,
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
