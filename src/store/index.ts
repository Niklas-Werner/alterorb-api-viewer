import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { ExtraThunkArgument } from './actions';
import { persistedConfigReducer } from './config/persist';
import { dataReducer } from './data/reducers';
import { uiReducer } from './ui/reducers';

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    data: dataReducer,
    config: persistedConfigReducer
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

declare module 'react-redux' {
    export interface DefaultRootState extends RootState {
    }
}

export function configureStore(extraThunkArgument: ExtraThunkArgument, preloadedState: Partial<RootState> = {}) {
    const history = createBrowserHistory();

    const logger = createLogger();

    const middleware = [
        routerMiddleware(history),
        thunk.withExtraArgument(extraThunkArgument),
    ];
    if (process.env.NODE_ENV !== 'production')
        middleware.push(logger); // must be last middleware

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(...middleware)
        )
    );

    const persistor = persistStore(store);

    return {
        store,
        history,
        persistor
    };
}
