import {
    FETCH_FORECAST_REQUEST,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE
} from '../constants/actionTypes';


export function fetchForecastRequest() {
    return {
        type: FETCH_FORECAST_REQUEST
    };
}

export function fetchForecastSuccess(data) {
    return {
        type: FETCH_FORECAST_SUCCESS,
        payload: data
    };
}

export function fetchForecastFailure() {
    return {
        type: FETCH_FORECAST_FAILURE
    };
}