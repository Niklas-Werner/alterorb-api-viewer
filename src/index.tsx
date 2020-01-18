import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BASE_PATH, Configuration, DefaultApi } from './api';
import App from './components/App';
import './index.scss';
import { configureStore } from './store';

const api = new DefaultApi(new Configuration({
    basePath: 'https://cors-anywhere.herokuapp.com/' + BASE_PATH
}));

const { store } = configureStore({ api });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
