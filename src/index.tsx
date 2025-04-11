import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Configuration, DefaultApi } from './api';
import App from './App';
import { HistoryRouter } from './history-router';
import './index.scss';
import { configureStore } from './store';

const api = new DefaultApi(new Configuration({
    // middleware: [{ post: ({ response }) => new Promise(resolve => setTimeout(() => resolve(response), 500)) }]
}));

const { store, history, persistor } = configureStore({ api });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </HistoryRouter>
        </Provider>
    </StrictMode>
);
