import { createRouter, createWebHistory } from 'vue-router';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import(/* webpackChunkName: "group-main" */ './components/Home.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/content/info/3dprinting',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_info_3dprinting',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_info_3dprinting',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components.app/content/info/3DPrinting.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/info/epoxy',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_info_epoxy',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_info_epoxy',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components.app/content/info/Epoxy.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/info/highPower',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_info_highPower',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_info_highPower',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components.app/content/info/HighPower.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/info/shearPins',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_info_shear_pins',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_info_shear_pins',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components.app/content/info/ShearPins.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/info/:id',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_info',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_info',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/info/InfoMarkup.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/links',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_links',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_links',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/Links.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/flightInfo',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_flightInfo',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ToolsLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_flightInfo',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components.app/content/tools/flightInfo/FlightInfo.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/flightPath',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_flightPath',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ToolsLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_flightPath',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components.app/content/tools/flightPath/FlightPath.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/foam',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_foam',
				component: () => import(/* webpackPrefetch: true */  /* webpackChunkName: "group-layouts" */'./layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_foam',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components.app/content/tools/Foam.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/parachuteSizing',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_parachuteSizing',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_parachuteSizing',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components/content/tools/ParachuteSizing.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/thrust2Weight',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_thrust2Weight',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_thrust2Weight',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components/content/tools/Thrust2Weight.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/content/tools/weathercocking',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_tools_weahtercocking',
				component: () => import(/* webpackPrefetch: true */  /* webpackChunkName: "group-layouts" */'./layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_tools_weahtercocking',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-tools" */ './components/content/tools/Weathercocking.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/landing',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'mobileapp',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'mobileapp',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-mobile-app" */ './components.app/MobileAppLanding.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/rocket/:id',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rocket_info',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rocket_info',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/gallery/rocket/Gallery.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/rockets',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rockets',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rockets',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/gallery/Gallery.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/user/checklists',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_checklists',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_checklists',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/checklists/Checklists.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/altimeters',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_altimeters',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_altimeters',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/altimeters/Altimeters.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/chuteProtectors',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_chute_protectors',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_chute_protectors',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/chuteProtectors/ChuteProtectors.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/chuteReleases',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_chute_releases',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_chute_releases',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/chuteReleases/ChuteReleases.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/deploymentBags',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_deployment_bags',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_deployment_bags',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/deploymentBags/DeploymentBags.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/inventory',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_inventory_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_inventory_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/inventory/Inventory.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/launches',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_launches_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_launches_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/launches/Launches.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/locations/:id',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_location_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_location_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/locations/Locations.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/user/locations',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_locations_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_locations_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/locations/Locations.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/parachutes',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_parachutes',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_parachutes',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/parachutes/Parachutes.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/streamers',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_streamers',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_streamers',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/streamers/Streamers.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/trackers',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_trackers',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_trackers',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/parts/trackers/Trackers.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/rockets/:id',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rocket_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rocket_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/library/Rockets.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/user/rockets',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rockets_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rockets_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/library/Rockets.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/user/rocketsetups/:id',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rocketsetup_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rocketsetup_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/setups/RocketSetups.vue'),
						meta: {
							requiresAuth: false
						}
					}
				]
			}
		]
	},
	{
		path: '/user/rocketsetups',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'content_rocketsetups_user',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/ContentLayout.vue'),
				children: [
					{
						path: '',
						name: 'content_rocketsetups_user',
						component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-content-info" */ './components/content/rockets/setups/RocketSetups.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			}
		]
	},
	{
		path: '/openSource',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'openSource',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/OpenSource.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/privacy',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'privacy',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Privacy.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/settings',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'settings',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Settings.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/about',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'about',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/About.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/support',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'support',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},{
		path: '/auth',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ '@thzero/library_client_vue3_vuetify3/layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'auth',
				component: () => import('./components/Auth.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/admin',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ '@thzero/library_client_vue3_vuetify3/layouts/AdminLayout.vue'),
		children: [
			{
				path: '',
				name: 'admin',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ './components.app/admin/Admin.vue'),
				meta: {
					requiresAuth: true,
					requiresAuthRoles: [ 'admin' ]
				}
			}
		]
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import(/* webpackChunkName: "group-layouts" */ '@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'notFound',
				component: () => import(/* webpackChunkName: "group-main" */ '@thzero/library_client_vue3_vuetify3/components/VtNotFound.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	// {
	// 	path: '/:catchAll(.*)*',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'notFound',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@thzero/library_client_vue3_vuetify3/components/VNotFound.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// }
];

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(process.env.BASE_URL),
	routes
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		LibraryClientUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
