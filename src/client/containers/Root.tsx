import * as React from 'react';
import { Provider } from 'react-redux'
import App from './app';
import { configureStore } from '../store/configureStore';

const preState = JSON.parse(decodeURIComponent(window.__PRESTATE_DATA__));

delete window.__PRESTATE_DATA__;

let store = configureStore(preState);

export class Root extends React.Component<any, any>{
    render() {
        return (
            <Provider store={store}>
                <App {...this.props}></App>
            </Provider>
        )
    }
}