<script>
import { ref } from 'vue';

import GlobalUtility from '@thzero/library_client/utility/global';

import { useBasePrivacyComponent } from '@/library_vue/components/basePrivacy';

export function useAppPrivacyComponent(props, context, options) {
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
		} = useBasePrivacyComponent(props, context, options);

	const privacyMarkup = ref(GlobalUtility.$trans.t('strings.privacy.text1'));

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
		privacyMarkup
	};
};
</script>
