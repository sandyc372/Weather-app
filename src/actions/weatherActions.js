import axios from 'axios';
import {
    FETCH_CURRENT_WEATHER_REQUEST,
    FETCH_CURRENT_WEATHER_SUCCESS,
    FETCH_CURRENT_WEATHER_FAILURE
} from '../constants/actionTypes';
import api from '../constants/api';
import key from '../constants/key';

export function fetchCurrentWeatherRequest() {
    return {
        type: FETCH_CURRENT_WEATHER_REQUEST
    };
}

export function fetchCurrentWeatherSuccess(data) {
    return {
        type: FETCH_CURRENT_WEATHER_SUCCESS,
        payload: data
    };
}

export function fetchCurrentWeatherFailure() {
    return {
        type: FETCH_CURRENT_WEATHER_FAILURE
    };
}

export function fetchCurrentWeather(city) {
    return function (dispatch) {

        //Inform the store that the api call is starting
        dispatch(fetchCurrentWeatherRequest());

        //perform the request
        axios.get(`http://${api.currentWeather.url}`, {
            params: {
                'id': city.id,
                'APPID': key
            }
        }).then((response) => {
            //Inform the store that the api call has ended successfully amd pass the data
            dispatch(fetchCurrentWeatherSuccess({city: city, weatherData: response.data}))
        }, (err) => {
            console.log(err);
            //Inform the store that the api call has failed
            dispatch(fetchCurrentWeatherFailure())
        })
    }
}