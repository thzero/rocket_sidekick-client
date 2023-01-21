<script>
import vAuth from '@/library_vue_vuetify/components/VAuth';

export default {
	name: 'Auth',
	extends: vAuth,
	setup(props, context) {
		return vAuth.setup(props, context);
	}
};
</script>
