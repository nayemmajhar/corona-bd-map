import React, { PureComponent } from 'react';
import { ResponsiveContainer, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class CovidAreaChart extends PureComponent{

    render(){
        const { data, color, tColor, yText, tText} = this.props
        
        return(
            <div>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                        data={data}
                        margin={{ top: 5, right: 5, bottom: 30, left: 0 }}
                    >
                        <CartesianGrid stroke='#f1f1f1' strokeDasharray="3 3" />
                        <XAxis
                            dataKey="daydate"
                            interval={0} tick={{ angle: -25 }}
                            textAnchor="end"
                            label={{ value: "Cases of last "+ data.length +" days", position: "centerBottom", dy: 35}} 
                        />
                        <YAxis
                            label={false}
                        />
                        <Tooltip content={<CustomTooltip text={tText} tolColor={tColor} />}/>
                        <Area fillOpacity='.7' dot={{ stroke: '#2F4B7C', strokeWidth: 2 }} type="monotone" dataKey="count" fill={color} stroke="#2F4B7C" />
                    </AreaChart>

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

export default CovidAreaChart
