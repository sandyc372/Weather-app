import React, { Component } from 'react';
import { Row, Col, Input, Table } from 'antd';
import { connect } from 'react-redux';
import { fetchForecast } from '../actions/forecastActions';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: null,
            metadata: null,
            vizType: 'grid'
        };
        this.gridColumns = [{
            title: 'Day',
            dataIndex: 'dt_txt',
            key: 'day',
            width: 150,
            render: (value, row, index) => {
                console.log(index);
                let dt_array = value.split(' ');
                const obj = {
                    children: this.getDate(dt_array[0]),
                    props: {},
                };
                this.state.metadata && this.state.metadata[dt_array[0]] && this.state.metadata[dt_array[0]][0] === dt_array[1] ?
                    obj.props.rowSpan = this.state.metadata[dt_array[0]].length :
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
                    children: this.getTime(value.split(' ')[1]),
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
        },]
    }

    componentDidMount() {
        this.props.fetchForecast(this.props.forecast.city)
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.forecast && nextProps.forecast.forecastData,
            newForecastData = [],
            newMetadata = {}

        if (data && data.cnt > 0 && Array.isArray(data.list)) {
            newForecastData = data.list;
            newForecastData.forEach((el, index) => {
                let dt_array = el.dt_txt.split(' ');
                newMetadata[dt_array[0]] ?
                    newMetadata[dt_array[0]].push(dt_array[1]) :
                    newMetadata[dt_array[0]] = [dt_array[1]]
            })
        }

        this.setState(() => ({
            ...this.state,
            forecastData: newForecastData,
            metadata: newMetadata
        }))

    }

    componentDidUpdate() {
        console.log(this.state.forecastData);
    }

    fetchForecastByCityname(value) {
        this.props.fetchForecast(this.props.forecast.city, {
            findBy: 'name',
            value: value
        });
    }

    getProperty(nestedObj, path) {
        return path.split('.').reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    }

    getDate(str) {
        return new Date(str).toDateString();
    }

    getTime(str) {
        let timearr = str.split(':');
        let timeOfDay = +timearr[0] >= 12 ? 'P.M.' : 'A.M.';
        let hours = +timearr[0] % 12 || +timearr[0]
        return `${hours}:${timearr[1]} ${timeOfDay}`
    }

    renderGrid() {
        return (
            <Table dataSource={this.state.forecastData}
                columns={this.gridColumns}
                rowKey={(record => record.dt_txt)}
                pagination={false}
                loading={this.props.forecast.isFetching}
                scroll={{y: 450}}
                bordered size={'small'} />
        )
    }

    render() {
        return (
            <React.Fragment>
                <Row style={{ padding: '1rem' }} gutter={24}>
                    <Col span={7}>
                        <Input.Search style={{ width: '100%' }} placeholder="Search city" onSearch={value => this.fetchForecastByCityname(value)} enterButton />
                    </Col>
                </Row>

                <Row style={{ padding: '1rem' }}>
                    <Col span={24}>
                        {
                            this.renderGrid()
                        }
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forecast: state.forecast
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchForecast: (city, options) => {
            dispatch(fetchForecast(city, options))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);