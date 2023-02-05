<template>
	<div>
		<Header v-model="contentTitle"/>
		<v-row dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
<VMarkdown v-model="contentDesc" :use-github=false />
		<v-row dense>
			<v-col cols="12">
				<q class="font-italic" cite="https://3dprinting.com/what-is-3d-printing">
<VMarkdown v-model="contentDefinition" :use-github=false tag="span" />
				</q> -- <a href="https://3dprinting.com/what-is-3d-printing" target="_blank">3D printing.com)</a>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" md="6">
<VMarkdown v-model="contentMarkup" :use-github=false />
			</v-col>
			<v-col cols="12" md="6">
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
				<table>
					<tr><td>
						<img :src="slideUrl(slide.url)" style="width: 600px" />
					</td></tr>
					<tr><td
						v-if="slide.desc"
						class="text-center"
					>
						{{ slide.desc }}
					</td></tr>
				</table>
			</div>
		</v-sheet>
	</v-carousel-item>
</v-carousel>
			</v-col>
		</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<div class="text-center text-h5 pb-2">
		{{ $t('strings.content.info.3dprinting.chart') }}
				</div>
			</v-col>
			<v-col cols="12">
				<v-card>
					<v-card-text>
				<v-row dense>
					<v-col cols="12">
		<VMarkdown v-model="contentChartDesc" :use-github=false />
					</v-col>
				</v-row>
				<v-table
					fixed-header
				>
					<thead>
						<tr>
							<th></th>
							<th
								v-for="item in data"
								:key="item.name" 
								class="text-left"
							>
								<p class="header"><a :href="item.link" target="_blank">{{ item.name }}</a></p>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.deflectionTempC') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.deflectionTempC }}</td>
						</tr>
						<!-- <tr>
							<td>{{ $t('strings.content.info.3dprinting.density') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.density }}</td>
						</tr> -->
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.impact') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.impact }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.flexuralStrength') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.flexuralStrength }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.flexuralModulus') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.flexuralModulus }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.tensileStrength') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileStrength }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.3dprinting.tensileElongation') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileElongation }}</td>
						</tr>
					</tbody>
				</v-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense
			v-if="hasLinks"
		>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.3dprinting.additionalLinks') }}
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks 
					v-model="linksGeneral"
					title="titles.content.links.general"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks 
					v-model="linksCollections"
					title="titles.content.links.3dprinting.collections"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks 
					v-model="linksModeling"
					title="titles.content.links.3dprinting.modeling"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<AdditionalLinks 
					v-model="linksTools"
					title="titles.content.links.3dprinting.tools"
				/>
			</v-col>
		</v-row>
		<v-row dense
			v-show="hasAttribution" 
		>
			<v-col cols="12" class="text-center text-h5 pb-2; float: right">
				<v-card>
					<v-card-text class="float: right">
<Attribution v-model="content" @has-attribution="handleAttribution" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import { use3DPrintingBaseComponent } from '@/components/content/info/3DPrintingBase';

import AdditionalLinks from '@/components/content/info/AdditionalLinks';
import Attribution from '@/components/content/info/Attribution';
import Header from '@/components/content/Header';
import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'Epxoy',
	components: {
		AdditionalLinks,
		Attribution,
		Header,
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
			contentDesc,
			contentDefinition,
			contentMarkup,
			contentTitle,
			handleAttribution,
			hasAttribution,
			contentChartDesc,
			data,
			hasLinks,
			links,
			linksCollections,
			linksGeneral,
			linksModeling,
			linksTools,
			slides,
			slideUrl,
			temperature
		} = use3DPrintingBaseComponent(props, context);

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
			hasAttribution,
			contentChartDesc,
			data,
			hasLinks,
			links,
			linksCollections,
			linksGeneral,
			linksModeling,
			linksTools,
			slides,
			slideUrl,
			temperature
		};
	}
};
</script>

<style scoped>
.header {
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	text-align: left;
	margin-bottom: 12px;
	min-height: 100px;
}
.link {
	text-decoration: underline;
}
</style>
