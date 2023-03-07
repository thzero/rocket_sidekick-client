<template>
	<v-row dense style="overflow: auto; max-height: 100vh;">
		<v-col
			cols="12"
			style="overflow: overflow-y; height: 150px;"
		>
			<v-code lang="javascript">
				<template
					v-for="value in modelValue"
				>
					{{ value }}<br/>
				</template>
			</v-code>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" class="text-right mt-4">
			{{ $t('strings.poweredBy') }} <a href="https://mathjs.org" target="_blank"><img src="/images/mathjs_330x100.png" height="24" alt="MathJs" /></a>
		</v-col>
	</v-row>
</template>

<script>
import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useCalculationOutputBaseProps } from '@/components/content/tools/calculationOutputBaseProps';

export default {
	name: 'CalculatedOuput',
	props: {
		...useCalculationOutputBaseProps
	},
	setup (props, context) {
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

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success
		};
	}
};
</script>
