import axios from "axios";


async function fetchData(date = '05-02-2020', setCases) {
    if (date === '') {
        date = '05-02-2020';
    }
    try {
        const { data, status } = await axios.get(`http://localhost:5000/api/v1/${date}`);
        if (status === 200) {
            let newData = {}
            data.total_cases.forEach(item => {
                Object.assign(newData, { [item.Country]: [{ condition: "Active", number: Number(item.Active) }, { condition: "Confirmed", number: Number(item.Confirmed) }, { condition: "Deaths", number: Number(item.Deaths) }, { condition: "Recovered", number: Number(item.Recovered) }] })
            })
            setCases({ cases: newData });
        }
    } catch (err) {
        console.error(err);
    }
}

export default fetchData;