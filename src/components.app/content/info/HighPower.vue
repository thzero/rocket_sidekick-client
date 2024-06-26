<template>
	<ContentLayout>
		<ContentHeader :value="contentTitle" />
		<v-row dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
<VtMarkdown v-model="contentMarkup" :use-github=false />

		<q class="font-italic" cite="https://www.nar.org/high-power-rocketry-info">
<VtMarkdown v-model="contentDefinition" :use-github=false tag="span" />
		</q> -- <a href="https://www.nar.org" target="_blank">National Association of Rocketry (NAR)</a>
<br><br>

<VtMarkdown v-model="contentMarkup2" :use-github=false />

					</v-card-text>
					<LoadingOverlay
						:signal="contentLoadSignal"
					/>
				</v-card>
			</v-col>
			<v-col cols="12" class="text-center">
				<v-card>
					<v-card-text>
						<!-- <v-carousel
							height="800"
							hide-delimiter-background
							show-arrows="hover"
						>
							<v-carousel-item
								v-for="(slide, i) in slides"
									:key="i"
									eager
								>
								<v-sheet
									height="100%"
								>
									[[ {{  slide }} ]]
										<div class="d-flex fill-height justify-center align-center">
											<img :src="slideUrl(slide.url)" v-if="slide.type==='image'" style="height: 800px;" 
										eager />
											<div v-if="slide.type==='video'" v-html="slide.embed"></div>
										</div>
								</v-sheet>
							</v-carousel-item>
						</v-carousel> -->
						<v-carousel
							cycle
							mandatory
						>
							<v-carousel-item
								v-for="(slide, i) in slides"
									:key="i"
									eager
								>
								<v-sheet
									height="100%"
								>
										<div class="d-flex fill-height justify-center align-center">
											<img :src="slideUrl(slide.url)" v-if="slide.type==='image'" style="height: 800px;" 
										eager />
											<div v-if="slide.type==='video'" v-html="slide.embed"></div>
										</div>
								</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</v-card-text>
					<LoadingOverlay
						:signal="contentLoadSignal"
						:progress="false"
					/>
				</v-card>
			</v-col>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.3dprinting.additionalLinks') }}
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-if="$vuetify.display.lgAndUp"
					v-model="linksGuidance"
					title="titles.content.links.guidance"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-if="$vuetify.display.lgAndUp"
					v-model="linksConstruction"
					title="titles.content.links.construction"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksTools"
					title="titles.content.links.tools"
				/>
			</v-col>
			<v-col
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
				<AdditionalLinks
					v-model="linksGuidance"
					title="titles.content.links.guidance"
				/>
			</v-col>
			<v-col
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
				<AdditionalLinks
					v-model="linksConstruction"
					title="titles.content.links.construction"
				/>
			</v-col>
			<v-col
				v-if="$vuetify.display.mdAndDown"
				cols="12" md="6"
			>
				<AdditionalLinks
					v-model="linksTools"
					title="titles.content.links.tools"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksBooks"
					title="titles.content.links.books"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksStudyGuides"
					title="titles.content.links.study"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksOrganizations"
					title="titles.content.links.organizations"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksForums"
					title="titles.content.links.forums"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksManufacturers"
					title="titles.content.links.manufacturers"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksVendors"
					title="titles.content.links.vendors"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksVideos"
					title="titles.content.links.videos"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks
					v-model="linksEvents"
					title="titles.content.links.events"
				/>
			</v-col>
		</v-row>
		<v-row dense
			v-show="hasAttribution"
		>
			<v-col cols="12" class="text-center text-h5 pb-2; float: right">
				<v-card>
					<v-card-text class="float: right">
<ContentAttribution :value="content" @has-attribution="handleAttribution" />
					</v-card-text>
					<LoadingOverlay
						:signal="contentLoadSignal"
						:progress="false"
					/>
				</v-card>
			</v-col>
		</v-row>
	</ContentLayout>
</template>

<script>
import { useHighPowerBaseComponent } from '@/components.app/content/info/highPowerBase';

import AdditionalLinks from '@/components/content/info/AdditionalLinks';
import ContentAttribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import ContentLayout from '@/components/content/Layout';
import LoadingOverlay from '@/components/LoadingOverlay';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'HighPower',
	components: {
		AdditionalLinks,
		ContentAttribution,
		ContentHeader,
		ContentLayout,
		LoadingOverlay,
		VtMarkdown
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
			contentDesc,
			contentDefinition,
			contentMarkup,
			contentTitle,
			handleAttribution,
			contentLoadSignal,
			hasAttribution,
			slideUrl,
			contentChartDesc,
			contentMarkup2,
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
			slides
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
			content,
			contentDesc,
			contentDefinition,
			contentMarkup,
			contentTitle,
			handleAttribution,
			slideUrl,
			contentLoadSignal,
			hasAttribution,
			contentChartDesc,
			contentMarkup2,
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
			slides
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
