<template>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<v-toolbar
				density="compact"
			>
				<v-toolbar-title class="text-center text-h5">
					<span>{{ $t('titles.openSource') }}</span>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<VOpenSource
				v-model="openSource"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';

import { useBaseComponent } from '@/library_vue/components/base';

import VOpenSource from '@/library_vue_vuetify/components/VOpenSource';

export default {
	name: 'OpenSource',
	components: {
		VOpenSource
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
			success
		} = useBaseComponent(props, context);

		const openSource = ref([
			{
				category: 'client',
				name: 'chart.js',
				url: 'https://github.com/chartjs/Chart.js',
				licenseName: 'MIT',
				licenseUrl: 'https://github.com/chartjs/Chart.js/blob/master/LICENSE.md'
			},
			{
				category: 'client',
				name: 'convert-units',
				url: 'https://github.com/convert-units/convert-units',
				licenseName: 'MIT',
				licenseUrl: 'https://github.com/convert-units/convert-units/blob/main/LICENSE'
			},
			// {
			//	 category: 'client',
			//	 name: 'decimal.js',
			//	 url: 'https://github.com/MikeMcl/decimal.js/',
			//	 licenseName: 'MIT',
			//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
			// },
			// {
			// 	category: 'client',
			// 	name: 'decimal.js',
			// 	url: 'https://github.com/MikeMcl/decimal.js-light',
			// 	licenseName: 'MIT',
			// 	licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
			// },
			{
				category: 'client',
				name: 'html2canvas',
				url: 'https://github.com/niklasvh/html2canvas',
				licenseName: 'MIT',
				licenseUrl: 'https://github.com/niklasvh/html2canvas/blob/master/LICENSE'
			},
			{
				category: 'client',
				name: 'mathjs',
				url: 'https://github.com/josdejong/mathjs',
				licenseName: 'Apache 2.0',
				licenseUrl: 'https://github.com/josdejong/mathjs/blob/develop/LICENSE'
			},
			{
				category: 'client',
				name: 'papaparse',
				url: 'https://github.com/mholt/PapaParse',
				licenseName: 'MIT',
				licenseUrl: 'https://github.com/mholt/PapaParse/blob/master/LICENSE'
			},
			{
				category: 'client',
				name: 'rocket_sidekick-client',
				url: 'https://github.com/thzero/rocket_sidekick-client',
				licenseName: 'MIT',
				licenseUrl: 'https://github.com/thzero/rocket_sidekick-client/blob/master/license.md'
			},
			{
				category: 'client',
				name: 'thenBy.js',
				url: 'https://github.com/Teun/thenBy.js',
				licenseName: 'Apache License 2.0',
				licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
			}
		]);

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
			openSource
		};
		// const {
		// 	correlationId,
		// 	error,
		// 	hasFailed,
		// 	hasSucceeded,
		// 	initialize,
		// 	logger,
		// 	noBreakingSpaces,
		// 	notImplementedError,
		// 	success,
		// 	combineDependencies,
		// 	data,
		// 	dependenciesClient,
		// 	dependenciesServer,
		// 	initializeDependenciesClientBase,
		// 	key,
		// 	serviceStore
		// } = useFrameworkOpenSourceComponent(props, context, () => {
		// 	return [
		// 		{
		// 			category: 'client',
		// 			name: 'chart.js',
		// 			url: 'https://github.com/chartjs/Chart.js',
		// 			licenseName: 'MIT',
		// 			licenseUrl: 'https://github.com/chartjs/Chart.js/blob/master/LICENSE.md'
		// 		},
		// 		{
		// 			category: 'client',
		// 			name: 'convert-units',
		// 			url: 'https://github.com/convert-units/convert-units',
		// 			licenseName: 'MIT',
		// 			licenseUrl: 'https://github.com/convert-units/convert-units/blob/main/LICENSE'
		// 		},
		// 		// {
		// 		//	 category: 'client',
		// 		//	 name: 'decimal.js',
		// 		//	 url: 'https://github.com/MikeMcl/decimal.js/',
		// 		//	 licenseName: 'MIT',
		// 		//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
		// 		// },
		// 		// {
		// 		// 	category: 'client',
		// 		// 	name: 'decimal.js',
		// 		// 	url: 'https://github.com/MikeMcl/decimal.js-light',
		// 		// 	licenseName: 'MIT',
		// 		// 	licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
		// 		// },
		// 		{
		// 			category: 'client',
		// 			name: 'html2canvas',
		// 			url: 'https://github.com/niklasvh/html2canvas',
		// 			licenseName: 'MIT',
		// 			licenseUrl: 'https://github.com/niklasvh/html2canvas/blob/master/LICENSE'
		// 		},
		// 		{
		// 			category: 'client',
		// 			name: 'mathjs',
		// 			url: 'https://github.com/josdejong/mathjs',
		// 			licenseName: 'Apache 2.0',
		// 			licenseUrl: 'https://github.com/josdejong/mathjs/blob/develop/LICENSE'
		// 		},
		// 		{
		// 			category: 'client',
		// 			name: 'papaparse',
		// 			url: 'https://github.com/mholt/PapaParse',
		// 			licenseName: 'MIT',
		// 			licenseUrl: 'https://github.com/mholt/PapaParse/blob/master/LICENSE'
		// 		},
		// 		{
		// 			category: 'client',
		// 			name: 'rocket_sidekick-client',
		// 			url: 'https://github.com/thzero/rocket_sidekick-client',
		// 			licenseName: 'MIT',
		// 			licenseUrl: 'https://github.com/thzero/rocket_sidekick-client/blob/master/license.md'
		// 		},
		// 		{
		// 			category: 'client',
		// 			name: 'thenBy.js',
		// 			url: 'https://github.com/Teun/thenBy.js',
		// 			licenseName: 'Apache License 2.0',
		// 			licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
		// 		}
		// 	];
		// });

		// return {
		// 	correlationId,
		// 	error,
		// 	hasFailed,
		// 	hasSucceeded,
		// 	initialize,
		// 	logger,
		// 	noBreakingSpaces,
		// 	notImplementedError,
		// 	success,
		// 	combineDependencies,
		// 	data,
		// 	dependenciesClient,
		// 	dependenciesServer,
		// 	initializeDependenciesClientBase,
		// 	key,
		// 	serviceStore
		// };
	}
};
</script>
