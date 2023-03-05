<script>
import { computed, watch } from 'vue';

import AppCommonConstants from 'rocket_sidekick_common/constants';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function useContentAttributionBaseComponent(props, context, options) {
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
		target
	} = useContentBaseComponent(props, context, options);

	const author = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return '';
		return props.modelValue.author.name;
	});
	const authorEmail = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return '';
		return props.modelValue.author.email;
	});
	const authorEmailHref = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return '';
		return 'mailto:' + props.modelValue.author.email;
	});
	const authorUrl = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return '';
		return props.modelValue.author.url;
	});
	const hasAuthor = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return false;
		const valid = !String.isNullOrEmpty(props.modelValue.author.name);
		return valid;
	});
	const hasAuthorEmail = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return false;
		return !String.isNullOrEmpty(props.modelValue.author.email);
	});
	const hasAuthorUrl = computed(() => {
		if (!props.modelValue || !props.modelValue.author)
			return false;
		return !String.isNullOrEmpty(props.modelValue.author.url);
	});
	const hasLicense = computed(() => {
		return !props.modelValue || !String.isNullOrEmpty(props.modelValue.license);
	});
	const hasLicenseImage = computed(() => {
		return !String.isNullOrEmpty(licenseImage.value);
	});
	const hasLicenseUrl = computed(() => {
		return !String.isNullOrEmpty(licenseUrl.value);
	});
	const license = computed(() => {
		if (!props.modelValue || !props.modelValue.license)
			return null;
		const license = props.modelValue.license.toLowerCase();
		let item = Object.entries(AppCommonConstants.Licenses.Free).find(l => (l[0].toLowerCase() === license) || (l[1].id.toLowerCase() === license));
		if (!item)
			item = Object.entries(AppCommonConstants.Licenses.Public).find(l => (l[0].toLowerCase() === license) || (l[1].id.toLowerCase() === license));
		if (!item)
			return null;
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

	watch(() => props.modelValue,
		(value) => {
			const hasAttribution = (hasAuthor.value && hasLicense.value);
			context.emit('hasAttribution', hasAttribution);
		}
	);

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
};
</script>
