<script>
import { computed, onMounted, ref } from 'vue';

import AppConstants from '@/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useHomeBaseComponent(props, context, options) {
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
	} = useBaseComponent(props, context, options);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const externalGithub = ref(AppConstants.External.github);
	const initializeCompleted = ref(false);

	const contentDescription = (item,) => {
		return (item.markup ? item.description : LibraryClientUtility.$trans.t(item.description));
	};
	const contentLink = (item,) => {
		if (item.markup)
			return `/content/info/${item.id}`;

		return item.link;
	};
	const contentTitle = (item,) => {
		return (item.markup ? item.title : LibraryClientUtility.$trans.t(item.title));
	};

	const hasContent = computed(() => {
		return serviceStore.getters.getContent() !== null;
	});
	const info = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.info)
			return [];
		return temp.info.sort((a, b) => a.order >= b.order);
	});
	const tools = computed(() => {
		let temp = serviceStore.getters.getContent();
		if (!temp)
			return [];
		if (!temp.tools)
			return [];
		return temp.tools.sort((a, b) => a.order >= b.order);
	});
	const isLoggedIn = computed(() => {
		return serviceStore.user && serviceStore.userAuthIsLoggedIn;
	});
	const newsCount = computed(() => {
		if (!serviceStore.news.latest)
			return 0;

		const news = serviceStore.news.latest.slice(0);
		return news.length;
	});
	const user = computed(() => {
		return serviceStore.user;
	});
	const userDisplayName = computed(() => {
		return AppUtility.userDisplayName(correlationId(), serviceStore.user);
	});

	LibraryClientUtility.$EventBus.on('initialize-completed', (value) => {
		initializeCompleted.value = value;
	});

	onMounted(async () => {
		await serviceStore.dispatcher.requestContent(correlationId());

		// // Selecting the iframe element
		const iframe = document.getElementById('slideshow');
		// // Adjusting the iframe height onload event
		// // frame.onload = function()
		// // function execute while load the iframe
		// iframe.addEventListener('load', function() {
		// 	iframe.style.height = (Number(iframe.style.width.replace('%')) * 0.75) + 'px';
		// 	// iframe.style.width = iframe.contentWindow.body.scrollWidth + 'px';
		// });
		iframe.src = 'https://docs.google.com/presentation/d/e/2PACX-1vRrKdGwne8BdKJMwMtVG1NZxVtmVOQ_ps5FBnFY85xeRX50vCJGkJQ74Pn7D46f4tqPXk287QhHwype/embed?start=true&loop=false&delayms=3000';
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
		externalGithub,
		contentDescription,
		contentLink,
		contentTitle,
		hasContent,
		info,
		initializeCompleted,
		isLoggedIn,
		newsCount,
		serviceStore,
		tools,
		user,
		userDisplayName
	};
};
</script>
