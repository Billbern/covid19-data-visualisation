import { useState } from "react";
import { NavLink } from "react-router-dom";


export default function SideBar() {

    const [data] = useState([{title: 'Pie Charts', link: '/'}, {title: 'Bar Charts', link: '/barcharts'}, {title: 'Line Graphs', link: '/linegraphs'}, {title: 'Stacked Bar Charts', link: '/stackedbarcharts'}, {title: 'Scatter Plots', link: '/scatterplots'}, {title: 'Map Plot', link: '/mapplots'}])

    return (
        <div className="col-span-2 bg-gray-300">
            <ul className="w-full flex flex-col items-center">
                {
                    data.map((side, key) => {
                        return <li key={key} className="w-full text-gray-700">
                            <NavLink className="inline-block w-full text-lg font-semibold py-8" exact to={side.link} activeClassName="text-white bg-cust-four">
                                <div className="flex items-center justify-center">
                                    {side.title}
                                </div>
                            </NavLink>
                        </li>
                    })
                }
            </ul>
        </div>
    );

}