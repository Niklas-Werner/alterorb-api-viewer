import { createMigrate, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configReducer } from './reducers';

export const persistedConfigReducer = persistReducer({
    key: 'config',
    storage,
    version: 1,
    migrate: createMigrate({
        1: state => ({
            ...state!,
            ownName: ''
        })
    }, {
        debug: true // debug is automatically disabled in production mode
    })
}, configReducer);
