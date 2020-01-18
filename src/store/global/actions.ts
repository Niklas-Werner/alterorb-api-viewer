import { ActionTypes } from '../actions';

export function beginLoading() {
    return {
        type: 'global.beginLoading'
    } as const;
}

export function endLoading(error?: string) {
    return {
        type: 'global.endLoading',
        error
    } as const;
}

export type GlobalAction = ActionTypes<[
    typeof beginLoading,
    typeof endLoading
]>;
