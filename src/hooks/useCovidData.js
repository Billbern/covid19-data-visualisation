import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const COUNTRY_COORDS = {
    "Benin": { lat: 9.3077, long: 2.3158 },
    "Burkina Faso": { lat: 12.2383, long: -1.5616 },
    "Cape Verde": { lat: 16.0020, long: -24.0131 },
    "Gambia": { lat: 13.4432, long: -15.3101 },
    "Ghana": { lat: 7.9465, long: -1.0232 },
    "Guinea": { lat: 9.9456, long: -9.6966 },
    "Guinea-Bissau": { lat: 11.8371, long: -15.2396 },
    "Cote d'Ivoire": { lat: 7.5400, long: -5.5471 },
    "Liberia": { lat: 6.4281, long: -9.4295 },
    "Mali": { lat: 17.5707, long: -3.9962 },
    "Mauritania": { lat: 21.0079, long: -10.9408 },
    "Niger": { lat: 17.6078, long: 8.0817 },
    "Nigeria": { lat: 9.0820, long: 8.6753 },
    "Senegal": { lat: 14.4974, long: -14.4524 },
    "Sierra Leone": { lat: 8.4606, long: -11.7799 },
    "Togo": { lat: 8.6195, long: 0.8248 }
};

export const useCovidData = () => {
    const [data, setData] = useState({
        global: null,
        countries: [],
        historical: null,
        isLoading: true,
        error: null
    });

    useEffect(() => {
        let isMounted = true;
        const fetchAllData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}`);
                if (!isMounted) return;

                const rawCountries = response.data.total_cases;
                const mappedCountries = rawCountries.map(c => ({
                    country: c.Country,
                    cases: parseInt(c.Confirmed),
                    todayCases: 0,
                    deaths: parseInt(c.Deaths),
                    todayDeaths: 0,
                    recovered: parseInt(c.Recovered),
                    active: parseInt(c.Active),
                    critical: 0,
                    casesPerOneMillion: 0,
                    deathsPerOneMillion: 0,
                    tests: 0,
                    testsPerOneMillion: 0,
                    population: 0,
                    continent: 'Africa',
                    countryInfo: {
                        lat: COUNTRY_COORDS[c.Country]?.lat || 0,
                        long: COUNTRY_COORDS[c.Country]?.long || 0,
                    }
                }));

                const totals = mappedCountries.reduce((acc, curr) => ({
                    cases: acc.cases + curr.cases,
                    deaths: acc.deaths + curr.deaths,
                    recovered: acc.recovered + curr.recovered,
                    active: acc.active + curr.active,
                }), { cases: 0, deaths: 0, recovered: 0, active: 0 });

                if (isMounted) {
                    setData({
                        global: {
                            ...totals,
                            updated: Date.now(),
                            todayCases: 0,
                            todayDeaths: 0,
                            todayRecovered: 0,
                            critical: 0,
                            casesPerOneMillion: 0,
                            deathsPerOneMillion: 0,
                            tests: 0,
                            testsPerOneMillion: 0,
                            population: 0,
                            oneCasePerPeople: 0,
                            oneDeathPerPeople: 0,
                            oneTestPerPeople: 0,
                            activePerOneMillion: 0,
                            recoveredPerOneMillion: 0,
                            criticalPerOneMillion: 0,
                            affectedCountries: mappedCountries.length
                        },
                        countries: mappedCountries,
                        historical: null,
                        isLoading: false,
                        error: null
                    });
                }
            } catch (err) {
                console.error('Error fetching COVID data:', err);
                if (isMounted) {
                    setData(prev => ({
                        ...prev,
                        isLoading: false,
                        error: 'Failed to fetch dashboard data. Please ensure the local backend is running.'
                    }));
                }
            }
        };

        fetchAllData();
        return () => { isMounted = false; };
    }, []);

    return data;
};
