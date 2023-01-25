<script>
import { computed, onMounted, ref } from 'vue';

import Constants from '@/constants';

import { useContentBaseComponent } from '@/components/content/contentBase';

export function use3DPrintingBaseComponent(props, context, options) {
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

	// const slides = ref([
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20230119_194542677.jpg',
	// 		desc: 'Electronics for two Eggtimer Quantum or Featherweight Raven altimeters'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20230122_174744273.jpg',
	// 		desc: 'Electronics Bay for two MissileWorks RRC3 altimeters'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20221205_164103587.jpg',
	// 		desc: 'Fin Guide for bonding fins'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20220224_145008984.jpg',
	// 		desc: '3D printed fins with built in airfoil'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20210922_231341112.jpg',
	// 		desc: 'Mobius Mini 2 Camera external holder'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20230109_163038385.jpg',
	// 		desc: 'Ejection charge cannister'
	// 	},
	// 	{
	// 		type: 'image',
	// 		url: Constants.External.imnages + '/3dprinting/PXL_20230119_214200985.jpg',
	// 		desc: 'Holder for electronics such as GPS trackers'
	// 	}
	// ]);
	// const textChartDesc = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.chartDesc'));
	// const textDesc = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.desc'));
	// const textDefinition = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.whatIs'));
	// const textMarkup = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.guidance1'));
	// const textGuidance2 = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.guidance2'));
	// const textGuidance3 = ref(GlobalUtility.$trans.t('strings.content.info.3dprinting.guidance3'));
	
	const content = ref(null);
	const textChartDesc = ref(null);
	const textDesc = ref(null);
	const textDefinition = ref(null);
	const textMarkup = ref(null);
	
	// const content = computed(() => {
	// 	let temp = serviceStore.getters.getContent();
	// 	if (!temp)
	// 		return [];
	// 	if (!temp.info)
	// 		return [];
	// 	const content = temp.info.find(l => l.id === '3dprinting');
	// 	return content;
	// });
	const data = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.data)
			return [];
		return content.value.supplemental.data;
	});
	const haveLinks = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.links)
			return false;
		return content.value.supplemental.links.length > 0;
	});
	const links = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.links)
			return [];
		return content.value.supplemental.links;
	});
	const linksCollections = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'collections');
	});
	const linksGeneral = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => String.isNullOrEmpty(l.category));
	});
	const linksModeling = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'modeling');
	});
	const linksTools = computed(() => {
		if (!links.value)
			return [];
		return links.value.filter(l => l.category === 'tools');
	});
	const slides = computed(() => {
		if (!content.value || !content.value.supplemental || !content.value.supplemental.slides)
			return [];
		return content.value.supplemental.slides;
	});

	const slideUrl = (url) => {
		return Constants.External.imnages + url;
	};
	const temperature = (tempF, tempC) => {
		if (String.isNullOrEmpty(tempC))
			return null;
		let temp = `${tempC}&#8451;`;
		if (!String.isNullOrEmpty(tempF))
			temp += ` (${tempF})&#8457;`;
		return temp;
	};

	onMounted(async () => {
		const response = await serviceStore.dispatcher.requestContentMarkup(correlationId(), 'info.3dprinting');
		if (hasFailed(response))
			return;
		content.value = response.results;

		textChartDesc.value = response.results.descriptionChart;
		textDesc.value = response.results.description;
		textDefinition.value = response.results.definition;
		textMarkup.value = response.results.markup;
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
		textChartDesc,
		textDesc,
		textDefinition,
		textMarkup,
		content,
		data,
		haveLinks,
		links,
		linksCollections,
		linksGeneral,
		linksModeling,
		linksTools,
		slides,
		slideUrl,
		temperature
	};
};
</script>