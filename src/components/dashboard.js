import { useCovidData } from '../hooks/useCovidData';
import StatCards from './dashboard/StatCards';
import DistributionChart from './dashboard/DistributionChart';
import ComparisonChart from './dashboard/ComparisonChart';
import { AlertCircle, Loader2, TrendingUp, PieChart as PieIcon } from 'lucide-react';

const Dashboard = () => {
    const { global, countries, historical, isLoading, error } = useCovidData();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
                <p className="text-gray-500 font-medium">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl flex items-center gap-4 text-red-700">
                <AlertCircle className="w-6 h-6" />
                <div>
                    <h4 className="font-bold">Error</h4>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Global Overview</h2>
                <p className="text-gray-500">Real-time statistics and insights across the world.</p>
            </header>

            <StatCards globalData={global} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <PieIcon className="w-5 h-5 text-red-600" />
                        Status Distribution
                    </h3>
                    <DistributionChart data={global} />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        Top Impacted Countries
                    </h3>
                    <ComparisonChart countries={countries} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">World Data Table</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-4 px-4">Country</th>
                                <th className="pb-4 px-4 text-right">Confirmed</th>
                                <th className="pb-4 px-4 text-right">Active</th>
                                <th className="pb-4 px-4 text-right">Recovered</th>
                                <th className="pb-4 px-4 text-right">Deaths</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {countries.slice(0, 10).map((country) => (
                                <tr key={country.country} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 font-semibold text-gray-700">{country.country}</td>
                                    <td className="py-4 px-4 text-right font-medium">{country.cases.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-right text-amber-600">{country.active.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-right text-green-600">{country.recovered.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-right text-red-600">{country.deaths.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;