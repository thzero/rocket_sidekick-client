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
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { helpers, minLength, requiredUnless } from '@vuelidate/validators';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormListingDialog from '@/library_vue_vuetify/components/form/VFormListingDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

import DialogSupport from '@/library_vue/components/support/dialog';

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
			success
		} = useBaseComponent(props, context);

		const serviceStore = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
		const serviceExternalMotorSearch = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EXTERNAL_MOTOR_SEARCH);

		const dialogResetMessage = ref(null);
		const dialogMotorLookup = ref(null);
		const dialogResetManager = ref(new DialogSupport());
		const diameter = ref(null);
		const impulseClass = ref(null);
		const manufacturer = ref(null);
		const manufacturersCache = ref(null);
		const motor = ref(null);
		const results = ref([]);
		const sparky = ref(false);
		const singleUse = ref(false);
		const ttl = ref(0);

		const clickMotorSearchResetDisabled = computed(() => {
			// const ttl = .serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
			const now = CommonUtility.getTimestamp();
			return (ttl.value < now);
		});
		const diameters = computed(() => {
			return ['', '13', '18', '24', '29', '38', '75', '98'].map((item) => { return { id: item, name: (item ? item + GlobalUtility.$trans.t('motorSearch.motor_diameter_measurement') : '') }; });
		});
		const impulseClasses = computed(() => {
			return ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].map((item) => { return { id: item, name: item }; });
		});
		const manufacturers = computed(() => {
			return manufacturersCache.value.map((item) => { return { id: item.abbrev, name: item.name }; });
		});
		const searchLocaleName = computed(() => {
			return serviceExternalMotorSearch.nameLocale();
		});
		const searchUrl = computed(() => {
			return serviceExternalMotorSearch.urlHuman();
		});

		const close = () => {
			context.emit('close');
		};

		const clickMotorSearch = async () => {
			await dialogMotorLookup.value.submit(correlationId());
			// const correlationId = this.correlationId();

			// const result = await this.validation.$validate();
			// this.logger.debug('FormDialog', 'submit', 'result', result, correlationId);
			// if (!result)
			// 	return;

			// this.results = null;

			// const request = {
			// 	diameter: this.diameter,
			// 	impulseClass: this.impulseClass,
			// 	manufacturer: this.manufacturer,
			// 	singleUse: this.singleUse,
			// 	sparky: this.sparky
			// };

			// this.serviceStore.dispatcher.setMotorSearchCriteria(this.correlationId(), request);

			// // const response = await this.serviceExternalMotorSearch.search(correlationId, request);
			// const response = await this.serviceStore.dispatcher.requestMotorSearchResults(correlationId, request);
			// console.log(response);
			// this.results = response || [];
		};
		const clickMotorSearchClear = async () => {
			await dialogMotorLookup.value.reset(correlationId(), null, true);
		};
		const clickMotorSearchReset = async () => {
			const last = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.last : 0;
			// const ttl2 = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
			const ttl2 = ttl.value;

			const now = CommonUtility.getTimestamp();
			if (ttl2 < now) {
				return;
			}

			const duration = now - last;

			const spanInHours = 60 * 60 * 1000;
			const spanInDays = 24 * 60 * 60 * 1000;
			const spanInWeeks = 7 * 24 * 60 * 60 * 1000;

			const durationInWeeks = duration / spanInWeeks;
			const durationInDays = duration / spanInDays;
			const durationInHours = duration / spanInHours;

			let message = GlobalUtility.$trans.t('motorSearch.motor_reset_message') + '<br>';
			if (durationInWeeks <= 1) {
				let timespan = '';
				if (durationInDays <= 1) {
					if (durationInHours < 1)
						timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_hour_less');
					else
						timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInHours, type: GlobalUtility.$trans.t('motorSearch.motor_reset_hours') });
				}
				else
					timespan = GlobalUtility.$trans.t('motorSearch.motor_reset_message_time_duration', { duration: durationInDays, type: GlobalUtility.$trans.t('motorSearch.motor_reset_days') });
				message += GlobalUtility.$trans.t('motorSearch.motor_reset_message_warning', { timespan: timespan }) + '<br>' + GlobalUtility.$trans.t('motorSearch.motor_reset_message_warning2') + '<br>';
			}
			message = message + '<br>' + GlobalUtility.$trans.t('motorSearch.motor_reset_message_confirm');

			dialogResetMessage.value = message;
			dialogResetManager.value.open();
		};
		const clickMotorSelect = async (item) => {
			context.emit('ok', item);
			return true;
		};
		const dialogResetOk = async () => {
			dialogResetManager.value.ok();
			const correlationIdI = correlationId();
			await serviceStore.dispatcher.requestMotorSearchReset(correlationIdI);
			ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
			await preCompleteOk(correlationIdI);
		};
		const motorCaseInfo = (motor) => {
			if (motor.type === 'SU')
				return GlobalUtility.$trans.t('motorSearch.motor_type_singleuse');

			if (motor.type === 'hybrid' || motor.type === 'reload') {
				if (motor.caseInfo !== null) {
					const type = GlobalUtility.$trans.t('motorSearch.motor_type_' + motor.type.toLowerCase());
					return '(' + motor.caseInfo + '; ' + type + ')';
				}
			}

			return '';
		};
		const motorUrl = (motor) => {
			return serviceExternalMotorSearch.urlMotor(motor);
		};
		const preCompleteOk = async (correlationId) => {
			results.value = null;

			const request = {
				diameter: diameter.value,
				impulseClass: impulseClass.value,
				manufacturer: manufacturer.value,
				motor: motor.value,
				singleUse: singleUse.value,
				sparky: sparky.value
			};

			serviceStore.dispatcher.setMotorSearchCriteria(correlationId, request);

			const response = await serviceStore.dispatcher.requestMotorSearchResults(correlationId, request);
			results.value = response || [];
			ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;
			return success(correlationId);
		};
		// eslint-disable-next-line
		const resetDialog = async (correlationId, ignoreSettings) => {
			impulseClass.value = null;
			manufacturer.value = null;
			motor.value = null;
			results.value = null;

			ttl.value = serviceStore.state.motorSearchResults ? serviceStore.state.motorSearchResults.ttl : 0;

			if (ignoreSettings)
				return;
				
			const data = await serviceStore.getters.getMotorSearchCriteria();
			if (!data)
				return;

			diameter.value = data.diameter;
			impulseClass.value = data.impulseClass;
			manufacturer.value = data.manufacturer;
			motor.value = data.motor;
			sparky.value = !CommonUtility.isNull(data.sparky) ? data.sparky : false;
			singleUse.value = !CommonUtility.isNull(data.singleUse) ? data.singleUse : false;

			// (async () => {
			// 	// await clickMotorSearch();
			// 	await preCompleteOk(correlationId);
			// })();
			await preCompleteOk(correlationId);
		};
		const reset = async (correlationId) => {
			await dialogMotorLookup.value.reset(correlationId, false);
		};

		onMounted(async () => {
			if (manufacturersCache.value !== null)
				return;

			manufacturersCache.value = await serviceStore.dispatcher.requestMotorManufacturers(correlationId());
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
			scope: 'MotorLookupDialog',
			validation: useVuelidate({ $scope: 'MotorLookupDialog' })
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
