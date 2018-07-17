import React, { Component } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { connect } from 'react-redux';
import { fetchForecast } from '../actions/forecastActions';
import api from '../constants/api';
import ForecastGridComponent from '../Components/ForecastGridComponent';
import ChartComponent from '../Components/ChartComponent';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: null,
            metadata: null,
            vizType: 'grid',
            variable: 'main.temp'
        };
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
                            this.state.vizType === 'grid' ?
                                <ForecastGridComponent
                                    forecastData={this.state.forecastData}
                                    metadata={this.state.metadata}
                                    getDate={this.getDate}
                                    getTime={this.getTime}
                                    loading={this.props.forecast.isFetching}
                                />
                                : this.state.vizType.endsWith('chart') ?
                                    <ChartComponent forecastData={this.state.forecastData}
                                        metadata={this.state.metadata}
                                        getDate={this.getDate}
                                        getTime={this.getTime}
                                        loading={this.props.forecast.isFetching}
                                        type={this.state.vizType}
                                        variable={this.state.variable}
                                    />
                                    : null
                        }
                    </Col>
                </Row>
                <Row style={{ padding: '0.5rem 1rem' }} gutter={24}>
                    <Col span={1} offset={7}>
                        Type
                    </Col>
                    <Col span={3}>
                        <Select defaultValue="grid" style={{ width: '100%' }} onChange={(value) => this.setState(() => ({
                            ...this.state,
                            vizType: value
                        }))}
                        size="small"
                        >
                            <Select.Option value="grid">Grid</Select.Option>
                            <Select.Option value="line-chart">Line chart</Select.Option>
                            <Select.Option value="area-chart">Area chart</Select.Option>
                        </Select>
                    </Col>

                    <Col span={2}>
                        Variable
                    </Col>
                    <Col span={3}>
                        <Select defaultValue="main.temp" style={{ width: '100%' }} onChange={(value) => this.setState(() => ({
                            ...this.state,
                            variable: value
                        }))}
                        size="small"
                        >
                            <Select.Option value="main.temp">Temperature</Select.Option>
                            <Select.Option value="main.pressure">Pressure</Select.Option>
                            <Select.Option value="rain.3h">Rain</Select.Option>
                            <Select.Option value="main.humidity">Humidity</Select.Option>
                        </Select>
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