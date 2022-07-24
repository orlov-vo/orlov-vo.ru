<script lang="ts">
    import SectionName from './SectionName.svelte';
</script>

<div class="hobbies">
    <SectionName>Hobbies and interests</SectionName>

    <p>
        Main hobby for me is a developing applications for humans. Also I have favourite activities
        that aren’t connected with computers. I like snowboarding and swimming, but also I like
        passive activities as relaxing on a beach or going to picnic. I love travelling and
        exploring something.
    </p>
    <p>
        I've been jumping from the sky (above 4000 meters) with my wife, after that I think I don't
        scared by difficulties.
    </p>
</div>

<style>
    .hobbies {
        --section-icon: url(/icons/sports-football.svg);

        grid-area: hobbies;
    }
</style>
