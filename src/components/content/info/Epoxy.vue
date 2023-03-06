<template>
	<div>
		<ContentHeader v-model="contentTitle" />
		<v-row dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense>
							<v-col cols="12">
				<VMarkdown v-model="contentDesc" :use-github=false />
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
				<VMarkdown v-model="contentMarkup" :use-github=false />
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
				<VMarkdown v-model="contentMarkup2" :use-github=false />
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<div class="text-center text-h5 pb-2">
					{{ $t('strings.content.info.epoxy.chart') }}
				</div>
			</v-col>
			<v-col cols="12">
				<v-card>
					<v-card-text>
<VMarkdown v-model="contentChartDesc" :use-github=false />
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
							>{{ item.flexuralStrength ? item.flexuralStrength.toLocaleString() : '' }}</td>
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
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row dense
			v-if="hasLinks"
		>
			<v-col cols="12" class="text-center text-h5 pt-4 pb-2">
				{{ $t('strings.content.info.epoxy.additionalLinks') }}
			</v-col>
			<v-col cols="12" class="pb-2">
				<AdditionalLinks
					v-model="links"
				/>
			</v-col>
		</v-row>
		<v-row dense
			v-show="hasAttribution"
		>
			<v-col cols="12" class="text-center text-h5 pb-2; float: right">
				<v-card>
					<v-card-text class="float: right">
<ContentAttribution v-model="content" @has-attribution="handleAttribution" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useEpoxyBaseComponent } from '@/components/content/info/epoxyBase';

import AdditionalLinks from '@/components/content/info/AdditionalLinks';
import ContentAttribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'Epxoy',
	components: {
		AdditionalLinks,
		ContentAttribution,
		ContentHeader,
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
			contentMarkup2,
			data,
			hasLinks,
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
			contentMarkup2,
			data,
			hasLinks,
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
