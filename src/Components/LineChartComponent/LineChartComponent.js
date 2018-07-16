import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

class LineChartComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ResponsiveContainer width={700} height="80%">
                <LineChart width={730} height={250} data={this.props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dt_txt" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="main.temp" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default LineChartComponent