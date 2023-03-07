<script>
import { computed, onMounted, ref } from 'vue';

import AppConstants from '@/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseMainLayout } from '@thzero/library_client_vue3/layouts/baseMainLayout';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export function useAppMainLayout(props, context, options) {
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
		features,
		closeOnContentClick,
		clickAbout,
		clickOpenSource,
		clickPrivcy,
		clickSignIn,
		clickSignOut,
		clickSupport,
		dialogSignOut,
		dialogSignOutOk,
		drawer,
		isAuthCompleted,
		isLoggedIn,
		serviceAuth,
		serviceStore,
		toggleDrawer
	} = useBaseMainLayout(props, context, {
		features: AppConstants.Features
	});

	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const dialogDisplayMarkupSignal = ref(new DialogSupport());
	const displayMarkupValue = ref(null);
	const dialogNewCharacter = ref(new DialogSupport());

	const preferences = [
		{
			title: LibraryClientUtility.$trans.t('strings.cookieCompliance.performance.title'),
			description: LibraryClientUtility.$trans.t('strings.cookieCompliance.performance.description'),
			items: [
				{
					label: 'Active',
					value: 'performance',
					isRequired: true
				}
			],
		},
		// {
		// 	title: LibraryClientUtility.$trans.t('strings.cookieCompliance.session.title'),
		// 	description: LibraryClientUtility.$trans.t('strings.cookieCompliance.session.description'),
		// 	items: [
		// 		{
		// 			label: 'Active',
		// 			value: 'session',
		// 			isRequired: true
		// 		}
		// 	],
		// },
		{
			title: LibraryClientUtility.$trans.t('strings.cookieCompliance.analytics.title'),
			description: LibraryClientUtility.$trans.t('strings.cookieCompliance.analytics.description'),
			items: [
				{
					label: 'GoogleAnalytics',
					value: 'ga',
					isEnable: true
				},
			],
		},
		// {
		// 	title: LibraryClientUtility.$trans.t('strings.cookieCompliance.xsrf.title'),
		// 	description: LibraryClientUtility.$trans.t('strings.cookieCompliance.xsrf.description'),
		// 	items: [
		// 		{
		// 			label: 'XSRF-TOKEN',
		// 			value: 'performance',
		// 			isEnable: true
		// 		},
		// 	],
		// },
	];

	const displaySignIn = computed(() => {
		return !isLoggedIn && AppConstants.Features.Auth;
	});
	const info = computed(() => {
		let info = serviceStore.getters.getContentInfo();
		return info.sort((a, b) => a.order >= b.order);
	});
	// const links = computed(() => {
	// 	let temp = serviceStore.getters.getContent();
	// 	if (!temp)
	// 		return [];
	// 	if (!temp.links)
	// 		return [];
	// 	const links = temp.links.filter(l => String.isNullOrEmpty(l.category) || l.category === 'guidance');
	// 	if (!links)
	// 		return [];
	// 	links.push({
	// 		title : "menu.content.links.title",
	// 		link : "/links",
	// 		order : "99"
	// 	});
	// 	return links.sort((a, b) => a.order >= b.order);
	// });
	const tools = computed(() => {
		let tools = serviceStore.getters.getContentTools();
		return tools.sort((a, b) => a.order >= b.order);
	});

	const contentLink = (item,) => {
		if (item.markup)
			return `/content/info/${item.id}`;

		return item.link;
	};
	const contentTitle = (item,) => {
		return (item.markup ? item.title : LibraryClientUtility.$trans.t(item.title));
	};
	const dialogDisplayMarkupCancel = async () => {
		dialogDisplayMarkupSignal.value.cancel();
	};
	const dialogDisplayMarkupOk = async () => {
		dialogDisplayMarkupSignal.value.ok();
	};
	const markup = (correlationId, value) => {
		displayMarkupValue.value = value ? serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, value)) : null;
	};

	LibraryClientUtility.$EventBus.on('display-markup', (value) => {
		markup(correlationId(), value);
		dialogDisplayMarkupSignal.value.open();
	});

	onMounted(async () => {
		await serviceStore.dispatcher.requestContent(correlationId());
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
		features,
		closeOnContentClick,
		clickAbout,
		clickOpenSource,
		clickPrivcy,
		clickSignIn,
		clickSignOut,
		clickSupport,
		dialogSignOut,
		dialogSignOutOk,
		drawer,
		isAuthCompleted,
		isLoggedIn,
		serviceAuth,
		serviceStore,
		toggleDrawer,
		contentLink,
		contentTitle,
		dialogDisplayMarkupCancel,
		dialogDisplayMarkupOk,
		dialogDisplayMarkupSignal,
		displayMarkupValue,
		dialogNewCharacter,
		info,
		displaySignIn,
		// links,
		markup,
		preferences,
		serviceMarkup,
		tools
	};
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
