import { createRouter, createWebHistory } from 'vue-router';

import GlobalUtility from '@thzero/library_client/utility/global';

const routes = [
	{
		path: '/',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import('./components/Home.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/home',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/Home.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/flightInfo',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/tools/FlightInfo.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/flightPath',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/tools/FlightPath.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/thrust2Weight',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/tools/Thrust2Weight.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	// {
	// 	path: '/admin',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ '@/library_vue_quasar/layouts/AdminLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'admin',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ './components/admin/Admin.vue'),
	// 			meta: {
	// 				requiresAuth: true
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/openSource',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'openSource',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './components/OpenSource.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/settings',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'settings',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './components/Settings.vue'),
				meta: {
					requiresAuth: true
				}
			}
		]
	},
	{
		path: '/support',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'support',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
				meta: {
					requiresAuth: true
				}
			}
		]
	},
	{
		path: '/auth',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ '@/library_vue_quasar/layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'auth',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ './components/Auth.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/notFound',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_quasar/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'notFound',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/:pathMatch(.*)',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-blank" */ '@/library_vue_quasar/layouts/BlankLayout.vue'),
		meta: {
			notFound: true,
			requiresAuth: false
		}
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_quasar/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'notFound',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	}
];

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(process.env.BASE_URL),
	routes
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		GlobalUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
