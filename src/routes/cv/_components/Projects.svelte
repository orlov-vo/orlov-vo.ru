<script lang="ts">
    import SectionName from './SectionName.svelte';
</script>

<div class="projects">
    <SectionName>Portfolio</SectionName>

    <h3>Pet-projects</h3>
    <ol>
        <li>
            <a href="https://github.com/orlov-vo/ramodel">ramodel</a> — a library for creating reactive
            & flexible models with Hooks API.
        </li>
        <li>
            <a href="https://github.com/orlov-vo/idxgen">idxgen</a> — a simple generator of index files
            for ES-modules.
        </li>
        <li>
            <a href="https://github.com/orlov-vo/redux-promisify-action">
                redux-promisify-action
            </a>
            — a Redux's middleware for transforming results of dispatched actions to promises
        </li>
        <li>
            <a href="https://github.com/orlov-vo/scrumex/tree/develop">scrumex</a> — a flexible system
            for project management with Scrum methodology.
        </li>
    </ol>

    <h3>Participated in the creation</h3>
    <nav class="project-short-list">
        <span class="project">2020 <a href="https://meetsidekick.com/">meetsidekick.com</a></span>
        <span class="project">2019 <a href="https://finteza.com/">finteza.com</a></span>
        <span class="project">
            2018 <a href="https://spankwire.com/">spankwire.com</a>
        </span>
        <span class="project">2018 <a href="https://sofarm.me/">sofarm.me</a></span>
        <span class="project">2017 <a href="https://yourplus.ru/">yourplus.ru</a></span>
        <span class="project">
            2017 <a href="https://white-smile.biz/">white-smile.biz</a>
        </span>
        <span class="project">
            2017 <a href="https://detox.spa-greenwood.ru/">detox.spa-greenwood.ru</a>
        </span>
        <span class="project">
            2016 <a href="https://franchise.adjiki.ru/">franchise.adjiki.ru</a>
        </span>
        <span class="project">
            2016 <a href="https://tender-masters.ru/">tender-masters.ru</a>
        </span>
        <span class="project">
            2016 <a href="https://franchise.teppan.ru/">franchise.teppan.ru</a>
        </span>
        <span class="project">
            2016 <a href="https://franchise.drovamuka.ru/">franchise.drovamuka.ru</a>
        </span>
        <span class="project">
            2015 <a href="https://atlantica-nk.ru/">atlantica-nk.ru</a>
        </span>
    </nav>
</div>

<style>
    .projects {
        --section-icon: url(/icons/done-all.svg);

        grid-area: projects;
    }

    .project {
        color: var(--soft-color);
        font-size: 0.8em;
    }

    .project a {
        font-size: 1rem;
    }

    .project-short-list {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 480px) {
        .project-short-list {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>
