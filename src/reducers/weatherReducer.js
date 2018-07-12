import {
    FETCH_CURRENT_WEATHER_REQUEST,
    FETCH_CURRENT_WEATHER_SUCCESS,
    FETCH_CURRENT_WEATHER_FAILURE,
    SET_CITY
} from '../constants/actionTypes';
import { fromJS } from 'immutable';

export default function (state = {
    isFetching: false,
    city: {
        "id": 1277333,
        "name": "Bangalore",
        "country": "IN"
    },
    weatherData: null
}, action) {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state,
                city: action.payload
            }
        case FETCH_CURRENT_WEATHER_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                city: action.payload.city,
                weatherData: action.payload.weatherData
            };
        case FETCH_CURRENT_WEATHER_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;

    }
}