import { ActionTypes } from '../actions';

export function setOwnName(name: string) {
    return { type: 'config.setOwnName', name } as const;
}

export type ConfigAction = ActionTypes<[
    typeof setOwnName
]>;
