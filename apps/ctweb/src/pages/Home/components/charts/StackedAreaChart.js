import React, { PureComponent } from 'react';
import { ResponsiveContainer, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class StackedAreaChart extends PureComponent{

    render(){
        const { data, color1, color2, color3, yText, tColor, tText} = this.props
		
        return(
            <div>
                <ResponsiveContainer width="100%" height={280}>
					<LineChart
                        data={data}
                        margin={{ top: 5, right: 5, bottom: 30, left: 25 }}
                    >
                        <CartesianGrid stroke='#f1f1f1' strokeDasharray="3 3" />
                        <XAxis
                            dataKey="daydate"
                            interval={0} tick={{ angle: -25 }}
                            textAnchor="end"
                            label={{ value: "Date of last "+ data.length +" days", position: "insideBottomCenter", dy: 35}} 
                        />
                        <YAxis
                            label={{ value: yText, position: "insideLeftCenter", angle: -90,   dx: -35}}
                        />
                        <Tooltip />}/>
                        <Line fillOpacity='.7' stackId="1" dot={{ stroke: '#2F4B7C', strokeWidth: 2 }} type="monotone" dataKey="active" fill={color1} stroke={color1} />
						<Line fillOpacity='.7' stackId="1" dot={{ stroke: '#2F4B7C', strokeWidth: 2 }} type="monotone" dataKey="cured" fill={color2} stroke={color2} />
						<Line fillOpacity='.7' stackId="1" dot={{ stroke: '#2F4B7C', strokeWidth: 2 }} type="monotone" dataKey="death" fill={color3} stroke={color3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
    
}

class CustomTooltip extends PureComponent
{

	render() {
		const { active, tolColor, text } = this.props;

		if (active) {
			const { payload, label } = this.props;
			return (
				<div className="custom-tooltip">
				<p className="label" style={{color: tolColor }}>{`${payload[0].value} ${text}`}</p>
				</div>
			);
		}

		return null;
	}
}

export default StackedAreaChart
