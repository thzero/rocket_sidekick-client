<template>
	<v-row dense>
		<v-col
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
</template>
		
<script>
import { useContentAttributionBaseComponent } from '@/components/content/attributionBase';
import { useContentAttributionBaseProps } from '@/components/content/attributionBaseProps';

export default {
	name: 'ContentAttribution',
	props: {
		...useContentAttributionBaseProps
	},
	emits: ['hasAttribution'],
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
			author,
			authorEmail,
			authorEmailHref,
			authorUrl,
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
		} = useContentAttributionBaseComponent(props, context);

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
			author,
			authorEmail,
			authorEmailHref,
			authorUrl,
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
