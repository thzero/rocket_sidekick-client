<script>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';

import Constants from '@/common/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useInfoBaseComponent(props, context, options) {
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
		success,
		serviceStore,
		sortByOrder,
		target,
	} = useContentBaseComponent(props, context, options);

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
		serviceStore,
		sortByOrder,
		target,
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
};
</script>
