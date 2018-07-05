import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";


export default createStore(
    combineReducers({
        math,
        user
    }),
    {},
    applyMiddleware(logger(), thunk)
);