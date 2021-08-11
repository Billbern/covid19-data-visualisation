import Pie from './pie';

export default function PieChart(props) {

    return (
        <div className="grid grid-cols-4 grid-rows-4 gap-y-8 py-4">
            {
                Object.keys(props.cases).map(item => {
                    return <Pie key={item} id={item.replace("'", '').replace(/\s/g, '')} country={item} data={props.cases[item]} />
                })
            }
        </div>
    );

}