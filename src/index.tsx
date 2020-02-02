import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Configuration, DefaultApi } from './api';
import App from './App';
import './index.scss';
import { configureStore } from './store';

const api = new DefaultApi(new Configuration({
    // middleware: [{ post: ({ response }) => new Promise(resolve => setTimeout(() => resolve(response), 500)) }]
}));

const { store, history, persistor } = configureStore({ api });

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
