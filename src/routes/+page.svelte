<script lang="ts">
    import { format } from 'date-fns';
    import { recentPosts } from '$lib/posts';
    import socialLinks from '$lib/social-links.json';
    import photo from './main-photo.jpg';
</script>

<svelte:head>
    <title>Vladislav Orlov - orlov-vo.ru</title>
    <meta property="og:title" content="Vladislav Orlov - orlov-vo.ru" />
</svelte:head>

<div class="p-home l-container">
    <h1 class="p-home__title">Vladislav Orlov</h1>

    <nav class="p-home__nav">
        {#each socialLinks as link, index}
            {#if index !== 0}{' ‧ '}{/if}
            <a href={link.link} target="_blank" rel="noreferrer">{link.name}</a>
        {/each}
    </nav>

    <main class="p-home__intro b-post">
        <img class="p-home__photo" src={photo} alt="Vladislav Orlov" />

        <div>
            <p>
                Я ведущий разработчик
                <a href="https://www.meetsidekick.com/" target="_blank" rel="noopener noreferrer"
                    >браузера для продуктивной работы Sidekick</a
                >. Программирую в основном на JS/TS уже более десяти лет. Более подробно можно
                <a href="/cv">почитать мое CV на английском</a>.
            </p>

            <p>
                Родился и вырос в
                <a
                    href="https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D0%B2%D0%BE%D0%BA%D1%83%D0%B7%D0%BD%D0%B5%D1%86%D0%BA"
                    target="_blank"
                    rel="noopener noreferrer">Новокузнецке</a
                >. Окончил баклавариат в
                <a href="https://sibsutis.ru/" target="_blank" rel="noopener noreferrer">СибГУТИ</a>
                на
                <a href="https://csc.sibsutis.ru/" rel="noopener noreferrer">кафедре ВС</a>, получил
                звание Сержанта связи ВС РФ.
            </p>

            <p>
                Люблю путешествовать по нашей планете, живу зарубежом (более 3 лет на Кипре). Обожаю
                кататься на чем-либо: сноуборде, серфе, мотоцикле. Интересуюсь темами про личные
                финансы, инвестиции и крипто-мир.
            </p>
        </div>
    </main>

    <section>
        <h2>
            <a href="/posts/" class="invisible-link">Мои последние записи</a>
        </h2>

        <ul class="b-post-list-short">
            {#each recentPosts as post}
                <li class="b-post-list-short__item">
                    <span class="b-post-list-short__date">
                        {post.isDraft ? 'Черновик' : format(post.postedAt, 'dd.MM.yyyy')}
                    </span>
                    <a href={post.url} class="b-post-list-short__title">{post.title}</a>
                </li>
            {/each}
        </ul>

        <a href="/posts/">Смотреть все записи в блоге...</a>
    </section>
</div>

<style>
    .p-home__title {
        font-size: 2.3rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .p-home__nav {
        margin: -1em 0 1em;
    }

    .p-home__intro {
        width: 100%;
        display: grid;
        gap: 1.5rem;
        margin: 2rem 0;

        grid-template-columns: auto;
        grid-template-areas: 'photo' 'body';
    }

    img.p-home__photo {
        display: block;
        border-radius: var(--img-radius);
        margin: 0 auto;
        margin-top: 4px;
    }

    @media (min-width: 600px) {
        .p-home__intro {
            grid-template-columns: 250px auto;
            grid-template-areas: 'photo body';
        }
    }
</style>
