import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard';
import MapView from './components/dashboard/MapView';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/map" element={<MapView />} />
                    {/* Placeholder routes for now */}
                    <Route path="/comparison" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">Comparison View Coming Soon</div>} />
                    <Route path="/distribution" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">Distribution View Coming Soon</div>} />
                    <Route path="/trends" element={<div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">Trends View Coming Soon</div>} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
