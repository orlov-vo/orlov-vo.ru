<script context="module" lang="ts">
    export const load: import('@sveltejs/kit').Load = ({ error, status }) => {
        return {
            props: { status, error },
        };
    };
</script>

<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte';

    export let status: number;
    export let error: Error | null;
</script>

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
        <h1>{status}. Что-то пошло не так</h1>
        {#if error}
            <pre><code>{error.stack}</code></pre>
        {/if}
        <p>
            Вы можете вернуться <a href="/">на главную</a>.
        </p>
    {/if}
</section>
