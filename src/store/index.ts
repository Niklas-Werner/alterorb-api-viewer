import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { ExtraThunkArgument } from './actions';
import { dataReducer } from './data/reducers';
import { uiReducer } from './ui/reducers';

export const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    ui: uiReducer,
    data: dataReducer
});

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

declare module 'react-redux' {
    export interface DefaultRootState extends RootState {
    }
}

export function configureStore(extraThunkArgument: ExtraThunkArgument, preloadedState: Partial<RootState> = {}) {
    const history = createBrowserHistory();

    const logger = createLogger({});

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history),
                thunk.withExtraArgument(extraThunkArgument),
                logger // must be last middleware
            )
        )
    );

    return {
        store,
        history
    };
}
