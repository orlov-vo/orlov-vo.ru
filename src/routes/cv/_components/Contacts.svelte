<script lang="ts">
    import SectionName from './SectionName.svelte';
</script>

<div class="contacts">
    <SectionName>Contacts</SectionName>

    <a class="mail-link" href="mailto:me@orlov-vo.ru">me@orlov-vo.ru</a>
    <a class="telegram-link" href="https://t.me/orlov_vo">t.me/orlov_vo</a>
    <a class="github-link" href="https://github.com/orlov-vo">github.com/orlov-vo</a>
    <a class="linkedin-link" href="https://linkedin.com/in/orlov-vo/">linkedin.com/in/orlov-vo</a>

    <span class="location">Cyprus, Limassol (UTC+3)</span>
</div>

<style>
    .contacts {
        --section-icon: url(/icons/mail-outline.svg);

        grid-area: contacts;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.1rem;
    }

    .mail-link,
    .github-link,
    .telegram-link,
    .linkedin-link,
    .location {
        font-size: 0.8em;
        margin-left: 1.5rem;
        position: relative;
    }

    .mail-link::before,
    .github-link::before,
    .telegram-link::before,
    .linkedin-link::before,
    .location::before {
        content: '';
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: -1.5rem;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.4;
    }

    .mail-link::before {
        background-image: url(/icons/email.svg);
    }

    .github-link::before {
        background-image: url(/icons/github.svg);
    }

    .telegram-link::before {
        background-image: url(/icons/telegram.svg);
    }

    .linkedin-link::before {
        background-image: url(/icons/linkedin.svg);
    }

    .location::before {
        background-image: url(/icons/my-location.svg);
    }
</style>
