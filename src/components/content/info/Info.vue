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
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import Constants from '@/common/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useContentBaseComponent } from '@/components/content/contentBase';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'InfoMarkup',
	components: {
		VMarkdown
	},
	setup(props, context) {
		const routes = useRoute();

		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		} = useContentBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const content = ref('');

		const author = computed(() => {
			if (!content.value || !content.value.author)
				return '';
			return content.value.author.name;
		});
		const authorEmail = computed(() => {
			if (!content.value || !content.value.author)
				return '';
			return content.value.author.email;
		});
		const authorEmailHref = computed(() => {
			if (!content.value || !content.value.author)
				return '';
			return 'mailto:' + content.value.author.email;
		});
		const authorUrl = computed(() => {
			if (!content.value || !content.value.author)
				return '';
			return content.value.author.url;
		});
		const contentId = computed(() => {
			return `info.${routes.params.id}`;
		});
		const contentMarkup = computed(() => {
			if (!content.value)
				return '';
			return content.value.markup;
		});
		const contentTitle = computed(() => {
			if (!content.value)
				return '';
			return content.value.title;
		});
		const hasAuthor = computed(() => {
			if (!content.value || !content.value.author)
				return false;
			const valid = !String.isNullOrEmpty(content.value.author.name);
			return valid;
		});
		const hasAuthorEmail = computed(() => {
			if (!content.value || !content.value.author)
				return false;
			return !String.isNullOrEmpty(content.value.author.email);
		});
		const hasAuthorUrl = computed(() => {
			if (!content.value || !content.value.author)
				return false;
			return !String.isNullOrEmpty(content.value.author.url);
		});
		const hasLicense = computed(() => {
			return !content.value || !String.isNullOrEmpty(content.value.license);
		});
		const hasLicenseImage = computed(() => {
			return !String.isNullOrEmpty(licenseImage.value);
		});
		const hasLicenseUrl = computed(() => {
			return !String.isNullOrEmpty(licenseUrl.value);
		});
		const license = computed(() => {
			if (!content.value || !content.value.license)
				return null;
			const license = content.value.license.toLowerCase();
			let item = Object.entries(Constants.Licenses.Free).find(l => l[1].id === license);
			if (!item)
				item = Object.entries(Constants.Licenses.Public).find(l => l[1].id === license);
			if (item.length < 1)
				return null;
			item = item[1];
			return item;
		});
		const licenseName = computed(() => {
			if (!license.value)
				return '';

			return license.value.name;
		});
		const licenseImage = computed(() => {
			if (!license.value)
				return '';

			return license.value.image;
		});
		const licenseUrl = computed(() => {
			if (!license.value)
				return '';

			return license.value.url;
		});

		onMounted(async () => {
			const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), contentId.value);
			if (hasFailed(response))
				return;
			content.value = response.results;
		});

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
	.header {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		text-align: left;
		margin-bottom: 12px;
		min-height: 100px;
	}
</style>
