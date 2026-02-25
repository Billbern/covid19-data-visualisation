import React from 'react';
import { Users, ShieldCheck, Skull, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const StatCard = ({ title, value, color, icon: Icon, trend }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className={clsx("p-3 rounded-xl", color)}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <span className={clsx(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        trend > 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    )}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {value ? value.toLocaleString() : '---'}
                    </h3>
                </div>
            </div>
        </div>
    );
};

const StatCards = ({ globalData }) => {
    if (!globalData) return null;

    const stats = [
        {
            title: 'Confirmed Cases',
            value: globalData.cases,
            color: 'bg-blue-600',
            icon: Users,
            trend: 2.4
        },
        {
            title: 'Active Cases',
            value: globalData.active,
            color: 'bg-amber-500',
            icon: Activity,
            trend: -1.2
        },
        {
            title: 'Recovered',
            value: globalData.recovered,
            color: 'bg-green-600',
            icon: ShieldCheck,
            trend: 3.1
        },
        {
            title: 'Total Deaths',
            value: globalData.deaths,
            color: 'bg-red-600',
            icon: Skull,
            trend: 0.8
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
            ))}
        </div>
    );
};

export default StatCards;
