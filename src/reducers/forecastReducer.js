import {
    FETCH_FORECAST_REQUEST,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE
} from '../constants/actionTypes'
import { fromJS } from 'immutable';

export default function (state = {
    isFetching: false,
    city: {
        "id": 1277333,
        "name": "Bangalore",
        "country": "IN",
    },
    forecastData: null
}, action) {
    switch (action.type) {
        case FETCH_FORECAST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_FORECAST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                city: action.payload.city,
                forecastData: action.payload.forecastData
            };
        case FETCH_FORECAST_FAILURE:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;

    }
}