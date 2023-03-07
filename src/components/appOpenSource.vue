<script>
import { ref } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useAppOpenSourceComponent(props, context, options) {
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
	} = useBaseComponent(props, context, options);

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
};
</script>
