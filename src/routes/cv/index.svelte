<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import './styles.css';

    const COLORS = [
        '#b02a1b',
        '#6cdc22',
        '#22c9dc',
        '#9222dc',
        '#7ccad6',
        '#8c5148',
        '#357882',
        '#12434a',
        '#a4b825',
        '#bebad9',
        '#c78573',
        '#a4cfdb',
        '#ed8164',
        '#d9f274',
    ];

    let allPoints = [];
    let points = allPoints;
    let categories = {};
    let activeCategory;

    const formatPercent = (x) => `${Math.round(x * 100)} %`;

    const margin = {
        top: 20,
        right: 15,
        bottom: 30,
        left: 30,
    };
    const scales = {
        x: d3.scaleLinear().domain([0, 1]),
        y: d3.scaleLinear().domain([0, 1]),
    };
    const axis = {
        x: d3.axisBottom(scales.x).ticks(5).tickSizeOuter(0).tickFormat(formatPercent),
        y: d3.axisLeft(scales.y).ticks(5).tickFormat(formatPercent),
    };
    const getters = {
        x: (d) => d.exp,
        y: (d) => d.like,
    };
    const graphElements = {};

    function getColor(category) {
        const index = Object.keys(categories).indexOf(category);

        return (index !== -1 && COLORS[index]) || '#000';
    }

    function initGraph() {
        const svg = d3.select('#interests');

        graphElements.xAxis = svg.append('g').classed('p-cv__axis', true);
        graphElements.yAxis = svg.append('g').classed('p-cv__axis', true);
        graphElements.xAxisTitle = svg
            .append('text')
            .classed('p-cv__axis-title', true)
            .text('Experience');
        graphElements.yAxisTitle = svg
            .append('text')
            .classed('p-cv__axis-title', true)
            .text('Like');
        graphElements.plot = svg.append('g');
        graphElements.svg = svg;
    }

    function setActivePoints(
        predicate = (d) => (activeCategory ? d.category === activeCategory : true),
    ) {
        graphElements.points
            .attr('r', (d) => (predicate(d) ? 5 : 2))
            .attr('fill', (d) => (predicate(d) ? getColor(d.category) : '#aaa'));
    }

    function showTooltip(datum) {
        if (activeCategory && datum.category !== activeCategory) {
            return;
        }

        const { svg } = graphElements;
        const height = svg.property('clientHeight');

        const tooltip = d3
            .select('#tooltip')
            .style('opacity', 1)
            .style('bottom', `${height - scales.y(getters.y(datum))}px`)
            .style('left', `${scales.x(getters.x(datum))}px`)
            .html('');

        tooltip.append('div').classed('p-cv__tooltip-name', true).text(datum.name);

        tooltip
            .append('div')
            .classed('p-cv__tooltip-line', true)
            .text(`Exp.: ${formatPercent(datum.exp)}`);

        tooltip
            .append('div')
            .classed('p-cv__tooltip-line', true)
            .text(`Like: ${formatPercent(datum.like)}`);
    }

    function hideTooltip() {
        d3.select('#tooltip').style('opacity', 0);
    }

    function updateGraph() {
        const { svg } = graphElements;

        const width = svg.property('clientWidth');
        const height = svg.property('clientHeight');

        // Update scales
        scales.x.range([margin.left, width - margin.right]);
        scales.y.range([height - margin.bottom, margin.top]);

        // Update axis
        graphElements.xAxis
            .call(axis.x)
            .attr(
                'transform',
                `translate(0,${margin.top + (height - margin.top - margin.bottom) / 2})`,
            );
        graphElements.yAxis
            .call(axis.y)
            .attr(
                'transform',
                `translate(${margin.left + (width - margin.left - margin.right) / 2},0)`,
            );

        graphElements.xAxisTitle.attr(
            'transform',
            `translate(${margin.left},${
                margin.top - 5 + (height - margin.top - margin.bottom) / 2
            })`,
        );

        graphElements.yAxisTitle
            .style('writing-mode', 'tb')
            .attr(
                'transform',
                `translate(${margin.left + 10 + (width - margin.left - margin.right) / 2},${
                    margin.top
                })`,
            );

        graphElements.points = graphElements.plot
            .selectAll('circle')
            .data(points)
            .join('circle')
            .attr('r', 3)
            .attr('cx', (d) => scales.x(getters.x(d)))
            .attr('cy', (d) => scales.y(getters.y(d)))
            .on('mouseover', showTooltip)
            .on('mouseout', hideTooltip);

        setActivePoints();
    }

    function updateLegend() {
        const container = d3.select('#legend');

        container
            .selectAll('button')
            .data(Object.keys(categories))
            .join('button')
            .classed('p-cv__legend-btn', true)
            .text((d) => d)
            .on('click', (datum, index, arr) => {
                activeCategory = activeCategory !== datum ? datum : null;
                setActivePoints();
                container.selectAll('button').classed('p-cv__legend-btn_active', false);
                if (activeCategory) {
                    d3.select(arr[index]).classed('p-cv__legend-btn_active', true);
                }
            })
            .on('mouseover', (datum) => {
                setActivePoints(
                    (d) =>
                        d.category === datum || (activeCategory && d.category === activeCategory),
                );
            })
            .on('mouseout', () => {
                setActivePoints();
            })
            .append('span')
            .style('background', (d) => getColor(d));
    }

    function renderPrintPoint(selection) {
        selection
            .append('span')
            .classed('p-cv__interest-name', true)
            .text((d) => d.name);

        selection
            .append('span')
            .classed('p-cv__interest-category', true)
            .style('color', (d) => getColor(d.category))
            .text((d) => d.category);

        selection
            .append('span')
            .classed('p-cv__interest-like', true)
            .text((d) => `Like: ${formatPercent(d.like)}`);

        selection
            .append('span')
            .classed('p-cv__interest-exp', true)
            .text((d) => `Exp.: ${formatPercent(d.exp)}`);
    }

    function printPoints(data) {
        d3.select('#interests-print')
            .selectAll('div')
            .data(
                data
                    .slice()
                    .sort((a, b) => 2 * (b.like - a.like) + (b.exp - a.exp))
                    .slice(0, 3 * 10),
            )
            .join('div')
            .classed('p-cv__interest-item', true)
            .call(renderPrintPoint);
    }

    function startLoad() {
        fetch('/interests.csv')
            .then((response) => response.text())
            .then((data) => data.split('\n').map((row) => row.split(',')))
            .then(([head, ...rows]) =>
                rows
                    .filter((row) => row.length === head.length)
                    .map((row) => Object.fromEntries(head.map((key, index) => [key, row[index]]))),
            )
            .then((data) => {
                allPoints = data;
                points = allPoints;

                categories = data.reduce((acc, point) => {
                    if (acc[point.category] == null) {
                        acc[point.category] = [];
                    }

                    acc[point.category].push(point);

                    return acc;
                }, {});

                updateGraph();
                updateLegend();
                printPoints(data);
            });
    }

    onMount(() => {
        initGraph();
        updateGraph();
        startLoad();

        let raf: ReturnType<typeof requestAnimationFrame>;
        const resizeHandler = () => {
            if (raf) {
                cancelAnimationFrame(raf);
            }
            raf = requestAnimationFrame(updateGraph);
        };

        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    });
