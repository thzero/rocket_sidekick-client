import '@mdi/font/css/materialdesignicons.css'
// import { aliases, fa } from 'vuetify/iconsets/fa';
// import { mdi } from 'vuetify/iconsets/mdi';
// import 'animate.css';

import 'vuetify/styles';

import bootStarter from '@thzero/library_client_firebase_vue/boot/starter';
// import bootAsyncComputed from '@thzero/library_client_vue3/boot/asyncComputed';
import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootNetwork from '@/boot/network';
// import bootServices from '@/boot/services';
import bootServices from '@/boot.app/services';
import bootUi from '@thzero/library_client_vue3_vuetify3/boot/ui';
// import bootUi from '@/boot/ui';
import bootValidate from '@/boot/validate';
// import bootWebComponents from '@thzero/library_client_vue3/boot/webComponents';
import bootCookieComply from '@thzero/library_client_vue3_vuetify3/boot/cookie';

import router from '@/router';

import store from '@/store/pinia'; // STORE TYPE
// import storeSetup from '@/store/vuex'; // STORE TYPE

import start from '@thzero/library_client_vue3/boot/main';

import App from '@/components/App.vue';

// let darkMode = false;
// let theme = 'lightTheme';
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
// 	darkMode = true;
//     theme = 'darkTheme';
// 	alert('hi')
// }

const defaultThemeDark = {
	dark: true,
	colors: {
		primary: '#0a6fc2',
		'primary-darken-1': '#3700B3',
		secondary: '#03a9f4',
		'secondary-darken-1': '#018786',
		accent: '#00bcd4',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
};
const defaultTheme = {
	dark: false,
	colors: {
		primary: '#2196f3',
		'primary-darken-1': '#3700B3',
		secondary: '#03a9f4',
		'secondary-darken-1': '#018786',
		accent: '#00bcd4',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
};
const redThemeDark = {
	dark: true,
	colors: {
		primary: '#0a6fc2',
		'primary-darken-1': '#3700B3',
		secondary: '#03a9f4',
		'secondary-darken-1': '#018786',
		accent: '#00bcd4',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
};
const redTheme = {
	dark: false,
	colors: {
		primary: '#2196f3',
		'primary-darken-1': '#3700B3',
		secondary: '#03a9f4',
		'secondary-darken-1': '#018786',
		accent: '#00bcd4',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
};

start(App, router, store, [ booti18n, bootEventBus, bootNetwork, bootServices, bootValidate, bootUi, bootCookieComply ], bootStarter, {
	vuetify: {
		// icons: {
		// 	defaultSet: 'mdi',
		// 	aliases,
		// 	sets: {
		// 		fa,
		// 		mdi,
		// 	}
		// },
		theme: {
			// defaultTheme: theme,
			defaultTheme: 'defaultTheme',
			// dark: true,
			themes: {
				defaultTheme,
				defaultThemeDark,
				redTheme,
				redThemeDark,
			},
		},
	}
});
