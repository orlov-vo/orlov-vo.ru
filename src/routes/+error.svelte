<script lang="ts">
    import { page } from '$app/stores';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import { has } from '$lib/utils/has';

    $: status = $page.status;
    $: error = $page.error;
</script>

<svelte:head>
    <title>{status} - Vladislav Orlov - orlov-vo.ru</title>
    <meta property="og:title" content="{status} - Vladislav Orlov - orlov-vo.ru" />
</svelte:head>

<PageHeader />

<section class="l-container">
    {#if status === 404}
        <h1>404. Страница не найдена</h1>
        <p>
            Извините, запрошенная страница не существует.
            <br />
            Вы можете вернуться <a href="/">на главную</a>.
        </p>
    {:else}
        {#if error}
            <h1>{status}. {error.message}</h1>
            {#if has(error, 'stack') && error.stack}
                <pre><code>{error.stack}</code></pre>
            {/if}
        {:else}
            <h1>{status}. Что-то пошло не так</h1>
        {/if}
        <p>
            Вы можете вернуться <a href="/">на главную</a>.
        </p>
    {/if}
</section>
