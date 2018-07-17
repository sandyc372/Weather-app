import dataFetcher from '../utilities/dataFetcher';
import {
    FETCH_CURRENT_WEATHER_REQUEST,
    FETCH_CURRENT_WEATHER_SUCCESS,
    FETCH_CURRENT_WEATHER_FAILURE,
    SET_CITY
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

export function setCity(data) {
    return {
        type: SET_CITY,
        payload: data
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
export function fetchCurrentWeather(city, options) {
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
        dispatch(fetchCurrentWeatherRequest());

        console.log(parameters, options);
        //perform the request
        dataFetcher(`https://${api.currentWeather.url}`, parameters).then((data) => {

            //If data is an array, get the first element
            data = Array.isArray(data) ? data[0] : data;
            //Inform the store that the api call has ended successfully amd pass the data
            let newCity = {
                id: data.id,
                name: data.name,
                country: data.sys.country
            }
            dispatch(fetchCurrentWeatherSuccess({ city: newCity, weatherData: data }))
        }, (err) => {
            console.log(err);
            //Inform the store that the api call has failed
            dispatch(fetchCurrentWeatherFailure())
        })
    }
}