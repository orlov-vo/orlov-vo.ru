<script lang="ts">
    import SectionName from './SectionName.svelte';

    const skills = [
        { name: 'Task decomposition', progress: 75 },
        { name: 'Write clean code', progress: 95 },
        { name: 'Testing', progress: 80 },
        { name: 'Solution design', progress: 85 },
        { name: 'Scheduling a workflow', progress: 70 },
        { name: 'Debugging', progress: 85 },
        { name: 'Task estimation', progress: 60 },
        { name: 'Team working', progress: 90 },
        { name: 'Documentation', progress: 70 },
    ] as const;
</script>

<div class="skill-set">
    <SectionName>Professional Skills</SectionName>

    <div class="skill-list">
        {#each skills as skill}
            <div class="skill">
                {skill.name}
                <div class="progress" title="Progress: {skill.progress}%">
                    <div class="progress-bar" style="width: {skill.progress}%" />
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .skill-set {
        --section-icon: url(/icons/work-outline.svg);

        grid-area: skill-set;
    }

    .skill-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
        grid-gap: 1rem;
        align-content: flex-start;
    }

    @media (min-width: 480px) and (max-width: 600px), (min-width: 740px) {
        .skill-list {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media print {
        .skill-list {
            grid-template-columns: 1fr 1fr;
        }
    }

    .skill {
        font-size: 0.8em;
        display: inline-block;
    }

    .progress {
        height: 0.25rem;
        background: var(--border-color);
        border-radius: 0.25rem;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        background: var(--primary-color);
    }
</style>
