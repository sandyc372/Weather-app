import React, { Component } from 'react';
import { Table } from 'antd';

class ForecastGridComponent extends Component {

    constructor(props) {
        super(props);
        this.gridColumns = [{
            title: 'Day',
            dataIndex: 'dt_txt',
            key: 'day',
            width: 150,
            render: (value, row, index) => {
                let dt_array = value.split(' ');
                const obj = {
                    children: this.props.getDate(dt_array[0]),
                    props: {},
                };
                this.props.metadata && this.props.metadata[dt_array[0]] && this.props.metadata[dt_array[0]][0] === dt_array[1] ?
                    obj.props.rowSpan = this.props.metadata[dt_array[0]].length :
                    obj.props.rowSpan = 0;
                return obj;
            }
        }, {
            title: 'Time',
            dataIndex: 'dt_txt',
            key: 'time',
            width: 150,
            render: (value, row, index) => {
                const obj = {
                    children: this.props.getTime(value.split(' ')[1]),
                    props: {},
                };
                return obj;
            }
        }, {
            title: 'Temperature (\u2103)',
            dataIndex: 'temperature',
            key: 'temperature',
            children: [{
                title: 'Temp',
                dataIndex: 'main.temp',
                key: 'temp',
                width: 150
            }, {
                title: 'Min Temp',
                dataIndex: 'main.temp_min',
                key: 'min temp',
                width: 150
            }, {
                title: 'Max Temp',
                dataIndex: 'main.temp_max',
                key: 'max temp',
                width: 150
            }]
        }, {
            title: 'Pressure (hPa)',
            dataIndex: 'pressure',
            key: 'pressure',
            children: [{
                title: 'Pressure',
                dataIndex: 'main.pressure',
                key: 'pressure',
                width: 150
            }, {
                title: 'Sea lvl',
                dataIndex: 'main.sea_level',
                key: 'sea lvl',
                width: 150
            }, {
                title: 'Grnd lvl',
                dataIndex: 'main.grnd_level',
                key: 'grnd lvl',
                width: 150
            }]
        }, {
            title: 'Humidity (%)',
            dataIndex: 'main.humidity',
            key: 'humidity',
            width: 150
        }, {
            title: 'Rain (mm)',
            dataIndex: 'rain.3h',
            key: 'rain',
            width: 150,
            render: (value, row, index) => {
                let num = Number.parseFloat(value);
                const obj = {
                    children: isNaN(num) ? null : num.toFixed(3),
                    props: {},
                };
                return obj;
            }
        }]
    }

    render() {
        return (
            <Table dataSource={this.props.forecastData}
                columns={this.gridColumns}
                rowKey={(record => record.dt_txt)}
                pagination={false}
                loading={this.props.loading}
                scroll={{ y: 400 }}
                bordered size={'small'} />
        )
    }
}

export default ForecastGridComponent;