</script>

<svelte:head>
    <title>Vladislav Orlov - Senior frontend developer</title>
</svelte:head>

<div class="l-container p-cv">
    <header class="p-cv__header">
        <a href="/" class="invisible-link">
            <picture>
                <source srcset="/profile-pic.avif" type="image/avif" />
                <img class="p-cv__avatar" src="/profile-pic.jpg" alt="Vladislav Orlov" />
            </picture>
        </a>

        <h1 class="p-cv__name">
            <a href="/" class="invisible-link">Vladislav Orlov</a>
            <small class="p-cv__title">Senior Frontend Developer</small>
        </h1>
    </header>

    <div class="p-cv__skill-set">
        <h2 class="p-cv__block-name">Professional Skills</h2>

        <div class="p-cv__skill">
            Task decomposition
            <div class="p-cv__progress" title="Progress: 75%">
                <div class="p-cv__progress-bar" style="width: 75%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Write clean code
            <div class="p-cv__progress" title="Progress: 95%">
                <div class="p-cv__progress-bar" style="width: 95%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Testing
            <div class="p-cv__progress" title="Progress: 60%">
                <div class="p-cv__progress-bar" style="width: 60%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Solution design
            <div class="p-cv__progress" title="Progress: 85%">
                <div class="p-cv__progress-bar" style="width: 85%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Scheduling a workflow
            <div class="p-cv__progress" title="Progress: 70%">
                <div class="p-cv__progress-bar" style="width: 70%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Debugging
            <div class="p-cv__progress" title="Progress: 75%">
                <div class="p-cv__progress-bar" style="width: 75%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Task estimation
            <div class="p-cv__progress" title="Progress: 60%">
                <div class="p-cv__progress-bar" style="width: 60%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Team working
            <div class="p-cv__progress" title="Progress: 90%">
                <div class="p-cv__progress-bar" style="width: 90%" />
            </div>
        </div>

        <div class="p-cv__skill">
            Documentation
            <div class="p-cv__progress" title="Progress: 70%">
                <div class="p-cv__progress-bar" style="width: 70%" />
            </div>
        </div>
    </div>

    <div class="p-cv__contacts">
        <h2 class="p-cv__block-name">Contacts</h2>

        <a class="p-cv__mail-link" href="mailto:me@orlov-vo.ru">me@orlov-vo.ru</a>
        <a class="p-cv__telegram-link" href="https://t.me/orlov_vo">t.me/orlov_vo</a>
        <a class="p-cv__github-link" href="https://github.com/orlov-vo">github.com/orlov-vo</a>
        <a class="p-cv__linkedin-link" href="https://linkedin.com/in/orlov-vo/"
            >linkedin.com/in/orlov-vo</a
        >

        <span class="p-cv__location">Russia, Moscow (UTC+3)</span>
    </div>

    <div class="p-cv__summary">
        <h2 class="p-cv__block-name">Personal summary</h2>

        <p>
            Driven professional with broad technical skill set. Excellent developer experienced in
            interpreting and implementing client and staff business vision. Thrives in environments
            that constantly embrace modern technologies.
        </p>

        <p>
            <a href="https://github.com/orlov-vo/preact-example-weather-app">
                <strong>Example of my code - github:orlov-vo/preact-example-weather-app</strong>
            </a>
        </p>
    </div>

    <div class="p-cv__interests">
        <h2 class="p-cv__block-name">My tech interests</h2>

        <div class="p-cv__interests-graph">
            <div class="p-cv__graph-container">
                <svg id="interests" class="p-cv__graph" width="100%" height="100%" />
                <div id="tooltip" class="p-cv__tooltip" />
            </div>

            <div id="legend" class="p-cv__legend" />
        </div>

        <div class="p-cv__interests-print-info">
            Here you see Top-30 my tech interests. Full list you can see on my website online:
            <a href="https://orlov-vo.ru/cv/">https://orlov-vo.ru/cv/</a>
        </div>

        <div id="interests-print" class="p-cv__interests-print" />
    </div>

    <div class="p-cv__career">
        <h2 class="p-cv__block-name">Career history</h2>

        <div class="p-cv__job">
            <span class="p-cv__job-period">February 2020 — till now</span>

            <strong class="p-cv__job-position">Software engineer</strong>
            at&nbsp;<a href="https://meetsidekick.com/">PushPlayLabs&nbsp;Inc</a>

            <ol>
                <li>Develop the extension for Sidekick browser</li>
                <li>Create fast in-memory search for history, documents etc.</li>
                <li>Implement ML-based algorithm for suspending tabs</li>
                <li>Introduce and adopt of using Svelte 3 as main rendering tool</li>
                <li>Create new extension architecture based on effector to make project simple</li>
            </ol>
        </div>

        <div class="p-cv__job">
            <span class="p-cv__job-period">December 2018 — February 2020</span>

            <strong class="p-cv__job-position">Senior frontend developer</strong>
            at&nbsp;<a href="https://www.metaquotes.net/en">MetaQuotes&nbsp;Ltd</a>

            <ol>
                <li>Implement new business features</li>
                <li>Migrate codebase to ESnext from ES5+AMD</li>
                <li>Introduce Svelte 3 as main framework</li>
                <li>Build flexible frontend router</li>
                <li>Research user's behavior to improve bot scoring</li>
            </ol>
        </div>

        <div class="p-cv__job">
            <span class="p-cv__job-period">November 2017 — November 2018</span>

            <strong class="p-cv__job-position">Senior frontend developer</strong>
            at&nbsp;<a href="https://en.ortnec.com/en">Ortnec&nbsp;Services&nbsp;Ltd</a>

            <ol>
                <li>Implement new business features</li>
                <li>Introduce typing system (Flow) to ES6 codebase</li>
                <li>Teaching teammates in frontend stack</li>
                <li>Support and development of project’s infrastructure</li>
                <li>Creating own UI library based on Bootstrap with CSS-in-JS</li>
                <li>Testing, debugging & documentation</li>
            </ol>
        </div>

        <div class="p-cv__job">
            <span class="p-cv__job-period">February 2016 — May 2017</span>

            <strong class="p-cv__job-position">Full-stack web-developer</strong> at Advertising and
            design studio “WAX”

            <ol>
                <li>Creating new websites and editing exists</li>
                <li>Business logic & database design</li>
                <li>User interface design</li>
                <li>Testing, debugging & documentation</li>
            </ol>
        </div>

        <div class="p-cv__job">
            <span class="p-cv__job-period">September 2013 — January 2016</span>

            <strong class="p-cv__job-position">Middle web-developer</strong> at Web-studio
            “100idea.ru”

            <ol>
                <li>Creating new websites and editing exists</li>
                <li>Business logic & database design</li>
                <li>Testing, debugging & documentation</li>
            </ol>
        </div>

        <div class="p-cv__job">
            <span class="p-cv__job-period">May 2012 — July 2013</span>

            <strong class="p-cv__job-position">Web-master</strong> at Freelance

            <ol>
                <li>Installation and configuration of various CMS: Wordpress, Joomla, MODx</li>
                <li>Editing layout and scripts</li>
                <li>Integration of modules and plugins</li>
                <li>Configuring web-server (Apache, nginx) and DB</li>
            </ol>
        </div>
    </div>

    <div class="p-cv__projects">
        <h2 class="p-cv__block-name">Portfolio</h2>

        <h3>Pet-projects</h3>
        <ol>
            <li>
                <a href="https://github.com/orlov-vo/ramodel">ramodel</a> — a library for creating reactive
                & flexible models with Hooks API.
            </li>
            <li>
                <a href="https://github.com/orlov-vo/idxgen">idxgen</a> — a simple generator of index
                files for ES-modules.
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
        <nav class="p-cv__project-short-list">
            <span class="p-cv__project"
                >2020 <a href="https://meetsidekick.com/">meetsidekick.com</a></span
            >
            <span class="p-cv__project">2019 <a href="https://finteza.com/">finteza.com</a></span>
            <span class="p-cv__project">
                2018 <a href="https://spankwire.com/">spankwire.com</a>
            </span>
            <span class="p-cv__project">2018 <a href="https://sofarm.me/">sofarm.me</a></span>
            <span class="p-cv__project">2017 <a href="https://yourplus.ru/">yourplus.ru</a></span>
            <span class="p-cv__project">
                2017 <a href="https://white-smile.biz/">white-smile.biz</a>
            </span>
            <span class="p-cv__project">
                2017 <a href="https://detox.spa-greenwood.ru/">detox.spa-greenwood.ru</a>
            </span>
            <span class="p-cv__project">
                2016 <a href="https://franchise.adjiki.ru/">franchise.adjiki.ru</a>
            </span>
            <span class="p-cv__project">
                2016 <a href="https://tender-masters.ru/">tender-masters.ru</a>
            </span>
            <span class="p-cv__project">
                2016 <a href="https://franchise.teppan.ru/">franchise.teppan.ru</a>
            </span>
            <span class="p-cv__project">
                2016 <a href="https://franchise.drovamuka.ru/">franchise.drovamuka.ru</a>
            </span>
            <span class="p-cv__project">
                2015 <a href="https://atlantica-nk.ru/">atlantica-nk.ru</a>
            </span>
        </nav>
    </div>

    <div class="p-cv__education">
        <h2 class="p-cv__block-name">Education</h2>

        <p>
            <span class="p-cv__education-period">2013 — 2017</span>

            <a href="https://sibsutis.ru/en/">
                Siberian State University of Telecommunications and Information Sciences
            </a>
            - Bachelor’s degree in Computer Science
        </p>
    </div>

    <div class="p-cv__hobbies">
        <h2 class="p-cv__block-name">Hobbies and interests</h2>

        <p>
            Main hobby for me is a developing applications for humans. Also I have favourite
            activities that aren’t connected with computers. I like snowboarding and swimming, but
            also I like passive activities as relaxing on a beach or going to picnic. I love
            travelling and exploring something.
        </p>
        <p>
            I've been jumping from the sky (above 4000 meters) with my wife, after that I think I
            don't scared by difficulties.
        </p>
    </div>
</div>
