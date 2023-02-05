<template>
	<v-card>
		<v-card-title
            v-if="hasTitle"
        >
	<p class="text-h6 text-center">{{ $t(title) }}</p>
		</v-card-title>
		<v-card-text>
           <!-- <v-list density="compact">
                <v-list-item
                    v-for="item in modelValue"
                    :key="item.name"
                    :href="item.link"
                    :target="target(item)"
                    class="link"
                >
                    <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                </v-list-item>
            </v-list>  -->
            <div
                v-for="item in modelValue"
                :key="item.link"
            >
                <a 
                    :href="item.link"
                    :target="target(item)"
                >
                {{ !String.isNullOrEmpty(item.title) ? item.title : item.link}}
                </a><br/>
            </div>
		</v-card-text>
	</v-card>
</template>
		
<script>
import { useAdditionalLinksComponent } from '@/components/content/info/additionalLinksBase';
import { useAdditionalLinksBaseProps } from '@/components/content/info/additionalLinksBaseProps';

export default {
	name: 'AdditionalLinks',
	props: {
		...useAdditionalLinksBaseProps
	},
	setup(props, context) {
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
			serviceStore,
			sortByOrder,
			target,
            hasTitle
		} = useAdditionalLinksComponent(props, context);

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
			serviceStore,
			sortByOrder,
			target,
            hasTitle
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
