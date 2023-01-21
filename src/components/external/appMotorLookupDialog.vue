<script>
import { computed, onMounted, ref } from 'vue';

import useVuelidate from '@vuelidate/core';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import CommonUtility from '@thzero/library_common/utility/index';
import GlobalUtility from '@thzero/library_client/utility/global';

import { useBaseComponent } from '@/library_vue/components/base';

import DialogSupport from '@/library_vue/components/support/dialog';

export function useAppMobileLookupDialogComponent(props, context, options) {
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
};
</script>
