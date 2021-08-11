import * as d3 from 'd3';

export default function Pie(props) {


    function createChart() {
        const pallete = ['#DB93B0', '#F7BFB4', '#7DAF9C', '#23967F']
        let colors = d3.scaleOrdinal(pallete);
        let svg = d3.create('svg').attr("class", "h-72 w-72");
        let contents = props.data;
        let data = d3.pie().sort(null).value(function (d) { return d.number; })(contents);

        let segments = d3.arc().innerRadius(0).outerRadius(108).padAngle(0.05).padRadius(50);
        let sections = svg.append('g').attr("transform", "translate(144, 116)").selectAll("path").data(data);
        sections.enter().append("path").attr("d", segments).attr("fill", function (d) { return colors(d.data.number); });

        let legends = svg.append("g").attr("transform", "translate(186, 208)").selectAll(".legends").data(data);
        let legend = legends.enter().append("g").classed(".legends", true).attr("transform", function (d, i) { return `translate(0, ${(i + 1) * 16})`; });
        legend.append("rect").attr("width", 8).attr("height", 8).attr("fill", function (d) { return colors(d.data.number); })
        legend.append("text").text(function (d) { return d.data.condition; }).attr('x', 18).attr('y', 10)

        return {__html: svg.node().outerHTML};
    }



    return (
        <div className="relative flex flex-col items-center justify-center">
            <div id={props.id} className="flex justify-center" dangerouslySetInnerHTML={createChart()} >
                
            </div>
            <div className="absolute left-18 bottom-0">
                <h4 className="font-semibold">{props.country}</h4>
            </div>
        </div>
    );

}