<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte';
    import { format } from 'date-fns';

    export let title: string;
    export let date: string;
    export let words: number;

    let postedAt = new Date(date);
</script>

<PageHeader />

<article class="l-container b-post">
    <header class="b-post__header">
        <h1 class="b-post__title">{title}</h1>

        <time class="b-post__date" datetime={date}>
            {format(postedAt, 'dd.MM.yyyy')}
        </time>

        {#if words}
            <span class="b-post__duration">{Math.ceil(words / 120)} мин. чтения</span>
        {/if}
    </header>
    <slot />

    <footer class="b-post__footer">
        <a href="/posts/">Смотреть другие записи в блоге...</a>
    </footer>
</article>

<section class="l-container">
    <div class="b-feedback">
        <div class="b-feedback__description">Оставить отзыв или задать вопрос лично по email</div>

        <form
            class="b-feedback__form"
            enctype="text/plain"
            method="post"
            action="mailto:feedback@orlov-vo.ru"
        >
            <label class="b-feedback__field">
                Имя: <input class="b-feedback__control" type="text" name="name" />
            </label>
            <label class="b-feedback__field">
                Текст:
                <textarea class="b-feedback__control" rows="5" cols="30" name="message" />
            </label>
            <button class="b-feedback__submit" type="submit">Отправить</button>
        </form>
    </div>
</section>
