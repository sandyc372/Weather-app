import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

class LineChartComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <ResponsiveContainer width='100%' height={480}>
                <LineChart width={730} height={250} data={this.props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
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
                    <Legend verticalAlign="top"/>
                    <Line type="monotone" name={this.props.getVariableName(this.props.variable)} dataKey={this.props.variable} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

        )
    }
}

export default LineChartComponent