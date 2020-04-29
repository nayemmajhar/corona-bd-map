import React, { PureComponent } from 'react';
import { ResponsiveContainer, BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class CovidMixBarChart extends PureComponent{

    render(){
        const { data, color1, color2, yText, tolColor, text} = this.props

        return(
            <div>
                <ResponsiveContainer width="100%" height={280}>
					<BarChart
						data={data}
						margin={{ top: 5, right: 5, bottom: 30, left: 15 }}
					>
						<CartesianGrid stroke='#f1f1f1' strokeDasharray="3 3" />
						<XAxis
                            dataKey="daydate"
                            interval={0} tick={{ angle: -25 }}
                            textAnchor="end"
                            label={{ value: "Cases of last "+ data.length +" days", position: "centerBottom", dy: 35}} 
                        />
                        <YAxis label={{ value: yText, angle: -90,   dx: -25}} />
						<Tooltip />
						<Legend verticalAlign="top"/>
						<Bar barSize={20} fillOpacity='.8' dataKey="death" stackId="a" fill={color2} />
						<Bar barSize={20} fillOpacity='.8' dataKey="cured" stackId="a" fill={color1} />
					</BarChart>
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

export default CovidMixBarChart
