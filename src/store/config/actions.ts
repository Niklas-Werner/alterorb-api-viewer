import { ActionTypes, ThunkAction } from '../actions';
import { fetchPlayer } from '../data/actions';

export function setOwnName(name: string) {
    return { type: 'config.setOwnName', name } as const;
}

export function fetchOwnPlayerData(): ThunkAction {
    return (dispatch, getState) => {
        const { config: { ownName } } = getState();
        if (ownName)
            dispatch(fetchPlayer(ownName));
    };
}

export type ConfigAction = ActionTypes<[
    typeof setOwnName
]>;
