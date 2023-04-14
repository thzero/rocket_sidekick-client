<script>
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useAdminBaseComponent(props, context) {
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

	const serviceUtilities = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_UTILITY);

	const handleContentReset = async () => {
		serviceUtilities.contentReset(correlationId());
	};

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
		handleContentReset
	};
};
</script>
