import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, legacy_createStore, Reducer } from 'redux';
import { createReduxHistoryContext, RouterState } from 'redux-first-history';
import { persistStore } from 'redux-persist';
import { withExtraArgument } from 'redux-thunk';
import { ExtraThunkArgument } from './actions';
import { persistedConfigReducer } from './config/persist';
import { dataReducer } from './data/reducers';
import { uiReducer } from './ui/reducers';

export const createRootReducer = (routerReducer: Reducer<RouterState>) => combineReducers({
    router: routerReducer,
    ui: uiReducer,
    data: dataReducer,
    config: persistedConfigReducer
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

declare module 'react-redux' {
    export interface DefaultRootState extends RootState {
    }
}

export function configureStore(extraThunkArgument: ExtraThunkArgument) {
    const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
        history: createBrowserHistory()
    });

    const middleware = [
        routerMiddleware,
        withExtraArgument(extraThunkArgument),
    ];

    const store = legacy_createStore(
        createRootReducer(routerReducer),
        undefined,
        compose(
            applyMiddleware(...middleware)
        )
    );

    const history = createReduxHistory(store);

    const persistor = persistStore(store);

    return {
        store,
        history,
        persistor
    };
}
