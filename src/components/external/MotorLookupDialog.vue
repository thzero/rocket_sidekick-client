<template>
	<VFormListingDialog
		ref="dialogMotorLookup"
		:label="$t('titles.external.motorSearch')"
		:signal="signal"
		:preCompleteOk="preCompleteOk"
		:resetDialog="resetDialog"
		:validation="validation"
		max-width="70vh"
		@close="close"
	>
		<template #default="{ buttonOkDisabled, loading }">
			<v-row dense>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<v-row dense>
								<v-col cols="12" class="text-center text-h7 pb-2">
									{{ $t('motorSearch.guidance') }} <a target="_blank" :href="$t(searchUrl)">{{ $t(searchLocaleName) }}</a>{{ $t('motorSearch.guidance3') }}
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="12" sm="6">
									<VSelectWithValidation
										ref="impulseClassRef"
										v-model="impulseClass"
										vid="impulseClass"
										:items="impulseClasses"
										:validation="validation"
										:label="$t('forms.external.motorSearch.impulseClass')"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<VSelectWithValidation
										ref="diameterRef"
										v-model="diameter"
										vid="diameter"
										:items="diameters"
										:validation="validation"
										:label="$t('forms.external.motorSearch.diameter')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col cols="12" sm="6">
									<v-checkbox
										v-model="singleUse"
										density="compact"
										:label="$t('forms.external.motorSearch.singleUse')"
									/>
								</v-col>
								<v-col cols="12" sm="6">
									<v-checkbox
										v-model="sparky"
										density="compact"
										:label="$t('forms.external.motorSearch.sparky')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VSelectWithValidation
										ref="manufacturerRef"
										v-model="manufacturer"
										vid="manufacturer"
										multiple
										:max-values="2"
										:items="manufacturers"
										:validation="validation"
										:label="$t('forms.external.motorSearch.manufacturer')"
										:hint="$t('forms.external.motorSearch.manufacturer_hint')"
									/>
								</v-col>
							</v-row>
							<v-row dense>
								<v-col col="12">
									<VTextFieldWithValidation
										ref="motorRef"
										v-model="motor"
										vid="motor"
										:validation="validation"
										:label="$t('forms.external.motorSearch.motor')"
										:hint="$t('forms.external.motorSearch.motor_hint')"
									/>
								</v-col>
							</v-row>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn
								:disabled="clickMotorSearchResetDisabled"
								:loading="loading"
								variant="flat"
								color="primary"
								:label="$t('buttons.reset')"
								@click="clickMotorSearchReset"
							>{{ $t('buttons.reset') }}</v-btn>
							<v-btn
								:loading="loading"
								variant="flat"
								color="primary"
								@click="clickMotorSearchClear"
							>{{ $t('buttons.clear') }}</v-btn>
							<v-btn
								:disabled="buttonOkDisabled"
								:loading="loading"
								variant="flat"
								color="green"
								@click="clickMotorSearch"
							>{{ $t('buttons.search') }}</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</template>
		<template v-slot:listing>
			<div
				v-if="!results"
				style="height: 35vh"
			>
				&nbsp;
			</div>
			<div
				v-if="results"
				class="row"
				style="height: 35vh"
			>
				<div
					class="col-12 q-mb-sm"
					v-for="item in results" :key="item.motorId"
				>
					<table style="width: 100%;">
						<tr>
							<td colspan="2" class="text-left text-h6 text-bold">{{ item.manufacturer }} {{ item.commonName }} {{ item.sparky ? '(' + $t('motorSearch.sparky') +  ')' : '' }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold" style="width: 30%">{{ $t('motorSearch.motor_designation') }}</td><td>{{ item.designation }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_diameter') }}</td><td>{{ item.diameter }}{{ $t('motorSearch.motor_diameter_measurement') }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_caseInfo') }}</td><td>{{ motorCaseInfo(item) }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_thrust_average') }}</td><td>{{ item.avgThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td class="text-h7 text-bold">{{ $t('motorSearch.motor_thrust_max') }}</td><td>{{ item.maxThrustN }} {{ item.motor_thrust_newtons_abbr }}</td>
						</tr>
						<tr>
							<td colspan="2" class="text-right"><a :href="motorUrl(item)" target="_blank">{{ motorUrl(item) }}</a></td>
						</tr>
						<tr
							v-if="selectable"
						>
							<td colspan="2" class="text-right">
								<v-btn
									variant="flat"
									color="primary"
									density="compact"
									@click="clickMotorSelect(item)"
								>{{ $t('buttons.select') }}</v-btn>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</template>
	</VFormListingDialog>
	<VConfirmationDialog
		:message="dialogResetMessage"
		:messageRaw=true
		:signal="dialogResetManager.signal"
		@cancel="dialogResetManager.cancel()"
		@ok="dialogResetOk"
	/>
</template>

<script>
import { helpers, minLength, requiredUnless } from '@vuelidate/validators';

import { useAppMobileLookupDialogComponent } from '@/components/external/appMotorLookupDialog';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormListingDialog from '@/library_vue_vuetify/components/form/VFormListingDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'MotorLookupDialog',
	components: {
		VConfirmationDialog,
		VFormListingDialog,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	props: {
		selectable: {
			type: Boolean,
			default: true
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['close', 'ok'],
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
			success,
			clickMotorSearch,
			clickMotorSearchClear,
			clickMotorSearchReset,
			clickMotorSearchResetDisabled,
			clickMotorSelect,
			close,
			dialogResetManager,
			dialogResetOk,
			diameter,
			diameters,
			dialogResetMessage,
			dialogMotorLookup,
			impulseClass,
			impulseClasses,
			manufacturer,
			manufacturers,
			manufacturersCache,
			motor,
			motorCaseInfo,
			motorUrl,
			preCompleteOk,
			reset,
			resetDialog,
			results,
			sparky,
			searchLocaleName,
			searchUrl,
			serviceExternalMotorSearch,
			serviceStore,
			singleUse,
			scope,
			validation
		} = useAppMobileLookupDialogComponent(props, context);

		return {correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			clickMotorSearch,
			clickMotorSearchClear,
			clickMotorSearchReset,
			clickMotorSearchResetDisabled,
			clickMotorSelect,
			close,
			dialogResetManager,
			dialogResetOk,
			diameter,
			diameters,
			dialogResetMessage,
			dialogMotorLookup,
			impulseClass,
			impulseClasses,
			manufacturer,
			manufacturers,
			manufacturersCache,
			motor,
			motorCaseInfo,
			motorUrl,
			preCompleteOk,
			reset,
			resetDialog,
			results,
			sparky,
			searchLocaleName,
			searchUrl,
			serviceExternalMotorSearch,
			serviceStore,
			singleUse,
			scope,
			validation
		};
	},
	validations () {
		return {
			impulseClass: { requiredIfMotor: requiredUnless(this.motor), $autoDirty: true },
			motor: { 
				requiredIfImpulseClass: requiredUnless(this.impulseClass), 
				minLength: minLength(3), 
				validatorMotor,
				$autoDirty: true 
			}
		};
	}
};

const validatorMotor = helpers.regex(/^[a-zA-Z0-9-']{3}/, /\d/);
</script>

<style scoped>
</style>
