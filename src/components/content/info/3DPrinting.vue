<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.3dprinting') + ' ' + $t('titles.content.info.title') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				{{ $t('strings.content.info.3dprinting.desc') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				<q class="font-italic" cite="https://3dprinting.com/what-is-3d-printing">
					{{ $t('strings.content.info.3dprinting.quote') }}
				</q> -- <a href="https://3dprinting.com/what-is-3d-printing" target="_blank">3D printing.com)</a>
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('strings.content.info.3dprinting.chart') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12">
				{{ $t('strings.content.info.3dprinting.chartDesc') }}
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
import { use3DPrintingBaseComponent } from '@/components/content/info/3DPrintingBase';

export default {
	name: 'Epxoy',
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
			content,
			data,
			links,
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
			content,
			data,
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
