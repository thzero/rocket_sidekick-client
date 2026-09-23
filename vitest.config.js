import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';

// Kept separate from vite.config.js, which regenerates src/openSource.js and loads the
// Vue and Vuetify plugins on every start. The tests only need the path alias.
export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	test: {
		environment: 'jsdom',
		include: ['test/**/*.test.js'],
		server: {
			deps: {
				// These packages import without file extensions, which Vite resolves
				// but Node does not, so they must be transformed rather than externalized.
				inline: [/@thzero\//, /rocket_sidekick_common/]
			}
		}
	}
});
