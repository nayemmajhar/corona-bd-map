import React from 'react';
import {ResponsiveContainer, PieChart, Pie, Tooltip, Cell} from 'recharts'

const COLORS = ['#003f5c',
                '#2f4b7c',
                '#665191',
                '#a05195',
                '#d45087',
                '#f95d6a',
                '#ff7c43',
                '#ffa600'];

class DivHomeChart extends React.Component{

    render(){
        const { division } = this.props

        const DATA = Object.keys(division).map((key) =>{
            return{
                name: division[key].title,
                value: division[key].infected
            }
        })

        return(
            <div>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart onMouseEnter={this.onPieEnter}>
                        <Pie
                        isAnimationActive={false}
                        data={DATA}
                        outerRadius={70} 
                        fill="#8884d8"
                        label={(entry) => entry.name}
                        >
                        {
                            DATA.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                        
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
                
            </div>
        )
    }
    
}


export default DivHomeChart