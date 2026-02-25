import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, BarChart3, TrendingUp, Map as MapIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Sidebar = () => {
    const menuItems = [
        { title: 'Dashboard', link: '/', icon: LayoutDashboard },
        { title: 'Geography (GIS)', link: '/map', icon: MapIcon },
        { title: 'Comparison', link: '/comparison', icon: BarChart3 },
        { title: 'Distribution', link: '/distribution', icon: PieChart },
        { title: 'Trends', link: '/trends', icon: TrendingUp },
    ];

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex-1 py-6 px-4 space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.link}
                        to={item.link}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-red-50 text-red-700 shadow-sm ring-1 ring-red-100"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        <item.icon className={cn("w-4 h-4", "transition-colors")} />
                        {item.title}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="bg-red-900 rounded-xl p-4 text-white">
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Global Total</p>
                    <p className="text-lg font-bold">COVID-19 Reports</p>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-full bg-red-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-white w-2/3 h-full rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
