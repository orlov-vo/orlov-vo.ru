<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    $: title = data.title;
    $: Page = data.Page;
</script>

<svelte:head>
    <title>{title} - Vladislav Orlov - orlov-vo.ru</title>
    <meta property="og:title" content={title} />
</svelte:head>

<svelte:component this={Page} />
