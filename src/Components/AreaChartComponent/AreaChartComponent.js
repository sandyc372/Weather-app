import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area  } from 'recharts';

class AreaChartComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ResponsiveContainer width='100%' height={480}>
                <AreaChart width={730} height={250} data={this.props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                    <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dt_txt"
                        tickFormatter={this.props.getDate}
                        interval={'preserveStartEnd'}
                        label={{ value: "Day", position: 'insideBottomRight', offset: -10 }}
                        angle={-10}
                        dy={10}
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => `${this.props.getDate(value.split(' ')[0])}, ${this.props.getTime(value.split(' ')[1])}`}
                        formatter={(value) => `${value} ${this.props.getUnit(this.props.variable)}`}
                    />
                    <Legend verticalAlign="top" />
                    <Area type="monotone" 
                        name={this.props.getVariableName(this.props.variable)} 
                        dataKey={this.props.variable} 
                        stroke="#8884d8" 
                        fillOpacity={1} fill="url(#gradient1)"
                        />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}

export default AreaChartComponent;