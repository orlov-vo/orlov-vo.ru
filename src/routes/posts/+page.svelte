<script lang="ts">
    import { format } from 'date-fns';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import { posts } from '$lib/posts';
</script>

<svelte:head>
    <title>Блог - Vladislav Orlov - orlov-vo.ru</title>
    <meta property="og:title" content="Блог - Vladislav Orlov - orlov-vo.ru" />
</svelte:head>

<PageHeader />

<section class="l-container">
    <h1>Блог</h1>

    <ul class="b-post-list-short">
        {#each posts as post}
            <li class="b-post-list-short__item">
                {#if post.thumbnail}
                    <div class="b-post-list-short__thumbnail">
                        <a class="invisible-link" href={post.url}>
                            <img src={post.thumbnail} alt={post.title} width="160" height="120" />
                        </a>
                    </div>
                {/if}

                <div class="b-post-list-short__content">
                    <div class="b-post-list-short__date">
                        {post.isDraft ? 'Черновик' : format(post.postedAt, 'dd.MM.yyyy')}
                    </div>
                    <div class="b-post-list-short__title">
                        <a href={post.url}>{post.title}</a>
                    </div>

                    <div class="b-post-list-short__summary">
                        {post.summary}
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</section>
