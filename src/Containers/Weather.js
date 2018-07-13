import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input } from 'antd';
import SunnyDay from '../Components/SunnyDay';
import ClearNight from '../Components/ClearNight';
import Windy from '../Components/Windy';
import Rainy from '../Components/Rainy';
import ThorFetchingWeather from '../Components/ThorFetchingWeather';
import weatherTypes from '../constants/weatherTypes';
import {
    fetchCurrentWeather
} from '../actions/weatherActions';

class Weather extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCurrentWeather(this.props.weather.city);
    }

    fetchWeatherByCityname(value) {
        this.props.fetchCurrentWeather(this.props.weather.city, {
            findBy: 'name',
            value: value
        });
    }

    range(rangeStart = 0, rangeEnd = 0, number = 0) {
        return number >= rangeStart && number <= rangeEnd;
    }

    renderWeather() {
        let weatherType = (this.props.weather.weatherData && this.props.weather.weatherData.weather[0].main) || null;
        if (this.props.weather.weatherData) {
            if (weatherType.match(new RegExp(`${weatherTypes.CLEAR}`, 'gi')))
                if (this.range(this.props.weather.weatherData.sys.sunrise, this.props.weather.weatherData.sys.sunset, Date.now()/1000))
                    return (<SunnyDay data={this.props.weather.weatherData} />)
                else return (<ClearNight data={this.props.weather.weatherData} />)
            else if (weatherType.match(new RegExp(`${weatherTypes.CLOUDY}`, 'gi')))
                return (<Rainy data={this.props.weather.weatherData} fill="#394256" />)
            else if (weatherType.match(new RegExp(`${weatherTypes.RAINY}`, 'gi')))
                return (<Rainy data={this.props.weather.weatherData} fill="#394256" />)
            else if (weatherType.match(new RegExp(`${weatherTypes.WINDY}`, 'gi')))
                return (<Windy data={this.props.weather.weatherData} />)
            else return (<SunnyDay data={this.props.weather.weatherData} />);
        }
        else return null;
    }

    render() {
        return (
            <React.Fragment>
                <Row style={{ position: 'fixed', padding: '1rem', opacity: '0.8' }} gutter={24}>
                    <Col span={8}>
                        <Input.Search style={{ width: '25vw' }} placeholder="Search city" onSearch={value => this.fetchWeatherByCityname(value)} enterButton />
                    </Col>
                </Row>
                {
                    this.renderWeather()
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentWeather: (city, options) => {
            dispatch(fetchCurrentWeather(city, options))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);