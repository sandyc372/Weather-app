import React, { Component } from 'react';
import { Row, Col, Input } from 'antd';
import { connect } from 'react-redux';
import { fetchForecast } from '../actions/forecastActions';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: null
        };
    }

    componentDidMount() {
        this.props.fetchForecast(this.props.forecast.city)
    }

    componentWillReceiveProps(nextProps) {
        let data = nextProps.forecast && nextProps.forecast.forecastData;
        if (data && data.cnt > 0 && Array.isArray(data.list)) {
            let newForecastData = {};
            data.list.forEach((el) => {
                let dtTime = el.dt_txt.split(' ');
                newForecastData[dtTime[0]] ? 
                    newForecastData[dtTime[0]][dtTime[1]] = el : 
                    newForecastData[dtTime[0]] = {
                        [dtTime[1]]: el
                    }
            });
            this.setState(() => ({
                ...this.state,
                forecastData: newForecastData
            }))
        }

    }

    componentDidUpdate(){
        console.log(this.state.forecastData);
    }

    fetchForecastByCityname(value) {
        this.props.fetchForecast(this.props.forecast.city, {
            findBy: 'name',
            value: value
        });
    }

    render() {
        return (
            <Row style={{ padding: '1rem' }} gutter={24}>
                <Col span={7}>
                    <Input.Search style={{ width: '100%' }} placeholder="Search city" onSearch={value => this.fetchForecastByCityname(value)} enterButton />
                </Col>
            </Row>
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