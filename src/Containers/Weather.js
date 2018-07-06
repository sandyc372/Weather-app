import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import {
    fetchCurrentWeather
} from '../actions/weatherActions';

class Weather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col span={24}>Current Weather</Col>
                <Col span={24}>
                    <Button onClick={() => this.props.fetchCurrentWeather(this.props.weather.city)}>Fetch weather data</Button>
                </Col>
                <Col span={24}>{JSON.stringify(this.props.weather)}</Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentWeather: (city) => {
            dispatch(fetchCurrentWeather(city))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);