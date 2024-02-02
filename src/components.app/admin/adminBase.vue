<script>
import { computed } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';
import { useNotify } from '@thzero/library_client_vue3/components/notify';

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

	const {
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify
	} = useNotify(props, context);

	const serviceSecurity = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_SECURITY);
	const serviceUtilities = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_UTILITY);
	const serviceUser = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);

	const canResetContent = computed(async () => {
		return await serviceSecurity.authorizationCheckRoles(correlationId, serviceUser.user, ['content:reset']);
	});
	const handleResetContent = async () => {
		const response = await serviceUtilities.contentReset(correlationId());
		setNotify(correlationId, hasFailed(response) ? 'messages.content.reset_failed' : 'messages.content.reset_success');
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
		notifyColor,
		notifyMessage,
		notifySignal,
		notifyTimeout,
		setNotify,
		canResetContent,
		handleResetContent
	};
};
</script>
