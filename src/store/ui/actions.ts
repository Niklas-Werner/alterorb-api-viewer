import { ActionTypes, ThunkAction } from '../actions';
import { fetchPlayer } from '../data/actions';
import { push } from 'connected-react-router';

export function selectGame(jagexName: string | undefined) {
    return { type: 'ui.selectGame', jagexName } as const;
}

export function selectPlayer(name: string | undefined) {
    return { type: 'ui.selectPlayer', name } as const;
}

export function updateSearchPlayerName(name: string) {
    return { type: 'ui.updateSearchPlayerName', name } as const;
}

export function searchPlayerStarted() {
    return { type: 'ui.searchPlayerStarted' } as const;
}

export function searchPlayerFinished() {
    return { type: 'ui.searchPlayerFinished' } as const;
}

export function searchPlayer(): ThunkAction {
    return async (dispatch, getState) => {
        const { ui: { searchPlayerName } } = getState();
        dispatch(searchPlayerStarted());
        await dispatch(fetchPlayer(searchPlayerName));
        dispatch(searchPlayerFinished());
        dispatch(push(`/players/${searchPlayerName}`));
    };
}

export type UIAction = ActionTypes<[
    typeof selectGame,
    typeof selectPlayer,
    typeof updateSearchPlayerName,
    typeof searchPlayerStarted,
    typeof searchPlayerFinished
]>;
