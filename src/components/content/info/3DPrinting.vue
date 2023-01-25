<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.3dprinting') + ' ' + $t('titles.content.info.title') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
<VMarkdown v-model="textDesc" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<q class="font-italic" cite="https://3dprinting.com/what-is-3d-printing">
<VMarkdown v-model="textDefinition" :use-github=false tag="span" />
				</q> -- <a href="https://3dprinting.com/what-is-3d-printing" target="_blank">3D printing.com)</a>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" md="6">
<VMarkdown v-model="textMarkup" :use-github=false />
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
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('strings.content.info.3dprinting.chart') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
<VMarkdown v-model="textChartDesc" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
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
							<td>{{ $t('strings.content.info.3dprinting.density') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.density }}</td>
						</tr>
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
			</v-col>
		</v-row>
		<v-row dense
			v-if="haveLinks"
		>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.3dprinting.additionalLinks') }}
			</v-col>
			<!-- <v-col cols="12" md="6" class="pb-2">
				<div
					v-for="item in links"
					:key="item.link"
				>
					<a 
						:href="item.url"
						target="_blank"
					>
					{{ !String.isNullOrEmpty(item.title) ? item.title : item.url}}
					</a><br/>
				</div>
			</v-col> -->
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
	<p class="text-h6 text-center">{{ $t('titles.content.links.3dprinting.collections') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksCollections"
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
	<p class="text-h6 text-center">{{ $t('titles.content.links.3dprinting.modeling') }}</p>
					</v-card-title>
					<v-card-text>
		<v-list density="compact">
			<v-list-item
				v-for="item in linksModeling"
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
	<p class="text-h6 text-center">{{ $t('titles.content.links.3dprinting.tools') }}</p>
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
		</v-row>
	</div>
</template>
		
<script>
import { use3DPrintingBaseComponent } from '@/components/content/info/3DPrintingBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'Epxoy',
	components: {
		VMarkdown
	},
	setup(props, context) {
		const {	correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			serviceStore,
			sort,
			target,
			textChartDesc,
			textDesc,
			textDefinition,
			textMarkup,
			content,
			data,
			haveLinks,
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
			sort,
			target,
			textChartDesc,
			textDesc,
			textDefinition,
			textMarkup,
			content,
			data,
			haveLinks,
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
