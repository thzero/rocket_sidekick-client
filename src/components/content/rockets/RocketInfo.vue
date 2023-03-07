<template>
	<Header v-model="rocket.name">
		<!-- <template v-slot:after>
			<v-btn
				class="mr-2"
				color="primary"
			>
				{{ $t('buttons.back') }}
			</v-btn>
		</template> -->
	</Header>
	<v-row dense>
		<v-col cols="12">
			<v-card
				v-if="rocket"
			>
				<v-img
					v-if="hasCoverUrl(rocket)"
					:src="rocket.coverUrl"
					cover
				>
					<div class="text-right pt-4">
						<v-btn
							class="mr-2"
							color="primary"
							:to="rocketsUrl"
						>
							{{ $t('buttons.back') }}
						</v-btn>
					</div>
				</v-img>

				<v-card-title
					class="bg-secondary"
					color="secondary"
				>
					<v-row dense>
						<v-col>
<p class="text-h6 text-center" style="float: left;">{{ rocket.name }}</p>
						</v-col>
						<v-col>
<img :src="rocketTypeIcon(rocket)" style="height: 48px; float: right;" />
						</v-col>
					</v-row>
				</v-card-title>
				<v-card-text class="pt-4">
<VMarkdown v-model="rocket.description" :use-github=false />
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" md="6">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-title>
		<p class="text-h6 text-center">{{ $t('titles.rockets.specifications') }}</p>
						</v-card-title>
						<v-card-text>
							<table>
								<tr>
									<td nowrap class="specifications">{{ $t('strings.rockets.diameterMajor') }}</td>
									<td>{{ rocket.diameterMajor }} {{ measurementUnitTranslateLength(rocket.diameterMajorMeasurementUnitId, rocket.diameterMajorMeasurementUnit) }} </td>
								</tr>
								<tr>
									<td nowrap class="specifications">{{ $t('strings.rockets.length') }}</td>
									<td>{{ rocket.length }} {{ measurementUnitTranslateLength(rocket.lengthMeasurementUnitId, rocket.lengthMeasurementUnit) }}</td>
								</tr>
								<tr>
									<td nowrap class="specifications">{{ $t('strings.rockets.weight') }}</td>
									<td>{{ rocket.weight }} {{ measurementUnitTranslateWeight(rocket.weightMeasurementUnitId, rocket.weightMeasurementUnit) }}</td>
								</tr>
								<tr>
									<td nowrap class="specifications">{{ $t('strings.rockets.buildLogUrl') }}</td>
									<td><a :href="rocket.buildLogUrl" target="_blank">{{ rocket.buildLogUrl }}</a></td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12" md="6">
			<v-row dense>
				<v-col
					v-if="hasAlbums"
					cols="12" md="6"
				>
					<v-card>
						<v-card-title>
		<p class="text-h6 text-center">{{ $t('titles.rockets.albums') }}</p>
						</v-card-title>
						<v-card-text>
			<v-list density="compact">
				<v-list-item
					v-for="item in albums"
					:key="item.name"
					:href="item.link"
					:target="target(item)"
					class="link"
				>
					<v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
				</v-list-item>
			</v-list>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col
					v-if="hasVideos"
					cols="12" md="6"
				>
					<v-card>
						<v-card-title>
		<p class="text-h6 text-center">{{ $t('titles.rockets.videos') }}</p>
						</v-card-title>
						<v-card-text>
			<v-list density="compact">
				<v-list-item
					v-for="item in videos"
					:key="item.name"
					:href="item.link"
					:target="target(item)"
					class="link"
				>
					<v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
				</v-list-item>
			</v-list>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
		<v-col
			v-if="hasLaunches"
			cols="12"
		>
			<v-card>
				<v-card-title>
<p class="text-h6 text-center">{{ $t('titles.rockets.launches') }}</p>
				</v-card-title>
				<v-card-text>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useRocketInfoBaseComponent } from '@/components/content/rockets/rocketInfoBase';
import { useRocketInfoBaseProps } from '@/components/content/rockets/rocketInfoBaseProps';

import Header from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'RocketInfo',
	components: {
		Header,
		VMarkdown
	},
	props: {
		...useRocketInfoBaseProps
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
			sort,
			target,
			albums,
			hasAlbums,
			hasAlbumsOrVideos,
			hasLaunches,
			hasVideos,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocket,
			rocketId,
			measurementUnitTranslate,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			videos,
			rocketsUrl
		} = useRocketInfoBaseComponent(props, context);

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
			albums,
			hasAlbums,
			hasAlbumsOrVideos,
			hasLaunches,
			hasVideos,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rocket,
			rocketId,
			measurementUnitTranslate,
			measurementUnitTranslateLength,
			measurementUnitTranslateWeight,
			videos,
			rocketsUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
tr .specifications {
	padding-right: 12px;
}
</style>
