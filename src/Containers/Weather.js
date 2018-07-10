import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import SunnyDay from '../Components/SunnyDay';
import ClearNight from '../Components/ClearNight';
import Windy from '../Components/Windy';
import {
    fetchCurrentWeather
} from '../Actions/weatherActions';

class Weather extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchCurrentWeather(this.props.weather.city);
    }

    render() {
        return (
            this.props.weather.weatherData ? (
                <ClearNight data={this.props.weather.weatherData}/>
            ) : null
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