<svelte:head>
    <link rel="stylesheet" href="/normalize.css" />
    <link rel="stylesheet" href="/variables.css" />
    <link rel="stylesheet" href="/typography.css" />
    <link rel="stylesheet" href="/layout.css" />
    <link rel="stylesheet" href="/blocks/post-list-short.css" />
    <link rel="stylesheet" href="/blocks/post.css" />
    <link rel="stylesheet" href="/blocks/feedback.css" />
</svelte:head>

<slot />

<footer class="l-container l-footer">
    © 2017-{new Date().getFullYear()} Все права защищены, Владислав Орлов.
    <a href="https://github.com/orlov-vo/orlov-vo.ru" target="_blank" rel="noreferrer"
        >Исходники на GitHub</a
    >
</footer>
