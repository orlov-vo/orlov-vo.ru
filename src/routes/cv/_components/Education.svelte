<script lang="ts">
    import SectionName from './SectionName.svelte';
</script>

<div class="education">
    <SectionName>Education</SectionName>

    <p>
        <span class="education-period">2013 — 2017</span>

        <a href="https://sibsutis.ru/en/">
            Siberian State University of Telecommunications and Information Sciences
        </a>
        - Bachelor’s degree in Computer Science
    </p>
</div>

<style>
    .education {
        --section-icon: url(/icons/school.svg);

        grid-area: education;
    }

    .education-period {
        display: block;
        font-size: 0.9em;
        color: var(--soft-color);
    }
</style>
