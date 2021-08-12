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
                "Benin": [{ condition: "Active", number: 46 }, { condition: "Confirmed", number: 90 }, { condition: "Deaths", number: 2 }, { condition: "Recovered", number: 42 }],
                "Burkina Faso": [{ condition: "Active", number: 73 }, { condition: "Confirmed", number: 652 }, { condition: "Deaths", number: 44 }, { condition: "Recovered", number: 535 }],
                "Cote d'Ivoire": [{ condition: "Active", number: 725 }, { condition: "Confirmed", number: 1362 }, { condition: "Deaths", number: 15 }, { condition: "Recovered", number: 622 }],
                "Gambia": [{ condition: "Active", number: 7 }, { condition: "Confirmed", number: 17 }, { condition: "Deaths", number: 1 }, { condition: "Recovered", number: 9 }],
                "Ghana": [{ condition: "Active", number: 1922 }, { condition: "Confirmed", number: 2169 }, { condition: "Deaths", number: 18 }, { condition: "Recovered", number: 229 }],
                "Guinea": [{ condition: "Active", number: 1174 }, { condition: "Confirmed", number: 1586 }, { condition: "Deaths", number: 7 }, { condition: "Recovered", number: 405 }],
                "Guinea-Bissau": [{ condition: "Active", number: 0 }, { condition: "Confirmed", number: 257 }, { condition: "Deaths", number: 1 }, { condition: "Recovered", number: 19 }],
                "Liberia": [{ condition: "Active", number: 88 }, { condition: "Confirmed", number: 154 }, { condition: "Deaths", number: 18 }, { condition: "Recovered", number: 48 }],
                "Mali": [{ condition: "Active", number: 312 }, { condition: "Confirmed", number: 544 }, { condition: "Deaths", number: 26 }, { condition: "Recovered", number: 206 }],
                "Mauritania": [{ condition: "Active", number: 1 }, { condition: "Confirmed", number: 8 }, { condition: "Deaths", number: 1 }, { condition: "Recovered", number: 6 }],
                "Niger": [{ condition: "Active", number: 194 }, { condition: "Confirmed", number: 736 }, { condition: "Deaths", number: 35 }, { condition: "Recovered", number: 507 }],
                "Nigeria": [{ condition: "Active", number: 1952 }, { condition: "Confirmed", number: 2388 }, { condition: "Deaths", number: 85 }, { condition: "Recovered", number: 351 }],
                "Senegal": [{ condition: "Active", number: 738 }, { condition: "Confirmed", number: 1115 }, { condition: "Deaths", number: 9 }, { condition: "Recovered", number: 368 }],
                "Sierra Leone": [{ condition: "Active", number: 126 }, { condition: "Confirmed", number: 155 }, { condition: "Deaths", number: 8 }, { condition: "Recovered", number: 21 }],
                "Togo": [{ condition: "Active", number: 48 }, { condition: "Confirmed", number: 123 }, { condition: "Deaths", number: 9 }, { condition: "Recovered", number: 66 }],
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
                                        <BarCharts cases={ this.state.cases } />
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