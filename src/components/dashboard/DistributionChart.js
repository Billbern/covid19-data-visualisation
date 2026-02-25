import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DistributionChart = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const chartData = [
                { name: 'Active', value: data.active, color: '#f59e0b' },
                { name: 'Recovered', value: data.recovered, color: '#16a34a' },
                { name: 'Deaths', value: data.deaths, color: '#dc2626' }
            ];

            const width = 300;
            const height = 300;
            const margin = 20;
            const radius = Math.min(width, height) / 2 - margin;

            // Clear previous svg
            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const pie = d3.pie()
                .value(d => d.value)
                .sort(null);

            const arc = d3.arc()
                .innerRadius(radius * 0.6) // Donut
                .outerRadius(radius);

            const arcs = svg.selectAll("arc")
                .data(pie(chartData))
                .enter()
                .append("g");

            arcs.append("path")
                .attr("d", arc)
                .attr("fill", d => d.data.color)
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7)
                .transition()
                .duration(1000)
                .attrTween("d", function (d) {
                    const i = d3.interpolate(d.startAngle + 0.1, d.startAngle);
                    return function (t) {
                        d.startAngle = i(t);
                        return arc(d);
                    };
                });

            // Add labels or center text
            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "-0.5em")
                .attr("class", "text-xs font-medium fill-gray-500 uppercase tracking-widest")
                .text("Total Status");

            svg.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "1em")
                .attr("class", "text-xl font-bold fill-gray-900")
                .text(d3.format(".2s")(data.cases));
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center">
            <div ref={d3Container} />
            <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                {[
                    { label: 'Active', color: 'bg-amber-500' },
                    { label: 'Recovered', color: 'bg-green-600' },
                    { label: 'Deaths', color: 'bg-red-600' }
                ].map(item => (
                    <div key={item.label} className="flex flex-col items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DistributionChart;
