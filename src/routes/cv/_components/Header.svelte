<script lang="ts">
    export let name: string;
    export let position: string;
</script>

<header class="header">
    <a href="/" class="invisible-link">
        <picture>
            <source srcset="/profile-pic.avif" type="image/avif" />
            <img class="avatar" src="/profile-pic.jpg" alt={name} />
        </picture>
    </a>

    <h1 class="name">
        <a href="/" class="invisible-link">{name}</a>
        <small class="title">{position}</small>
    </h1>
</header>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        grid-area: head;
        border-bottom: 1px solid var(--border-color);
        gap: 1rem;
        padding-bottom: 1rem;
        padding-right: 64px;
        position: relative;
        min-height: calc(64px + 1rem);
    }

    .header::after {
        position: absolute;
        top: calc(50% - 0.5rem);
        right: 0;
        content: '';
        background: url(/qr-cv.svg) no-repeat;
        background-size: contain;
        width: 64px;
        height: 64px;
        transform: translateY(-50%);
    }

    img.avatar {
        display: block;
        border-radius: 4rem;
        width: 64px;
        height: 64px;
    }

    .name {
        display: block;
        text-align: left;
        text-transform: uppercase;
        font-size: 1.5rem;
        letter-spacing: 0.1em;
        margin: 0;
    }

    .title {
        display: block;
        font-size: 0.9rem;
        letter-spacing: 0.1em;
        font-weight: normal;
    }

    @media (min-width: 600px) {
        .name {
            font-size: 2.3rem;
        }
        .title {
            font-size: 1rem;
        }
    }
</style>
