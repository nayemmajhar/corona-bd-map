import React, { PureComponent } from 'react';
import { ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class CovidLineChart extends PureComponent{

    render(){
        const { data, color1, color2, color3, yText} = this.props

        return(
            <div>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 5, bottom: 30, left: 15 }}
                      >
                        <CartesianGrid stroke='#f1f1f1' strokeDasharray="3 3" />
                        <XAxis
                            dataKey="daydate"
                            interval={0} tick={{ angle: -25 }}
                            textAnchor="end"
                            label={{ value: "Date of last "+ data.length +" days", position: "centerBottom", dy: 35}} 
                        />
                        <YAxis
                            label={{ value: yText, angle: -90,   dx: -35}}
                        />
                        <Tooltip />
                        <Legend verticalAlign="top"/>
                        <Line type="monotone" dataKey="infected" stroke={color1} />
                        <Line type="monotone" dataKey="recovered" stroke={color2} />
                        <Line type="monotone" dataKey="death" stroke={color3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
    
}

export default CovidLineChart
