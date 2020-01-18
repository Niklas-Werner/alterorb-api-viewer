import { ThunkAction, ActionTypes } from '../actions';
import { Game } from '../../api';
import { beginLoading, endLoading } from '../global/actions';

export function fetchGames(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        dispatch(beginLoading());
        try {
            const games = await api.listGames();
            dispatch(updateGames(games));
            dispatch(endLoading());
        }
        catch (e) {
            dispatch(endLoading(String(e)));
        }
    };
}

export function updateGames(games: Game[]) {
    return {
        type: 'games.updateGames',
        games
    } as const;
}

export type GamesAction = ActionTypes<[
    typeof updateGames
]>;
