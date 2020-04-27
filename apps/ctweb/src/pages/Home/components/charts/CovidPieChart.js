import React from 'react';
import {ResponsiveContainer, PieChart, Pie, Tooltip, Cell} from 'recharts'


class CovidPieChart extends React.Component{

    render(){
        const { division, colors, data, pieWidth } = this.props
        
        return(
            <div>
                <ResponsiveContainer width="100%" height={pieWidth}>
                    <PieChart onMouseEnter={this.onPieEnter}>
                        <Pie
                        isAnimationActive={false}
                        data={data}
                        dataKey="value"
                        outerRadius={70} 
                        fill="#8884d8"
                        label={(entry) => entry.title}
                        >
                        {
                            DATA.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]}/>)
                        }
                        
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }
    
}


export default CovidPieChart