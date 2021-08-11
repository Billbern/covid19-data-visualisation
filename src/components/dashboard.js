import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import moment from 'moment';
import fetchData from "../utils/datafetcher";
import Header from "./header";
import SideBar from "./sidebar";
import MapPlots from "./mapplot";
import PieChart from "./piechart";
import BarCharts from "./barcharts";
import LineGraphs from "./linegraphs";
import ScatterPlots from "./scatterplots";
import StackedBarCharts from "./stackedbar";

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            cases: {
                "Benin": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Burkina Faso": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Cote d'Ivoire": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Gambia": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Ghana": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Guinea": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Guinea-Bissau": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Liberia": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Mali": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Mauritania": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Niger": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Nigeria": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Senegal": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Sierra Leone": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
                "Togo": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 0 }, { condition: "Deaths", number: 0 }, { condition: "Recovered", number: 0 }],
            }
        }
    }

    componentDidMount() {
        fetchData('', this.setState.bind(this));
    }

    handleChange(e){
        e.preventDefault();
        const searchDate = `${e.target.value.split('-')[1]}-${e.target.value.split('-')[2]}-${e.target.value.split('-')[0]}`;
        fetchData(searchDate, this.setState.bind(this));
    }

    render() {
        return (
            <Router>
                <div className="w-full h-full">
                    <Header />
                    <div className="h-sm">
                        <div className="h-full grid grid-cols-12">
                            <SideBar />
                            <div className="col-span-10 overflow-auto">
                                <div className=" flex items-center justify-center text-2xl font-semibold py-4">
                                    <h1 className="mr-2">
                                        <label htmlFor="date">Covid 19 Cases On</label>
                                    </h1>
                                    <input className="w-52" type="date" name="case" id="date" min={moment('2020/05/02').format('YYYY-MM-DD')} defaultValue={moment('2020/05/02').format('YYYY-MM-DD')} onChange={(e)=>{this.handleChange(e)}}/>
                                </div>
                                <Switch>
                                    <Route path="/barcharts">
                                        <BarCharts />
                                    </Route>
                                    <Route path="/linegraphs">
                                        <LineGraphs />
                                    </Route>
                                    <Route path="/stackedbarcharts">
                                        <StackedBarCharts />
                                    </Route>
                                    <Route path="/scatterplots">
                                        <ScatterPlots />
                                    </Route>
                                    <Route path="/mapplots">
                                        <MapPlots />
                                    </Route>
                                    <Route path="/">
                                        <PieChart cases={ this.state.cases }/>
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}