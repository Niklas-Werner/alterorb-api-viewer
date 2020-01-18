import { useEffect, DependencyList } from 'react';
import { ThunkDispatch } from './store/actions';
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
        () => {
            effect(dispatch);
        },
        deps === undefined ? deps : deps.concat([dispatch]) // eslint-disable-line
    );
}
