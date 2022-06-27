import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import highlight from 'rehype-highlight';
import twemojify from 'rehype-twemojify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        prerender: {
            default: true,
        },
    },
    extensions: ['.svelte', '.md'],
    preprocess: [
        preprocess(),
        mdsvex({
            extensions: ['.md'],
            layout: 'src/routes/posts/_post.svelte',
            rehypePlugins: [highlight, twemojify],
        }),
    ],
};

export default config;
