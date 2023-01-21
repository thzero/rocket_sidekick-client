<template>
	<div>
		<v-row dense>
			<v-col cols="12" class="text-center text-h5 pb-2">
				<v-card>
					<v-card-title class="text-center text-h5 pb-2">
						{{ contentTitle }}
					</v-card-title>
					<v-card-text>
<VMarkdown v-model="contentMarkup" :use-github=false />
		<v-row dense>
			<v-col
				v-if="hasLicense"
				cols="6" 
				class="pb-2 text-left"
			>
				<div
					v-if="hasLicenseImage"
				>
					<div v-html="licenseImage"></div>
				</div>
				<div
					v-if="!hasLicenseImage && hasLicenseUrl"
				>
					<a :href="licenseUrl" target="_blank">{{ licenseName }}</a>
				</div>
				<div
					v-if="!hasLicenseImage && !hasLicenseUrl"
				>
					{{ licenseName }}
				</div>
			</v-col>
			<v-col
				v-if="hasAuthor"
	 			cols="6" 
				class="pb-2 text-right"
			>
				<div
					v-if="!hasAuthorUrl"
				>
					{{ author }}
				</div>
				<div
					v-if="hasAuthorUrl"
				>
					<a :href="authorUrl" target="_blank">{{ author }}</a>
				</div>
				<div
					v-if="hasAuthorEmail"
				>
					<a :href="authorEmailHref" target="_blank">{{ authorEmail }}</a>
				</div>
			</v-col>
		</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>
		
<script>
import { useInfoBaseComponent } from '@/components/content/info/infoBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
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
			author,
			authorEmail,
			authorEmailHref,
			authorUrl,
			content,
			contentId,
			contentMarkup,
			contentTitle,
			hasAuthor,
			hasAuthorEmail,
			hasAuthorUrl,
			hasLicense,
			hasLicenseImage,
			hasLicenseUrl,
			license,
			licenseName,
			licenseImage,
			licenseUrl
		} = useInfoBaseComponent(props, context);

		return {	correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			author,
			authorEmail,
			authorEmailHref,
			authorUrl,
			content,
			contentId,
			contentMarkup,
			contentTitle,
			hasAuthor,
			hasAuthorEmail,
			hasAuthorUrl,
			hasLicense,
			hasLicenseImage,
			hasLicenseUrl,
			license,
			licenseName,
			licenseImage,
			licenseUrl
		};
	}
};
</script>

<style scoped>
</style>

<style>
	.markdown h1 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown h2 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown h3 {
		text-align: left;
		margin-bottom: 24px;
	}
	.markdown p {
		text-align: left;
		margin-bottom: 24px;
	}
</style>
