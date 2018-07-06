import weatherReducer from './weatherReducer';
import forecastReducer from './forecastReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    weather: weatherReducer,
    forecast: forecastReducer
})

export default rootReducer;