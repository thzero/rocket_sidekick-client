<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBasePrivacyComponent } from '@thzero/library_client_vue3/components/basePrivacy';

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

	const privacyMarkup = ref(LibraryClientUtility.$trans.t('strings.privacy.text1'));

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
