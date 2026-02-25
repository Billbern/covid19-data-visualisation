import React from 'react';
import { Activity, ShieldCheck, Skull, Users } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2">
                <div className="bg-red-600 p-1.5 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    COVID-19 <span className="text-red-600">Analytics</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-600">Live Data</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
