import dataFetcher from '../utilities/dataFetcher';
import {
    FETCH_FORECAST_REQUEST,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE
} from '../constants/actionTypes';
import api from '../constants/api';
import key from '../constants/key';

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


/**
 * 
 * @param {Object} city 
 * @param {Object} options 
 * options: {
 *  findBy: <String>,
 *  value: <String>
 * }
 */
export function fetchForecast(city, options) {
    return function (dispatch) {
        let parameters = {
            'units': 'metric',
            'APPID': key
        }
        if (options && typeof options === 'object')
            switch (options.findBy) {
                case 'name':
                    parameters.q = options.value;
                    break;

                case 'id':
                    parameters.id = city.id;
                    break;

                default:
                    parameters.id = city.id;
                    break;

            }
        else parameters.id = city.id;
        //Inform the store that the api call is starting
        dispatch(fetchForecastRequest());

        //perform the request
        dataFetcher(`http://${api.forecast.url}`, parameters).then((data) => {

            //If data is an array, get the first element
            data = Array.isArray(data) ? data[0] : data;
            //Inform the store that the api call has ended successfully amd pass the data
            let newCity = {
                id: data.city.id,
                name: data.city.name,
                country: data.city.country
            }
            dispatch(fetchForecastSuccess({ city: newCity, forecastData: data }))
        }, (err) => {
            console.log(err);
            //Inform the store that the api call has failed
            dispatch(fetchForecastFailure())
        })
    }
}