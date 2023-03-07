<template>
	<Header v-model="title" />
	<v-row>
		<v-col cols="12">
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="6"
							v-for="item in rockets"
							:key="item.name"
						>
							<v-card
								v-for="item in rockets"
								:key="item.name"
								class="mx-auto"
								max-width="400"
								color="secondary"
							>
								<v-img
									v-if="hasCoverUrl(item)"
									:src="item.coverUrl"
									cover
								></v-img>

								<v-card-title>
									<v-row dense>
										<v-col>
											<v-btn
												:to="rocketUrl(item)"
												size="large"
												variant="text"
											>
												{{ item.name }}
											</v-btn>
										</v-col>
										<v-col>
											<img :src="rocketTypeIcon(item)" style="height: 48px; float: right;" />
										</v-col>
									</v-row>
								</v-card-title>
							</v-card>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useRocketsBaseComponent } from '@/components/content/rockets/rocketsBase';
import { useRocketsBaseProps } from '@/components/content/rockets/rocketsBaseProps';

import Header from '@/components/content/Header';
import VMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VMarkdown';

export default {
	name: 'Rockets',
	components: {
		Header,
		VMarkdown
	},
	props: {
		...useRocketsBaseProps
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
			sort,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			rocketUrl
		} = useRocketsBaseComponent(props, context);

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
			sort,
			target,
			hasCoverUrl,
			rocketTypeIcon,
			rocketTypeIconDetermine,
			rockets,
			title,
			rocketUrl
		};
	}
};
</script>

<style scoped>
.link {
	text-decoration: underline;
}
</style>
