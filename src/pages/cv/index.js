import * as d3 from 'd3';
import './styles.css';
import interests from './interests.csv';

const COLORS = [
    '#b02a1b',
    '#6cdc22',
    '#22c9dc',
    '#9222dc',
    '#f6e07c',
    '#3bb8f2',
    '#ff9c0e',
    '#b1ff91',
    '#a891ff',
    '#ff91e8',
    '#b05727',
    '#3bb027',
    '#9c27b0',
    '#2780b0',
];

let allPoints = [];
let points = allPoints;
let categories = {};
let activeCategory;

const formatPercent = x => `${Math.round(x * 100)} %`;

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
    x: d3
        .axisBottom(scales.x)
        .ticks(5)
        .tickSizeOuter(0)
        .tickFormat(formatPercent),
    y: d3
        .axisLeft(scales.y)
        .ticks(5)
        .tickFormat(formatPercent),
};
const getters = {
    x: d => d.exp,
    y: d => d.like,
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

function setActivePoints(predicate = d => (activeCategory ? d.category === activeCategory : true)) {
    graphElements.points
        .attr('r', d => (predicate(d) ? 5 : 2))
        .attr('fill', d => (predicate(d) ? getColor(d.category) : '#aaa'));
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

    tooltip
        .append('div')
        .classed('p-cv__tooltip-name', true)
        .text(datum.name);

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
        `translate(${margin.left},${margin.top - 5 + (height - margin.top - margin.bottom) / 2})`,
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
        .attr('cx', d => scales.x(getters.x(d)))
        .attr('cy', d => scales.y(getters.y(d)))
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
        .text(d => d)
        .on('click', (datum, index, arr) => {
            activeCategory = activeCategory !== datum ? datum : null;
            setActivePoints();
            container.selectAll('button').classed('p-cv__legend-btn_active', false);
            if (activeCategory) {
                d3.select(arr[index]).classed('p-cv__legend-btn_active', true);
            }
        })
        .on('mouseover', datum => {
            setActivePoints(
                d => d.category === datum || (activeCategory && d.category === activeCategory),
            );
        })
        .on('mouseout', () => {
            setActivePoints();
        })
        .append('span')
        .style('background', d => getColor(d));
}

function startLoad() {
    fetch(`/${interests}`)
        .then(response => response.text())
        .then(data => data.split('\n').map(row => row.split(',')))
        .then(([head, ...rows]) =>
            rows
                .filter(row => row.length === head.length)
                .map(row => Object.fromEntries(head.map((key, index) => [key, row[index]]))),
        )
        .then(data => {
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
        });
}

initGraph();
updateGraph();
startLoad();

let raf;
window.addEventListener('resize', () => {
    if (raf) {
        cancelAnimationFrame(raf);
    }
    raf = requestAnimationFrame(updateGraph);
});
