import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    server: { host: true, port: 8000 },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
        coverage: { provider: 'c8', all: true, src: 'src' },
    },
};

export default config;
