import { useEffect, DependencyList, useCallback } from 'react';
import { ThunkDispatch, RootAction, ThunkAction } from './store/actions';
import { useDispatch } from 'react-redux';

export type AsyncEffectCallback = () => Promise<void>;

export function useAsyncEffect(effect: AsyncEffectCallback, deps?: DependencyList) {
    useEffect(() => {
        effect();
    }, deps); // eslint-disable-line
}

export function useDispatchEffect(effect: (dispatch: ThunkDispatch) => void, deps?: DependencyList) {
    const dispatch = useDispatch<ThunkDispatch>();

    useEffect(
        () => void effect(dispatch),
        deps === undefined ? deps : deps.concat([dispatch]) // eslint-disable-line
    );
}

export function useActionCreatorEffect(actionCreator: () => RootAction | ThunkAction<any>, deps?: DependencyList) {
    useDispatchEffect(
        dispatch => dispatch(actionCreator() as any),
        deps
    );
}

export function useDispatchCallback<T extends any[]>(callback: (dispatch: ThunkDispatch, ...args: T) => void, deps: DependencyList) {
    const dispatch = useDispatch<ThunkDispatch>();

    return useCallback(
        (...args: T) => callback(dispatch, ...args),
        deps.concat([dispatch]) // eslint-disable-line
    );
}

export function useActionCreatorCallback<T extends any[]>(actionCreator: (...args: T) => RootAction | ThunkAction<any>) {
    const dispatch = useDispatch<ThunkDispatch>();

    return useCallback(
        (...args: T) => dispatch(actionCreator(...args) as any),
        [dispatch] // eslint-disable-line
    );
}
