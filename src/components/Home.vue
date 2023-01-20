<template>
	<div>
		<v-row
			dense
			:pt-4="$vuetify.display.smAndDown && newsCount > 0"
			:pt-2="$vuetify.display.mdAndUp || newsCount === 0"
		>
			<v-col
				md="6"
				lg="4"
				xl="4"
				class="pb-4"
				v-if="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>
					<v-card-item>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-item>
				</v-card>
				<News />
			</v-col>
			<v-col
				col="12"
				md="6"
				lg="8"
				xl="8"
				:pl-2="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>	
					<v-card-item>
						<v-row dense>
							<v-col
								cols="12"
							>
								<div class="text-center text-h5">
									{{ $t('strings.welcome') }} {{ $t('titles.application') }} {{ userDisplayName }}
									<!-- <v-chip
										class="float-right"
										color="success"
										outlined
										label
									>
										{{ userDisplayName }}
									</v-chip> -->
								</div>
							</v-col>
							<v-col
								cols="12"
							>
								<p>
									{{ $t('strings.content.welcome') }}<br><br>
								</p>
								<p
									v-if="hasContent"
								>
									{{ $t('strings.content.welcomeTools') }}
								</p>
							</v-col>
							<v-col
								v-if="hasContent"
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-if="hasContent"
								v-for="item in tools"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card class="mb-2" variant="outlined">
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="contentLink(item)"
										>
											{{ contentTitle(item) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ contentDescription(item) }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								v-if="hasContent"
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								v-for="item in info"
								:key="item.name"
								cols="12"
								md="6"
								lg="4"
								class="text-center"
							>
								<v-card class="mb-2" variant="outlined">
									<v-card-item>
										<v-btn variant="flat" block class="mr-2" color="primary"
											:to="contentLink(item)"
										>
											{{ contentTitle(item) }}
										</v-btn>
									</v-card-item>
									<v-card-text class="text-left">
										{{ contentDescription(item) }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								cols="12"
								class="mt-4 mb-4"
							>
								<p>
									{{ $t('strings.content.welcome3') }}
								</p>
							</v-col>
							<v-col
								cols="12"
							>
								<div class="slideshow">
									<iframe id="slideshow" frameborder="0" class="slideshowFrame"></iframe>
								</div>
							</v-col>
							<!-- 
							<v-col
								cols="12"
								class="text-center"
							>
								<hr />
							</v-col>
							<v-col
								cols="12"
							>
								<p>
									{{ $t('strings.content.welcome1a') }}
									<a :href="externalGithub" target="_blank">{{ externalGithub }}</a>
									{{ $t('strings.content.welcome1b') }}
								</p>
							</v-col> 
							-->
						</v-row>
					</v-card-item>
				</v-card>
			</v-col>
			<v-col
				v-if="$vuetify.display.smAndDown"
				id="element"
				cols="12"
				class="pb-4"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-text>
				</v-card>
				<News />
			</v-col>
		</v-row>
		<VLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import News from '@/components/News';
import VLoadingOverlay from '@/library_vue_vuetify/components/VLoadingOverlay';

const DelayMs = 0; // 250

export default {
	name: 'AppHome',
	components: {
		News,
		VLoadingOverlay
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
		} = useBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);

		const externalGithub = ref(Constants.External.github);
		const initializeCompleted = ref(false);

		const contentDescription = (item,) => {
			return (item.markup ? item.description : GlobalUtility.$trans.t(item.description));
		};
		const contentLink = (item,) => {
			if (item.markup)
				return `/content/info/${item.id}`;
			
			return item.link;
		};
		const contentTitle = (item,) => {
			return (item.markup ? item.title : GlobalUtility.$trans.t(item.title));
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

		GlobalUtility.$EventBus.on('initialize-completed', (value) => {
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
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// For example, for a route with dynamic params `/foo/:id`, when we
		// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
		// will be reused, and this hook will be called when that happens.
		// has access to `this` component instance.
		(async () => {
			const self = this;
			try {
				this.initializeCompleted = false;

				const correlationId = this.correlationId();

				await Promise.all([
					GlobalUtility.$store.dispatcher.news.getLatest(correlationId)
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					self.initializeCompleted = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
		next();
	}
};
</script>

<style>
.slideshow {
    width: 100%;
    height: 0;
    padding-bottom: 56%; /* Change this till it fits the dimensions of your video */
    position: relative;
}

.slideshowFrame {
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
}
</style>
