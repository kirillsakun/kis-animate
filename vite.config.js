// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		minify: false,
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			name: 'kis-animate',
			fileName: 'kis-animate',
		},
	},
	server: {
		port: 3000,
	},
});
