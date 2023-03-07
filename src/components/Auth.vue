<script>
import vAuth from '@thzero/library_client_vue3_vuetify3/components/VAuth';

export default {
	name: 'Auth',
	extends: vAuth,
	setup(props, context) {
		return vAuth.setup(props, context);
	}
};
</script>
