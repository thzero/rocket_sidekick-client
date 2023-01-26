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
import { useAttributionBaseComponent } from '@/components/content/info/attributionBase';
import { useAttributionBaseProps } from '@/components/content/info/attributionBaseProps';

export default {
	name: 'Attribution',
	props: {
		...useAttributionBaseProps
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
		} = useAttributionBaseComponent(props, context);

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
