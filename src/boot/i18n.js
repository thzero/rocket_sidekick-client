import VueBasei18n from '@thzero/library_client_vue3/boot/basei18n';

const resources = {};
const locales = ['en'];
const modules = import.meta.globEager('@/locales/*.json');
locales.forEach(locale => {
	resources[locale] = modules[`/src/locales/${locale}.json`];
});

export default class AppVueBasei18n extends VueBasei18n {
	_initMessages() {
		return resources;
	}
}
