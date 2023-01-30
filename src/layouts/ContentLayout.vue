<template>
	<v-row>
		<v-col cols="0" lg="2" />
		<v-col cols="12" lg="8">
<router-view />
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'ContentLayout',
};
</script>

<style scoped>
</style>
