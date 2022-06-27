<script context="module" lang="ts">
    import { pages } from '$lib/posts';
    import type { SvelteComponent } from 'svelte';

    export const load: import('./__types/[...path]').Load = async ({ params }) => {
        const page = pages.find((page) => page.match(`/${params.path}`));
        if (!page) return { status: 404 };

        return {
            status: 200,
            props: {
                title: page.title,
                Page: page.Component,
            },
        };
    };
</script>

<script lang="ts">
    export let title: string;
    export let Page: typeof SvelteComponent;
</script>

<svelte:head>
    <title>{title} - Vladislav Orlov - orlov-vo.ru</title>
    <meta property="og:title" content={title} />
</svelte:head>

<Page />
