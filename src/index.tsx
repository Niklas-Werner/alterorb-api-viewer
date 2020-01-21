import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DefaultApi, Configuration } from './api';
import App from './App';
import './index.scss';
import { configureStore } from './store';

const api = new DefaultApi(new Configuration({
    // middleware: [{ post: ({ response }) => new Promise(resolve => setTimeout(() => resolve(response), 500)) }]
}));

const { store, history } = configureStore({ api });

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
