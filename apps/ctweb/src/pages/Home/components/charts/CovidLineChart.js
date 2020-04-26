import React, { PureComponent } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class CovidLineChart extends PureComponent{

    render(){
        const { data, color1, color2, yText, tolColor, text} = this.props

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
                            label={{ value: "Date of last "+ data.length +" days", position: "insideBottomCenter", dy: 35}} 
                        />
                        <YAxis
                            label={{ value: yText, position: "insideLeftCenter", angle: -90,   dx: -25}}
                        />
						<Tooltip />
						<Line type="monotone" dataKey="cured" stroke={color1} />
						<Line type="monotone" dataKey="death" stroke={color2} />
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

export default CovidLineChart
