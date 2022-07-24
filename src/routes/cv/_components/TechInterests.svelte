<script lang="ts">
    import MediaQuery from '$lib/components/MediaQuery.svelte';
    import SectionName from './SectionName.svelte';

    import { assert } from '$lib/utils/assert';
    import type { NumberValue } from 'd3';
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    type Point = {
        readonly name: string;
        readonly category: string;
        readonly like: number;
        readonly exp: number;
    };

    const FIELDS: ReadonlyArray<keyof Point> = ['name', 'category', 'like', 'exp'];
    const MARGIN = { TOP: 20, RIGHT: 15, BOTTOM: 30, LEFT: 30 } as const;
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
    ] as const;

    let svgContainer: SVGElement;
    let svgAxisX: SVGGElement;
    let svgAxisY: SVGGElement;

    let allPoints: readonly Point[] = [];
    let categories: Record<string, Point[]> = {};
    let svgContainerHeight = 0;
    let svgContainerWidth = 0;
    let tooltipVisibleFor: Point | null = null;
    let activeCategory: string | null = null;
    let hoverCategory: string | null = null;
    let scaleX = d3.scaleLinear().domain([0, 1]);
    let scaleY = d3.scaleLinear().domain([0, 1]);

    const formatPercent = (x: NumberValue): string => `${Math.round(x.valueOf() * 100)} %`;
    const axis = {
        x: d3.axisBottom(scaleX).ticks(5).tickSizeOuter(0).tickFormat(formatPercent),
        y: d3.axisLeft(scaleY).ticks(5).tickFormat(formatPercent),
    };
    const getX = (d: Point) => scaleX(d.exp);
    const getY = (d: Point) => scaleY(d.like);

    $: categories = allPoints.reduce((acc, point) => {
        const list = acc[point.category];

        if (list == null) {
            acc[point.category] = [point];
        } else {
            list.push(point);
        }

        return acc;
    }, {} as Record<string, Point[]>);

    $: {
        scaleX = scaleX.range([MARGIN.LEFT, svgContainerWidth - MARGIN.RIGHT]);
    }
    $: {
        scaleY = scaleY.range([svgContainerHeight - MARGIN.BOTTOM, MARGIN.TOP]);
    }

    $: pointsToPrint = allPoints
        .filter((point) => isPointActive(point, activeCategory, hoverCategory))
        .sort((a, b) => 2 * (b.like - a.like) + (b.exp - a.exp))
        .slice(0, 30);

    function getColor(category: string): string {
        const index = Object.keys(categories).indexOf(category);

        return (index !== -1 && COLORS[index]) || '#000';
    }

    function isPointActive(
        point: Point,
        activeCategory: string | null,
        hoverCategory: string | null,
    ): boolean {
        if (hoverCategory && hoverCategory === point.category) return true;
        if (activeCategory) return activeCategory === point.category;
        return !hoverCategory;
    }

    function showTooltip(point: Point) {
        if (activeCategory && point.category !== activeCategory) return;
        tooltipVisibleFor = point;
    }

    function hideTooltip() {
        tooltipVisibleFor = null;
    }

    function updateContainerSizes() {
        svgContainerWidth = svgContainer.clientWidth;
        svgContainerHeight = svgContainer.clientHeight;
    }

    function updateAxis() {
        d3.select(svgAxisX).call(axis.x);
        d3.select(svgAxisY).call(axis.y);
    }

    function updateGraph() {
        updateContainerSizes();
        updateAxis();
    }

    function isHeadHasValidFields(head: string[] | undefined): asserts head is Array<keyof Point> {
        assert(head && head.every((key) => FIELDS.includes(key as keyof Point)));
    }

    async function loadData(): Promise<readonly Point[]> {
        const response = await fetch('/interests.csv');
        const text = await response.text();

        const [head, ...rows] = text.split('\n').map((row) => row.split(','));
        isHeadHasValidFields(head);

        return rows
            .filter((row) => row.length === head.length)
            .map(
                (row) =>
                    Object.fromEntries(
                        head.map((key, index) => [key, row[index]] as const),
                    ) as unknown as Point,
            );
    }

    onMount(() => {
        updateGraph();
        loadData().then((data) => {
            allPoints = data;
            updateGraph();
        });

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

<div class="interests">
    <SectionName>My tech interests</SectionName>

    <div class="interests-graph">
        <div class="graph-container">
            <svg bind:this={svgContainer} class="graph" width="100%" height="100%">
                <g>
                    {#each allPoints as point}
                        <circle
                            r={isPointActive(point, activeCategory, hoverCategory) ? 5 : 2}
                            cx={getX(point)}
                            cy={getY(point)}
                            fill={isPointActive(point, activeCategory, hoverCategory)
                                ? getColor(point.category)
                                : '#aaa'}
                            on:focus={() => showTooltip(point)}
                            on:mouseover={() => showTooltip(point)}
                            on:blur={() => hideTooltip()}
                            on:mouseleave={() => hideTooltip()}
                        />
                    {/each}
                </g>

                <g
                    class="axis"
                    style:transform="translate(0, {MARGIN.TOP +
                        (svgContainerHeight - MARGIN.TOP - MARGIN.BOTTOM) / 2}px)"
                >
                    <g bind:this={svgAxisX} />
                    <text class="axis-title" style:transform="translate({MARGIN.LEFT}px, -5px)">
                        Experience
                    </text>
                </g>

                <g
                    class="axis"
                    style:transform="translate({MARGIN.LEFT +
                        (svgContainerWidth - MARGIN.LEFT - MARGIN.RIGHT) / 2}px, 0)"
                >
                    <g bind:this={svgAxisY} />
                    <text
                        class="axis-title"
                        style:writing-mode="tbl"
                        style:transform="translate(10px, {MARGIN.TOP}px)"
                    >
                        Like
                    </text>
                </g>
            </svg>

            {#if tooltipVisibleFor}
                <div
                    class="tooltip"
                    style:bottom="{svgContainerHeight - getY(tooltipVisibleFor)}px"
                    style:left="{getX(tooltipVisibleFor)}px"
                >
                    <div class="tooltip-name">{tooltipVisibleFor.name}</div>
                    <div class="tooltip-line">
                        Exp.: {formatPercent(tooltipVisibleFor.exp)}
                    </div>
                    <div class="tooltip-line">
                        Like: {formatPercent(tooltipVisibleFor.like)}
                    </div>
                </div>
            {/if}
        </div>

        <div class="legend">
            {#each Object.keys(categories) as category}
                <button
                    class="legend-btn"
                    class:legend-btn_active={activeCategory === category}
                    on:click={() => {
                        activeCategory = activeCategory !== category ? category : null;
                    }}
                    on:focus={() => (hoverCategory = category)}
                    on:blur={() => (hoverCategory = null)}
                    on:mouseover={() => (hoverCategory = category)}
                    on:mouseout={() => (hoverCategory = null)}
                >
                    {category}
                    <span style:background={getColor(category)} />
                </button>
            {/each}
        </div>
    </div>

    <div class="interests-print-info">
        Here you see Top-30 my tech interests. Full list you can see on my website online:
        <a href="https://orlov-vo.ru/cv/">https://orlov-vo.ru/cv/</a>
    </div>

    <div class="interests-print">
        <MediaQuery query="print" let:matches={isPageForPrint}>
            <MediaQuery query="(min-width: 800px)" let:matches={isEnoughWidth}>
                {@const points = isPageForPrint
                    ? pointsToPrint
                    : pointsToPrint.slice(0, isEnoughWidth ? 9 : 4)}
                {#each points as point}
                    <div class="interest-item">
                        <span class="interest-name">{point.name}</span>
                        <span class="interest-category" style:color={getColor(point.category)}>
                            {point.category}
                        </span>
                        <span class="interest-like">Like: {formatPercent(point.like)}</span>
                        <span class="interest-exp">Exp.: {formatPercent(point.exp)}</span>
                    </div>
                {/each}
            </MediaQuery>
        </MediaQuery>
    </div>
</div>

<style>
    .interests {
        --section-icon: url(/icons/favorite-border.svg);

        grid-area: interests;
    }

    .interests-graph {
        margin-bottom: 1rem;
    }

    .interests-print {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-template-rows: repeat(4, 1fr);
        grid-auto-rows: 1fr;
        grid-gap: 1rem;
        overflow-y: hidden;
    }

    @media (min-width: 580px) {
        .interests-print {
            grid-template-columns: repeat(2, minmax(250px, 1fr));
            grid-template-rows: repeat(2, 1fr);
        }
    }

    @media (min-width: 800px) {
        .interests-print {
            grid-template-columns: repeat(3, minmax(250px, 1fr));
            grid-template-rows: repeat(3, 1fr);
        }
    }

    .interests-print-info {
        display: none;
        margin-bottom: 1.5rem;
    }

    .interest-item {
        display: grid;
        grid-template-columns: 70px auto;
        grid-template-areas: 'like name' 'exp category';
        align-items: center;
        grid-gap: 0 0.5em;
    }

    .interest-name {
        grid-area: name;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .interest-category {
        grid-area: category;
        display: block;
        font-size: 0.8em;
    }

    .interest-exp,
    .interest-like {
        display: block;
        font-size: 0.75em;
        line-height: 1;
        text-align: right;
        font-variant-numeric: tabular-nums;
        color: var(--soft-color);
    }

    .interest-exp {
        grid-area: exp;
    }

    .interest-like {
        grid-area: like;
    }

    @media print {
        .interests-graph {
            display: none;
        }

        .interests-print {
            display: grid;
        }

        .interests-print-info {
            display: block;
        }
    }

    .graph-container {
        position: relative;
        padding-top: 60%;
    }

    @media (min-height: 480px) and (max-width: 480px) {
        .graph-container {
            padding-top: 150%;
        }
    }

    .graph {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .axis {
        color: var(--border-color);
    }

    .axis text {
        color: var(--soft-color);
    }

    .axis-title {
        fill: var(--soft-color);
        font-size: 0.8rem;
    }

    .tooltip {
        position: absolute;
        display: flex;
        background: rgba(0, 0, 0, 0.8);
        padding: 0.25rem 0.5rem;
        color: white;
        font-size: 0.8rem;
        transform: translate(-50%, -1em);
        border-radius: 0.25rem;
        min-width: 10rem;
        flex-wrap: wrap;
        pointer-events: none;
        box-shadow: 0 0.25em 1em 0 rgba(0, 0, 0, 0.1);
    }

    .tooltip::before {
        content: '';
        position: absolute;
        top: 100%;
        left: calc(50% - 5px);
        border: 5px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.8);
    }

    .tooltip-name {
        flex: 1 0 100%;
        text-align: center;
        font-weight: bold;
        white-space: nowrap;
    }

    .tooltip-line {
        flex-grow: 1;
        text-align: center;
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        padding: -0.25rem;
    }

    .legend-btn {
        position: relative;
        background: transparent;
        color: var(--soft-color);
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
        font-size: 0.9rem;
        padding: 0.25em 0.5em 0.25em 1.5em;
        margin: 0.25rem;
        cursor: pointer;
        outline: none;
    }

    .legend-btn:hover,
    .legend-btn:focus {
        color: var(--normal-color);
    }

    .legend-btn_active,
    .legend-btn_active:hover,
    .legend-btn_active:focus {
        color: var(--primary-color);
        border-color: var(--primary-color);
    }

    .legend-btn span {
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        line-height: 0;
        position: absolute;
        top: 50%;
        left: 0.5em;
        transform: translateY(-50%);
        border-radius: 1em;
    }
</style>
