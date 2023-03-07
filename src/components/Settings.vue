<template>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<v-row dense>
				<v-col
					cols="12"
				>
					<v-toolbar
						density="compact"
					>
						<v-toolbar-title class="text-center text-h5">
							<span>{{ $t('titles.settings') }}</span>
						</v-toolbar-title>
					</v-toolbar>
					<!-- <div class="text-center text-h5">
						<span>{{ $t('titles.settings') }}</span>
					</div> -->
				</v-col>
				<v-col
					cols="12"
				>
					<VFormControl
						ref="formSettingsRef"
						:validation="validation"
						:resetForm="resetForm"
						buttonClearName="buttons.reset"
						buttonOkName="buttons.save"
						:pre-complete-ok="preCompleteOk"
						:dirtyCheck="dirtyCheck"
					>
						<v-row dense>
							<v-col
								cols="12"
								sm="6"
								:class="'pl-0 pr-' + ($vuetify.display.mdAndUp ? '2' : '0')"
							>
								<v-card>
									<v-card-text>
										<v-row
											align="center"
											dense
										>
											<v-col
												cols="9"
												class="text-h4 mb-1 pt-1"
											>
												{{ name }}
											</v-col>
											<v-col
												cols="3"
												style="text-align: right;"
											>
												<v-avatar
													tile
													size="80"
													color="grey"
												>
													<img
														v-if="hasPicture"
														:src="picture"
														class="responsive"
													>
												</v-avatar>
											</v-col>
										</v-row>
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								cols="12"
								sm="6"
								class="pl-0 pr-0"
							>
								<v-card>
									<v-card-text>
										<VTextFieldWithValidation
											ref="gamerTagRef"
											vid="gamerTag"
											v-model="gamerTag"
											:counter="30"
											:validation="validation"
											:label="$t('forms.gamerTag')"
										/>
									</v-card-text>
								</v-card>
							</v-col>
							<v-col
								cols="12"
								class="pl-0 pr-0"
							>
								<v-card>
									<v-card-item>
										<v-card-title class="text-center text-h6">{{ $t('titles.measurementUnits') }}</v-card-title>
									</v-card-item>
									<v-card-text>
										<v-row dense>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitRef"
													vid="measurementUnitsId"
													v-model="measurementUnitsId"
													:items="measurementUnitsSelect"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.title')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitAccelerationRef"
													vid="measurementUnitAccelerationId"
													v-model="measurementUnitAccelerationId"
													:items="measurementUnitsAcceleration"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.acceleration')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitAreaRef"
													vid="measurementUnitAreaId"
													v-model="measurementUnitAreaId"
													:items="measurementUnitsArea"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.area')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitDistanceRef"
													vid="measurementUnitDistanceId"
													v-model="measurementUnitDistanceId"
													:items="measurementUnitsDistance"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.distance')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitLengthRef"
													vid="measurementUnitLengthId"
													v-model="measurementUnitLengthId"
													:items="measurementUnitsLength"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.length')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitVelocityRef"
													vid="measurementUnitVelocityId"
													v-model="measurementUnitVelocityId"
													:items="measurementUnitsVelocity"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.velocity')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitVolumeRef"
													vid="measurementUnitVolumeId"
													v-model="measurementUnitVolumeId"
													:items="measurementUnitsVolume"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.volume')"
												/>
											</v-col>
											<v-col
												cols="12"
												sm="6"
												md="3"
											>
												<VSelectWithValidation
													ref="measurementUnitWeightRef"
													vid="measurementUnitWeightId"
													v-model="measurementUnitWeightId"
													:items="measurementUnitsWeight"
													:validation="validation"
													:label="$t('forms.settings.measurementUnits.weight')"
												/>
											</v-col>
										</v-row>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</VFormControl>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';

import VFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VFormControl';
import VSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form//VSelectWithValidation';
import VTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VTextFieldWithValidation';

import { useAppSettingsComponent } from '@/components/appSettings';

import { minLength, maxLength, required } from '@vuelidate/validators';

export default {
	name: 'AppSettings',
	components: {
		VFormControl,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	setup(props, context) {
		const formSettingsRef = ref(null);

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
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCheck,
			leaveCheck,
			cancel,
			close,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			requestReset,
			reset,
			serviceStore,
			serviceUsers,
			user,
			gamerTag,
			measurementUnitTrans,
			measurementUnitsId,
			measurementUnitAccelerationId,
			measurementUnitAreaId,
			measurementUnitDistanceId,
			measurementUnitLengthId,
			measurementUnitVelocityId,
			measurementUnitVolumeId,
			measurementUnitWeightId,
			measurementUnitsSelect,
			measurementUnitsAcceleration,
			measurementUnitsArea,
			measurementUnitsDistance,
			measurementUnitsLength,
			measurementUnitsVelocity,
			measurementUnitsVolume,
			measurementUnitsWeight,
			preCompleteOk,
			resetForm,
			resetFormIdCheck,
			scope,
			validation
		} = useAppSettingsComponent(props, context, formSettingsRef);

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
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCheck,
			leaveCheck,
			cancel,
			close,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			requestReset,
			reset,
			serviceStore,
			serviceUsers,
			user,
			gamerTag,
			measurementUnitTrans,
			measurementUnitsId,
			measurementUnitAccelerationId,
			measurementUnitAreaId,
			measurementUnitDistanceId,
			measurementUnitLengthId,
			measurementUnitVelocityId,
			measurementUnitVolumeId,
			measurementUnitWeightId,
			measurementUnitsSelect,
			measurementUnitsAcceleration,
			measurementUnitsArea,
			measurementUnitsDistance,
			measurementUnitsLength,
			measurementUnitsVelocity,
			measurementUnitsVolume,
			measurementUnitsWeight,
			preCompleteOk,
			resetForm,
			resetFormIdCheck,
			scope,
			validation,
			formSettingsRef
		};
	},
	validations () {
		return {
			gamerTag: {
				// validatorGamerTag,
				minLength: minLength(3),
				maxLength: maxLength(20),
				$autoDirty: true
			},
			measurementUnitsId: { required, $autoDirty: true },
			measurementUnitAccelerationId: { required, $autoDirty: true },
			measurementUnitAreaId: { required, $autoDirty: true },
			measurementUnitDistanceId: { required, $autoDirty: true },
			measurementUnitLengthId: { required, $autoDirty: true },
			measurementUnitVelocityId: { required, $autoDirty: true },
			measurementUnitVolumeId: { required, $autoDirty: true },
			measurementUnitWeightId: { required, $autoDirty: true },
		};
	}
};
</script>

<style scoped>
</style>
