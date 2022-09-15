import { error } from '@sveltejs/kit';
import { pages } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const page = pages.find((page) => page.match(`/${params.path}`));
    if (!page) throw error(404, 'Not found');

    return {
        title: page.title,
        Page: page.Component,
    };
};
