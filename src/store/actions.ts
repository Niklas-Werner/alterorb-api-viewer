import { RouterAction } from 'connected-react-router';
import { ThunkAction as ReduxThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk';
import { RootState } from '.';
import { DefaultApi } from '../api';
import { ConfigAction } from './config/actions';
import { DataAction } from './data/actions';
import { UIAction } from './ui/actions';

type __Indices<T> = Exclude<keyof T, keyof any[]>;
type __ActionTypes_Helper<T extends any[]> = {
    [P in __Indices<T>]: T[P] extends ((...args: any) => any) ? ReturnType<T[P]> : never;
};
export type ActionTypes<T extends any[]> = __ActionTypes_Helper<T>[keyof __ActionTypes_Helper<T>];

export type RootAction = RouterAction | UIAction | DataAction | ConfigAction;

export type ExtraThunkArgument = {
    api: DefaultApi;
};

export type ThunkAction<T = void> = ReduxThunkAction<T | Promise<T>, RootState, ExtraThunkArgument, RootAction>;

export type ThunkDispatch = ReduxThunkDispatch<RootState, ExtraThunkArgument, RootAction>;
