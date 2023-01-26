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
<VMarkdown v-model="textMarkup" :use-github=false />

		<q class="font-italic" cite="https://www.nar.org/high-power-rocketry-info">
<VMarkdown v-model="textDefinition" :use-github=false tag="span" />
		</q> -- <a href="https://www.nar.org" target="_blank">National Association of Rocketry (NAR)</a>
<br><br>
		
<VMarkdown v-model="textMarkup2" :use-github=false />

					</v-card-text>
				</v-card>
				<v-card
					v-if="$vuetify.display.lgAndUp"
					class="mt-2"
				>
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
				<v-card
					v-if="$vuetify.display.lgAndUp"
					class="mt-2"
				>
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
				<v-card
					v-if="$vuetify.display.lgAndUp"
					class="mt-2"
				>
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
			<v-col cols="12" md="6" class="text-center">
				<v-card>
					<v-card-text>
						<v-carousel
							cycle
							height="800"
							hide-delimiter-background
							show-arrows="hover"
						>
							<v-carousel-item
								v-for="(slide, i) in slides"
									:key="i"
								>
								<v-sheet
									height="100%"
								>
									<div class="d-flex fill-height justify-center align-center">
										<img :src="slideUrl(slide.url)" v-if="slide.type==='image'" style="height: 800px" />
										<div v-if="slide.type==='video'" v-html="slide.embed"></div>
									</div>
							</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col 
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
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
			<v-col 
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
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
			<v-col 
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
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
	<p class="text-h6 text-center">{{ $t('titles.content.links.videos') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksVideos"
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
import { useHighPowerBaseComponent } from '@/components/content/info/highPowerBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'HighPower',
	components: {
		VMarkdown
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
			serviceStore,
			sortByOrder,
			target,
			content,
			textChartDesc,
			textDefinition,
			textDesc,
			textMarkup,
			textMarkup2,
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
			linksVideos,
			slides,
			slideUrl
		} = useHighPowerBaseComponent(props, context);

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
			serviceStore,
			sortByOrder,
			target,
			slides,
			content,
			textChartDesc,
			textDefinition,
			textDesc,
			textMarkup,
			textMarkup2,
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
			linksVideos,
			slides,
			slideUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
