<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('titles.content.info.epoxy') + ' ' + $t('titles.content.info.title') }}
			</v-col>
		</v-row>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				{{ $t('strings.content.info.epoxy.chart') }}
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
							<td>Ratio by weight<br/>(resin/hardener)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioWeight }}</td>
						</tr>
						<tr>
							<td>Ratio by volume<br/>(resin/hardener)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.ratioVolume }}</td>
						</tr>
						<tr>
							<td>Pot life (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.potLife }}</td>
						</tr>
						<tr>
							<td>Handling time (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.handlingTime }}</td>
						</tr>
						<tr>
							<td>Full cure (m)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fullCure }}</td>
						</tr>
						<tr>
							<td>Shore “D” hardness</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.shoreHardness }}</td>
						</tr>
						<tr>
							<td>Specific gravity</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.specificGravity }}</td>
						</tr>
						<tr>
							<td>Tensile strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileStrength ? item.tensileStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Tensile Elongation (%)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.tensileElongation }}</td>
						</tr>
						<tr>
							<td>Flexural strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.fFlexuralStrength ? item.fFlexuralStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Flexural Modulus (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.flexuralModulus ? item.flexuralModulus.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Compression strength (psi)</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.compressionStrength ? item.compressionStrength.toLocaleString() : '' }}</td>
						</tr>
						<tr>
							<td>Maximum use temperature</td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.maxUseTemp }}</td>
						</tr>
						<tr>
							<td>Deflection temperature </td>
							<td
								v-for="item in data"
								:key="item.name"
							>{{ item.deflectionTemp }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
		<v-row dense>
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
import { useAppEpoxyComponent } from '@/components/content/info/appEpoxy';

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
			data,
			links
		} = useAppEpoxyComponent(props, context);

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
			data,
			links
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
