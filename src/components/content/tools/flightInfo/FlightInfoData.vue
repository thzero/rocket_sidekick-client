<template>
	<table class="measurements" style="width: 100%;">
		<tr>
			<th>{{ $t('charts.flightInfo.flightTime') }}</th>
			<td><span>{{ flightInfoInner?.events?.ground?.time }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th>{{ $t('charts.flightInfo.altitude.max') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.altitude?.max, flightInfoInner?.altitude?.maxF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.events.title') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.apogee') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.events?.apogee?.altitude, flightInfoInner?.events?.apogee?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.events?.apogee?.time, flightInfoInner?.events?.apogee?.timeF) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.noseOver') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.events?.noseOver?.altitude, flightInfoInner?.events?.noseOver?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.events?.noseOver?.time, flightInfoInner?.events?.noseOver?.timeF) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.drogue') }}</th>
			<td>
				<span
					v-if="flightInfoInner?.events?.drogue?.fired"
				>
					<span>{{ formatNumber(valueType(flightInfoInner?.events?.drogue?.altitude, flightInfoInner?.events?.drogue?.altitude)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.events?.drogue?.time, flightInfoInner?.events?.drogue?.timeF) }}</span>{{ measurementTime }}
				</span>
				<span
					v-if="!flightInfoInner?.events?.drogue?.fired"
				>
					{{ $t('charts.flightInfo.events.notDetected') }}
				</span>
			</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.main') }}</th>
			<td>
				<span
					v-if="flightInfoInner?.events?.main?.fired"
				>
					<span>{{ formatNumber(valueType(flightInfoInner?.events?.main?.altitude, flightInfoInner?.events?.main?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.events?.main?.time, flightInfoInner?.events?.main?.time) }}</span>{{ measurementTime }}
				</span>
				<span
					v-if="!flightInfoInner?.events?.main?.fired"
				>
					{{ $t('charts.flightInfo.events.notDetected') }}
				</span>
			</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.velocity.title') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.ascent') }}</th>
		</tr>
		<tr>
			<th class="subSep">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.max?.value, flightInfoInner?.velocity?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.max?.time, flightInfoInner?.velocity?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.max?.altitude, flightInfoInner?.velocity?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.avg?.value, flightInfoInner?.velocity?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr style="display: none;">
			<th class="subSep">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.value, flightInfoInner?.velocity?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.min?.time, flightInfoInner?.velocity?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.altitude, flightInfoInner?.velocity?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.descent') }}</th>
		</tr>
		<tr>
			<th
				class="subTitleSep2"
				:colspan="flightInfoInner?.events?.drogue?.fired ? 2 : 0"
			>
				{{ $t('charts.flightInfo.events.drogue') }}
			</th>
			<td
				v-if="!flightInfoInner?.events?.drogue?.fired"
			>
				{{ $t('charts.flightInfo.events.notDetected') }}
			</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired || flightInfoInner?.events?.noseOver?.achieved"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.drogue?.max?.value, flightInfoInner?.velocity?.min?.drogue?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.min?.drogue?.max?.time, flightInfoInner?.velocity?.min?.drogue?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.drogue?.max?.altitude, flightInfoInner?.velocity?.min?.drogue?.max?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired || flightInfoInner?.events?.noseOver?.achieved"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.drogue?.min?.value, flightInfoInner?.velocity?.min?.drogue?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.min?.drogue?.min?.time, flightInfoInner?.velocity?.min?.drogue?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.drogue?.min?.altitude, flightInfoInner?.velocity?.min?.drogue?.min?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired || flightInfoInner?.events?.noseOver?.achieved"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.drogue?.avg?.value, flightInfoInner?.velocity?.min?.drogue?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr>
			<th
				class="subTitleSep2"
				:colspan="flightInfoInner?.events?.main?.fired ? 2 : 0"
			>
				{{ $t('charts.flightInfo.events.main') }}
			</th>
			<td
				v-if="!flightInfoInner?.events?.main?.fired"
			>
				{{ $t('charts.flightInfo.events.notDetected') }}
			</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.main?.max?.value, flightInfoInner?.velocity?.min?.main?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.min?.main?.max?.time, flightInfoInner?.velocity?.min?.main?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.main?.max?.altitude, flightInfoInner?.velocity?.min?.main?.max?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.main?.min?.value, flightInfoInner?.velocity?.min?.main?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.velocity?.min?.main?.min?.time, flightInfoInner?.velocity?.min?.main?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.main?.min?.altitude, flightInfoInner?.velocity?.min?.main?.min?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.velocity?.min?.main?.avg?.value, flightInfoInner?.velocity?.min?.main?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.acceleration') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.max?.value, flightInfoInner?.acceleration?.max?.value)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.max?.time, flightInfoInner?.acceleration?.max?.time) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.max?.altitude, flightInfoInner?.acceleration?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.value, flightInfoInner?.acceleration?.min?.value)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.min?.time, flightInfoInner?.acceleration?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.altitude, flightInfoInner?.acceleration?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.descent') }}</th>
		</tr>
		<tr>
			<th
				class="subTitleSep2"
				:colspan="flightInfoInner?.events?.drogue?.fired ? 2 : 0"
			>
				{{ $t('charts.flightInfo.events.drogue') }}
			</th>
			<td
				v-if="!flightInfoInner?.events?.drogue?.fired"
			>
				{{ $t('charts.flightInfo.events.notDetected') }}
			</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.drogue?.max?.value, flightInfoInner?.acceleration?.min?.drogue?.max?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.min?.drogue?.max?.time, flightInfoInner?.acceleration?.min?.drogue?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.drogue?.max?.altitude, flightInfoInner?.acceleration?.min?.drogue?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.drogue?.min?.value, flightInfoInner?.acceleration?.min?.drogue?.min?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.min?.drogue?.min?.time, flightInfoInner?.acceleration?.min?.drogue?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.drogue?.min?.altitude, flightInfoInner?.acceleration?.min?.drogue?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.drogue?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.drogue?.avg?.value, flightInfoInner?.acceleration?.min?.drogue?.avg?.valueF)) }}</span>{{ measurementAcceleration }}</td>
		</tr>
		<tr>
			<th
				class="subTitleSep2"
				:colspan="flightInfoInner?.events?.main?.fired ? 2 : 0"
			>
				{{ $t('charts.flightInfo.events.main') }}
			</th>
			<td
				v-if="!flightInfoInner?.events?.main?.fired"
			>
				{{ $t('charts.flightInfo.events.notDetected') }}
			</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.main?.max?.value, flightInfoInner?.acceleration?.min?.main?.max?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.min?.main?.max?.time, flightInfoInner?.acceleration?.min?.main?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.main?.max?.altitude, flightInfoInner?.acceleration?.min?.main?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.main?.min?.value, flightInfoInner?.acceleration?.min?.main?.min?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfoInner?.acceleration?.min?.main?.min?.time, flightInfoInner?.acceleration?.min?.main?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.main?.min?.altitude, flightInfoInner?.acceleration?.min?.main?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr
			v-if="flightInfoInner?.events?.main?.fired"
		>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfoInner?.acceleration?.min?.main?.avg?.value, flightInfoInner?.acceleration?.min?.main?.avg?.valueF)) }}</span>{{ measurementAcceleration }}</td>
		</tr>
	</table>
