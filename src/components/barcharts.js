import { Component } from "react";
import Bar from "./bar";


export default class BarCharts extends Component{
    render(){
        return (
            <div className="grid grid-cols-4 grid-rows-4 gap-y-8 py-4">
            {
                Object.keys(this.props.cases).map(item => {
                    return <Bar key={item} id={item.replace("'", '').replace(/\s/g, '')} country={item} data={this.props.cases[item]} />
                })
            }
        </div>
        )
    }
}
