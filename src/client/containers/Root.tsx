import * as React from 'react';
import { Provider } from 'react-redux'
import App from './app';
import { configureStore } from '../store/configureStore';

let store = configureStore();

export class Root extends React.Component<any, any>{
    render() {
        return (
            <Provider store={store}>
                <App {...this.props}></App>
            </Provider>
        )
    }
}