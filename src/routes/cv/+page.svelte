<script lang="ts">
    import Header from './_components/Header.svelte';
    import SkillSet from './_components/SkillSet.svelte';
    import Contacts from './_components/Contacts.svelte';
    import Summary from './_components/Summary.svelte';
    import TechInterests from './_components/TechInterests.svelte';
    import Career from './_components/Career.svelte';
    import Projects from './_components/Projects.svelte';
    import Hobbies from './_components/Hobbies.svelte';
    import Education from './_components/Education.svelte';

    const name = 'Vladislav Orlov';
    const position = 'Senior Full-stack Developer';
</script>

<svelte:head>
    <title>{name} - {position}</title>
</svelte:head>

<div class="l-container p-cv">
    <Header {name} {position} />
    <Summary />
    <SkillSet />
    <Contacts />
    <TechInterests />
    <Career />
    <Projects />
    <Hobbies />
    <Education />
</div>

<style>
    .p-cv {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: 'head' 'summary' 'skill-set' 'contacts' 'interests' 'career' 'projects' 'education' 'hobbies';
        grid-gap: 2rem;
        -webkit-print-color-adjust: exact;
    }

    @media print, (min-width: 600px) {
        .p-cv {
            grid-template-columns: 2fr 1fr;
            grid-template-areas: 'head head' 'summary summary' 'skill-set contacts' 'interests interests' 'career career' 'projects projects' 'hobbies education';
        }
    }
</style>
