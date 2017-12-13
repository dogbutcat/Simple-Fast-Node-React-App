import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import { rootReducer } from "../reducers/TweetReducer";
import { compose } from "redux";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (obj?: any) => any;
        __PRESTATE_DATA__: string;
    }
}

const composeEnhancer = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancer(
    applyMiddleware(reduxThunk)
)

export function configureStore(preState?) {
    return createStore(rootReducer, preState, enhancer);
}