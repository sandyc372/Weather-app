import React, { Component } from 'react';
import { Row, Col, Input, Table } from 'antd';
import { connect } from 'react-redux';
import { fetchForecast } from '../actions/forecastActions';
import api from '../constants/api';
import ForecastGridComponent from '../Components/ForecastGridComponent';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: null,
            metadata: null,
            vizType: 'grid'
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
                                : null
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