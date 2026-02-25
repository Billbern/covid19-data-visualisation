import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { useCovidData } from '../../hooks/useCovidData';
import { Loader2, Info, Layers as LayersIcon } from 'lucide-react';

const MapView = () => {
    const mapElement = useRef();
    const mapRef = useRef();
    const vectorSourceRef = useRef(new VectorSource());

    const { countries, isLoading } = useCovidData();

    useEffect(() => {
        if (mapRef.current) return;

        const vectorLayer = new VectorLayer({
            source: vectorSourceRef.current,
            style: (feature) => {
                const cases = feature.get('cases');
                const radius = Math.sqrt(cases) / 100 + 5;
                return new Style({
                    image: new CircleStyle({
                        radius: Math.min(radius, 50),
                        fill: new Fill({ color: 'rgba(220, 38, 38, 0.4)' }),
                        stroke: new Stroke({ color: '#b91c1c', width: 2 }),
                    }),
                });
            }
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({ source: new OSM() }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([0, 20]),
                zoom: 2,
            }),
        });

        mapRef.current = initialMap;

        return () => {
            if (mapRef.current) {
                mapRef.current.setTarget(null);
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!countries.length || !vectorSourceRef.current) return;

        vectorSourceRef.current.clear();

        countries.forEach(country => {
            if (country.countryInfo && country.countryInfo.lat && country.countryInfo.long) {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([country.countryInfo.long, country.countryInfo.lat])),
                    name: country.country,
                    cases: country.cases,
                    deaths: country.deaths,
                    recovered: country.recovered
                });
                vectorSourceRef.current.addFeature(feature);
            }
        });

        // Fit view to features if needed
        if (vectorSourceRef.current.getFeatures().length > 0) {
            mapRef.current?.getView().fit(vectorSourceRef.current.getExtent(), {
                padding: [50, 50, 50, 50],
                maxZoom: 5
            });
        }
    }, [countries]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
                <p className="text-gray-500 font-medium">Loading Map Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <header>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <LayersIcon className="w-6 h-6 text-red-600" />
                    Global GIS Visualisation
                </h2>
                <p className="text-gray-500">Interactive map showing COVID-19 distribution by country size relative to cases.</p>
            </header>

            <div className="relative bg-white p-2 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div ref={mapElement} className="h-[600px] w-full rounded-2xl overflow-hidden" />

                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 max-w-xs transition-all hover:scale-105">
                    <div className="flex items-center gap-2 text-red-700 mb-2">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Map Legend</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Circle size is proportional to the total number of confirmed cases. Red areas indicate high prevalence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapView;
