import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { ExtraThunkArgument } from './actions';
import { gamesReducer } from './games/reducers';
import { globalReducer } from './global/reducers';

export const rootReducer = combineReducers({
    global: globalReducer,
    games: gamesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
    export interface DefaultRootState extends RootState {
    }
}

export function configureStore(extraThunkArgument: ExtraThunkArgument, preloadedState: Partial<RootState> = {}) {
    const logger = createLogger({});

    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunk.withExtraArgument(extraThunkArgument),
                logger // must be last middleware
            )
        )
    );

    return { store };
}
