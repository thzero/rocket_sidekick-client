<template>
	<div>
		<v-row
			dense
			v-if="date"
		>
			<v-col cols="6" class="text-h6 text-left pl-2">
				{{ title }}
			</v-col>
			<v-col cols="6" class="text-h6 text-right pr-2">
				{{ date }}
			</v-col>
		</v-row>
		<v-row
			dense
			v-if="!date"
		>
			<v-col cols="12" class="text-h6 text-left pl-2">
				{{ title }}
			</v-col>
		</v-row>
		<v-row
			dense
			v-if="location"
		>
			<v-col cols="12" class="text-center text-subtitle1 text-left pl-2">
				{{ location }}
			</v-col>
		</v-row>
	</div>
	<div style="min-height: 800px;">
		<canvas id="flight-info-chart-int"></canvas>
	</div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

import { useFlightInfoChartBaseComponent } from '@/components.app/content/tools/flightInfo/charts/flightInfoChartBase';
import { useFlightInfoChartBaseProps } from '@/components.app/content/tools/flightInfo/charts/flightInfoChartBaseProps';

Chart.register(...registerables);

export default {
	name: 'FlightInfoChart',
	props: {
		...useFlightInfoChartBaseProps
	},
	// extends: base,
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
			serviceStore,
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setNotify,
			setSuccessMessage,
			chart,
			chartContext,
			date,
			location,
			otionsChart,
			title
		} = useFlightInfoChartBaseComponent(props, context);

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
			contentLoadStart,
			contentLoadStop,
			sortByOrder,
			target,
			calculationOutput,
			content,
			contentTitle,
			errors,
			errorMessage,
			hasAttribution,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			calculateI,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setNotify,
			setSuccessMessage,
			chart,
			chartContext,
			date,
			location,
			otionsChart,
			title
		};
	}
};
</script>