</template>

<script>
import { useFlightInfoDataBaseComponent } from '@/components/content/tools/flightInfo/flightInfoDataBase';
import { useFlightInfoDataBaseProps } from '@/components/content/tools/flightInfo/flightInfoDataBaseProps';

export default {
	name: 'flightInfoData',
	props: {
		...useFlightInfoDataBaseProps
	},
	// extends: toolBase,
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
			sortByOrder,
			target,
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			dateFormat,
			dateFormatMask,
			calculateI,
			formatNumber,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
			flightInfoInner,
			measurementUnits,
			measurementAcceleration,
			measurementAltitude,
			measurementTime,
			measurementVelocity,
			valueType
		} = useFlightInfoDataBaseComponent(props, context);

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
			content,
			contentTitle,
			errors,
			errorMessage,
			errorTimer,
			hasAttribution,
			measurementUnitsIdOutput,
			measurementUnitsIdSettings,
			notifyColor,
			notifyMessage,
			notifySignal,
			notifyTimeout,
			settings,
			dateFormat,
			dateFormatMask,
			calculateI,
			formatNumber,
			handleListener,
			handleAttribution,
			initCalculationOutput,
			initCalculationResults,
			resetFormI,
			setErrorMessage,
			setErrorTimer,
			setNotify,
			toFixed,
			flightInfoInner,
			measurementUnits,
			measurementAcceleration,
			measurementAltitude,
			measurementTime,
			measurementVelocity,
			valueType
		};
	}
};
</script>

<style scoped>
.measurements th {
	font-weight: bold;
	padding-right: 10px;
	text-align: left;
}

.subSep {
	padding-left: 16px;
}

.subSep2 {
	padding-left: 24px;
}

.subSep3 {
	padding-left: 32px;
}

.subTitleSep {
	padding-left: 8px;
}

.subTitleSep2 {
	padding-left: 16px;
}
</style>
