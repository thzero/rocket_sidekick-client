<template>
	<div>
		<ContentHeader v-model="contentTitle" />
		<v-row dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense>
							<v-col cols="12">
				<VMarkdown v-model="contentMarkup" :use-github=false />
							</v-col>
						</v-row>
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
import { useShearPinsBaseComponent } from '@/components/content/info/shearPinsBase';

import AdditionalLinks from '@/components/content/info/AdditionalLinks';
import ContentAttribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'ShearPins',
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
			data,
			hasLinks,
			links
		} = useShearPinsBaseComponent(props, context);

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
			data,
			hasLinks,
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
