import * as d3 from 'd3';

export default function Bar(props) {


    function createBars() {
        let contents = props.data;
        const width = 288;
        const height = 288;
        const margin = ({top: 30, right: 0, bottom: 30, left: 40});
        let x = d3.scaleBand().domain(d3.range(contents.length)).range([margin.left, width - margin.right]).padding(0.1)
        let y = d3.scaleLinear().domain([0, d3.max(contents, d => d.number)]).nice().range([height - margin.bottom, margin.top])
        let xAxis = g => g.attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(x).tickFormat(i => contents[i].condition).tickSizeOuter(0))
        let yAxis = g => g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(null, contents.format)).call(g => g.select(".domain").remove())
                .call(g => g.append("text").attr("x", -margin.left).attr("y", 10).attr("fill", "currentColor").attr("text-anchor", "start").text(contents.y))
        let svg = d3.create('svg').attr("viewbox", [0, 0, width, height]);
        svg.append('g').attr("fill", "#23967F").selectAll("rect").data(contents).join("rect").attr("x", (d, i) => x(i)).attr("y", d => y(d.number))
            .attr("height", d => y(0) - y(d.number)).attr("width", x.bandwidth());
        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
        

        return { __html: svg.node().outerHTML };
    }



    return (
        <div className="relative flex flex-col items-center justify-center">
            <div id={props.id} className="flex justify-center" dangerouslySetInnerHTML={createBars()} >

            </div>
            <div className="absolute left-4 top-0">
                <h4 className="font-semibold">{props.country}</h4>
            </div>
        </div>
    );

}