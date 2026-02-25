import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ComparisonChart = ({ countries }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (countries && countries.length && d3Container.current) {
            const data = countries.slice(0, 7).map(c => ({
                country: c.country,
                cases: c.cases
            }));

            const margin = { top: 20, right: 30, bottom: 40, left: 90 };
            const width = 500 - margin.left - margin.right;
            const height = 300 - margin.top - margin.bottom;

            // Clear previous svg
            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.cases)])
                .range([0, width]);

            const y = d3.scaleBand()
                .range([0, height])
                .domain(data.map(d => d.country))
                .padding(0.2);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2s")))
                .selectAll("text")
                .attr("class", "text-[10px] fill-gray-400 font-medium");

            svg.append("g")
                .call(d3.axisLeft(y))
                .selectAll("text")
                .attr("class", "text-[10px] fill-gray-500 font-bold uppercase");

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", x(0))
                .attr("y", d => y(d.country))
                .attr("width", 0)
                .attr("height", y.bandwidth())
                .attr("fill", "#dc2626")
                .attr("rx", 4)
                .style("opacity", 0.8)
                .transition()
                .duration(1000)
                .attr("width", d => x(d.cases));

            // Remove axis lines for cleaner look
            svg.selectAll(".domain").remove();
            svg.selectAll(".tick line").attr("stroke", "#f3f4f6");
        }
    }, [countries]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div ref={d3Container} />
        </div>
    );
};

export default ComparisonChart;
