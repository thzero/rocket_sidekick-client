<script>
import { onMounted, ref, watch } from 'vue';

import { Chart, registerables } from 'chart.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useFlightToolsBaseComponent } from '@/components.app/content/tools/flightToolBase';

Chart.register(...registerables);

export function useFlightInfoChartBaseComponent(props, context, options) {
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
		setSuccessMessage
	} = useFlightToolsBaseComponent(props, context, options);
	
	const chart = ref(null);
	const chartContext = ref(null);
	const date = ref('');
	const location = ref(null);
	const otionsChart = ref({
		maintainAspectRatio: false,
		responsive: true,
		lineTension: 1,
		scales: {
			xAxis: {
				// afterTickToLabelConversion: function (data) {
				// 	const xLabels = data.ticks;
				// 	xLabels.forEach(function (labels, i) {
				// 		if (i % 2 == 1)
				// 			xLabels[i] = '';
				// 	});
				// },
				ticks: {
					autoSkip: true,
					autoSkipPadding: 6,
					maxRotation: 0,
					minRotation: 0
				}
			}
		}
		// plugins: {
		// 	title: {
		// 		display: true,
		// 		font: {
		// 			size: 16
		// 		},
		// 		text: ''
		// 	}
		// }
	});
	const title = ref('');

	watch(() => props.chartData,
		(flightInfo) => {
			// LibraryClientUtility.debug2(flightInfo);
			if (chart.value) {
				chart.value.destroy();
				chart.value = null;
			}

			if (flightInfo) {
				title.value = flightInfo.title ?? LibraryClientUtility.$trans.t('charts.flightInfo.title');
				date.value = flightInfo.date ?? '';
				location.value = flightInfo.location ?? '';

				// this.otionsChart.plugins.title.text = title + '\nsdfsdf';

				const chartTemp = {
					type: 'line',
					data: {
						labels: flightInfo.time,
						datasets: []
					},
					options: otionsChart.value
				};

				if (flightInfo.dataTypes.filtered) {
					chartTemp.data.datasets.push({
						type: 'line',
						data: flightInfo.altitude.dataF,
						label: LibraryClientUtility.$trans.t('charts.flightInfo.altitude.titleF'),
						borderColor: flightInfo.style.altitudeF,
						fill: false,
						pointRadius: 0
					});
				}
				if (flightInfo.dataTypes.actual) {
					chartTemp.data.datasets.push({
						type: 'line',
						data: flightInfo.altitude.data,
						label: LibraryClientUtility.$trans.t('charts.flightInfo.altitude.title'),
						borderColor: flightInfo.style.altitude,
						fill: false,
						pointRadius: 0
					});
				}

				if (flightInfo.dataTypes.filtered) {
					chartTemp.data.datasets.push({
						type: 'line',
						data: flightInfo.velocity.dataF,
						label: LibraryClientUtility.$trans.t('charts.flightInfo.velocity.titleF'),
						borderColor: flightInfo.style.velocityF,
						fill: false,
						pointRadius: 0
					});
				}
				if (flightInfo.dataTypes.actual) {
					chartTemp.data.datasets.push({
						type: 'line',
						data: flightInfo.velocity.data,
						label: LibraryClientUtility.$trans.t('charts.flightInfo.velocity.title'),
						borderColor: flightInfo.style.velocity,
						fill: false,
						pointRadius: 0
					});
				}

				chartTemp.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.apogee.data,
					label: LibraryClientUtility.$trans.t('charts.flightInfo.events.apogee'),
					borderColor: flightInfo.style.event.apogeeBorder,
					backgroundColor: flightInfo.style.event.apogee + '7F',
					borderWidth: 2,
					pointRadius: 10
				});
				// chartTemp.data.datasets.push({
				// 	type: 'scatter',
				// 	data: flightInfo.events.noseOver.data,
				// 	label: LibraryClientUtility.$trans.t('charts.flightInfo.events.noseOver'),
				// 	borderColor: '#FFFF00',
				// 	pointRadius: 10
				// });
				chartTemp.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.drogue.data,
					label: LibraryClientUtility.$trans.t('charts.flightInfo.events.drogue'),
					borderColor: flightInfo.style.event.drogueBorder,
					backgroundColor: flightInfo.style.event.drogue + '7F',
					pointRadius: 10
				});
				chartTemp.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.main.data,
					label: LibraryClientUtility.$trans.t('charts.flightInfo.events.main'),
					borderColor: flightInfo.style.event.mainBorder,
					backgroundColor: flightInfo.style.event.main + '7F',
					pointRadius: 10
				});

				chart.value = new Chart(chartContext.value, chartTemp);
			}
		}
	);

	onMounted(async () => {
		// this.otionsChart.plugins.title.text = LibraryClientUtility.$trans.t('charts.flightInfo.title');
		chartContext.value = document.getElementById('flight-info-chart-int');
		if (props.chartData)
			chart.value = new Chart(chartContext.value, props.chartData);
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
};
</script>
