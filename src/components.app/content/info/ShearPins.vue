<template>
	<ContentLayout>
		<ContentHeader :value="contentTitle" />
		<v-row dense>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-row dense>
							<v-col cols="12" md="6">
<VtMarkdown v-model="contentMarkup" :use-github=false />
							</v-col>
							<v-col cols="12" md="6">
								<v-img src="/images/551977-9f9c6a3626f890490367f97d5088f831.png"/>
							</v-col>
						</v-row>
					</v-card-text>
					<LoadingOverlay
						:signal="contentLoadSignal"
					/>
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
import { useShearPinsBaseComponent } from '@/components.app/content/info/shearPinsBase';

import AdditionalLinks from '@/components/content/info/AdditionalLinks';
import ContentAttribution from '@/components/content/Attribution';
import ContentHeader from '@/components/content/Header';
import ContentLayout from '@/components/content/Layout';
import LoadingOverlay from '@/components/LoadingOverlay';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'ShearPins',
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
			contentLoadSignal,
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
