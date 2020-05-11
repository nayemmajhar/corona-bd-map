import React, { PureComponent } from 'react';
import { ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class CovidLineChart extends PureComponent{

    render(){
        const { data, color1, color2, yText} = this.props

        return(
            <div>
                <ResponsiveContainer width="100%" height={340}>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 10, bottom: 55, left: 15 }}
                      >
                        <CartesianGrid stroke='#f1f1f1' strokeDasharray="3 3" />
                        <XAxis
                            dataKey="daydate"
                            interval={0} tick={{ angle: -90 }}
                            textAnchor="end"
                            label={{ value: "Cases of last "+ data.length +" days", position: "centerBottom", dy: 50}} 
                        />
                        <YAxis
                            label={{ value: yText, angle: -90,   dx: -35}}
                        />
                        <Tooltip />
                        <Legend verticalAlign="top"/>
                        <Line type="monotone" dataKey="infected" stroke={color1} strokeWidth="2" />
                        <Line type="monotone" dataKey="solved" stroke={color2}  strokeWidth="2"  />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
    
}

export default CovidLineChart
