<script lang="ts">
    import SectionName from './SectionName.svelte';
</script>

<div class="career">
    <SectionName>Career history</SectionName>

    <div class="job">
        <span class="job-period">February 2020 — till now</span>

        <strong class="job-position">Lead Software engineer</strong>
        at&nbsp;<a href="https://meetsidekick.com/">Sidekick&nbsp;Browser</a>

        <ol>
            <li>Implement cross-context communication in the Chromium extension</li>
            <li>Create fast in-memory search for history, documents etc, powered by WebWorker.</li>
            <li>Implement ML-based algorithm for suspending browser tabs</li>
            <li>Introduce and adopt of using Svelte 3 as main rendering tool</li>
            <li>Support Rails Backend on AWS and infrastructure via Terraform</li>
        </ol>
    </div>

    <div class="job">
        <span class="job-period">December 2018 — February 2020</span>

        <strong class="job-position">Senior frontend developer</strong>
        at&nbsp;<a href="https://www.metaquotes.net/en">MetaQuotes&nbsp;Ltd</a>

        <ol>
            <li>Create interactive charts by D3 library</li>
            <li>Build flexible frontend router</li>
            <li>Migrate codebase to ESnext from ES5+AMD</li>
            <li>Introduce Svelte 3 as main framework to speedup development</li>
            <li>Research user's behavior to improve bot scoring</li>
        </ol>
    </div>

    <div class="job">
        <span class="job-period">November 2017 — November 2018</span>

        <strong class="job-position">Senior frontend developer</strong>
        at&nbsp;<a href="https://en.ortnec.com/en">Ortnec&nbsp;Services&nbsp;Ltd</a>

        <ol>
            <li>Create web interface for sharing desktop screen</li>
            <li>Teaching teammates in frontend stack</li>
            <li>Introduce typing system (Flow) to ES6 codebase</li>
            <li>Creating own UI library based on Bootstrap with CSS-in-JS</li>
            <li>Introduce TDD into development process for core modules</li>
        </ol>
    </div>

    <div class="job">
        <span class="job-period">February 2016 — May 2017</span>

        <strong class="job-position">Full-stack web-developer</strong> at Advertising and design
        studio “WAX”

        <ol>
            <li>Creating new websites and editing exists on Wordpress</li>
            <li>Business logic & database design for typical solutions</li>
            <li>Create small prototypes on React</li>
            <li>Writing technical documentation for customers</li>
        </ol>
    </div>

    <div class="job">
        <span class="job-period">September 2013 — January 2016</span>

        <strong class="job-position">Middle web-developer</strong> at Web-studio “100idea.ru”

        <ol>
            <li>Creating websites on Angular, React</li>
            <li>Use Yii 2.0 framework for implemenmt simple API</li>
            <li>Prototyping websites with Balsamiq Mockups</li>
        </ol>
    </div>

    <div class="job">
        <span class="job-period">May 2012 — July 2013</span>

        <strong class="job-position">Web-master</strong> at Freelance

        <ol>
            <li>Installation and configuration of various CMS: Wordpress, Joomla, MODx</li>
            <li>Editing layout and scripts</li>
            <li>Integration of modules and plugins</li>
            <li>Configuring web-server (Apache, nginx) and DB</li>
        </ol>
    </div>
</div>

<style>
    .career {
        --section-icon: url(/icons/group-work.svg);

        grid-area: career;
    }

    .job {
        position: relative;
        margin-bottom: 2rem;
        padding-left: 3rem;
    }

    .job::before {
        position: absolute;
        content: '';
        top: 1.5rem;
        left: 7px;
        border: 5px solid transparent;
        box-shadow: 0 0 0 2px var(--primary-color);
        border-radius: 5px;
    }

    .job::after {
        position: absolute;
        content: '';
        top: calc(1.5rem + 12px + 0.25rem);
        left: 11px;
        bottom: calc(-2rem - 1.5rem + 0.25rem);
        width: 1px;
        background: var(--border-color);
    }

    .job:last-child::after {
        content: none;
    }

    .job-period {
        display: block;
        color: var(--soft-color);
        font-size: 0.8em;
        letter-spacing: 0.05em;
    }

    .job ol {
        margin-top: 0;
        font-size: 0.9rem;
    }

    @media (min-width: 480px) {
        .job ol {
            font-size: 1rem;
        }
    }
</style>
