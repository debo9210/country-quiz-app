import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {CountryReducer} from './reducers/CountriesReducers';

const reducers = combineReducers({
    countries: CountryReducer,
});
const initialState = {};

const middleware = [thunk];

const devTools = 
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(...middleware)
        : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(
    reducers,
    initialState,
    devTools
);

export default store;