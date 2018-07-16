import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

class LineChartComponent extends Component {
    constructor(props) {
        super(props);
        this.data = [{ a: 1 }, { a: 2 }, { a: 1 }]
    }

    render() {
        return (
            <ResponsiveContainer width='100%' height={480}>
                <LineChart width={730} height={250} data={this.props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dt_txt" tickFormatter={this.props.getDate} interval={'preserveStartEnd'}/>
                    <YAxis />
                    <Tooltip labelFormatter={(value) => `${this.props.getDate(value.split(' ')[0])}, ${this.props.getTime(value.split(' ')[1])}` }
                        formatter={(value) => `${value} \u2103`}
                    />
                    <Legend />
                    <Line type="monotone" name="Temperature" dataKey="main.temp" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

        )
    }
}

export default LineChartComponent