import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit(), imagetools()],
    server: { host: true, port: 8000 },
};

export default config;
