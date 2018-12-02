import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';

import userReducer from '../reducers/userReducer';
import showingsReducer from '../reducers/showingsReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            showings: showingsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}