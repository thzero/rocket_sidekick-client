<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.epoxy') + ' ' + $t('titles.content.info.title') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
<VMarkdown v-model="textDesc" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
<VMarkdown v-model="textGuidance1" :use-github=false />
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('strings.content.info.epoxy.chart') }}
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
							<td>{{ $t('strings.content.info.epoxy.ratioWeight') }}<br/>{{ $t('strings.content.info.epoxy.ratioWeight2') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioWeight }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.ratioVolume') }}<br/>{{ $t('strings.content.info.epoxy.ratioVolume2') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioVolume }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.potLifeTime') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.potLife }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.handlingTime') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.handlingTime }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.fullCureTime') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fullCure }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.shoreHardness') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.shoreHardness }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.specificGravity') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.specificGravity }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.tensileStrength') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileStrength ? item.tensileStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.tensileElongation') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileElongation }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.flexuralStrength') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fFlexuralStrength ? item.fFlexuralStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.flexuralModulus') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.flexuralModulus ? item.flexuralModulus.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.compressionStrength') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.compressionStrength ? item.compressionStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.maxUseTemp') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>
								<div v-html="temperature(item.maxUseTempF, item.maxUseTempC)"></div>
								<div>{{ item.maxUseTemp }}</div>
							</td>
						</tr>
						<tr>
							<td>{{ $t('strings.content.info.epoxy.deflectionTemp') }}</td>
							<td
								v-for="item in data"
								:key="item.name"
							>
								<div v-html="temperature(item.deflectionTempF, item.deflectionTempC)"></div>
								<div>{{ item.deflectionTemp }}</div>
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
		<v-row dense
			v-if="haveLinks"
		>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.epoxy.additionalLinks') }}
			</v-col>
			<v-col cols="12" class="pb-2">
				<div
					v-for="item in links"
					:key="item.url"
				>
					<a 
						:href="item.url"
						target="_blank"
					>
					{{ !String.isNullOrEmpty(item.title) ? item.title : item.url}}
					</a><br/>
				</div>
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import { useEpoxyBaseComponent } from '@/components/content/info/epoxyBase';

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
			textChartDesc,
			textDesc,
			textGuidance1,
			content,
			data,
			haveLinks,
			links,
			temperature
		} = useEpoxyBaseComponent(props, context);

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
			textChartDesc,
			textDesc,
			textGuidance1,
			content,
			data,
			haveLinks,
			links,
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
</style>
