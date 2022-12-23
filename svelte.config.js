import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import highlight from 'rehype-highlight';
import twemojify from 'rehype-twemojify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            pages: 'dist',
            assets: 'dist',
            fallback: '404.html',
            precompress: true,
        }),
    },
    extensions: ['.svelte', '.md'],
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md'],
            layout: 'src/routes/posts/_post.svelte',
            rehypePlugins: [highlight, twemojify],
        }),
    ],
};

export default config;
