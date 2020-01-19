import { ActionTypes, ThunkAction } from '../actions';
import { fetchPlayer } from '../data/actions';

export function selectGame(gameIdOrJagexName: number | string | undefined) {
    return {
        type: 'ui.selectGame',
        gameId: typeof gameIdOrJagexName === 'number' ? gameIdOrJagexName : undefined,
        jagexName: typeof gameIdOrJagexName === 'string' ? gameIdOrJagexName : undefined
    } as const;
}

export function selectPlayer(uuidOrName: string, type: 'uuid' | 'name'): ThunkAction {
    return async (dispatch, getState) => {
        const { ui: { selectedPlayerUuid } } = getState();
        const player = await dispatch(fetchPlayer(uuidOrName, type));
        if (selectedPlayerUuid !== player.uuid)
            dispatch(setSelectedPlayer(player.uuid!));
    };
}

export function setSelectedPlayer(uuid: string | undefined) {
    return {
        type: 'ui.setSelectedPlayer',
        uuid
    } as const;
}

export type UIAction = ActionTypes<[
    typeof selectGame,
    typeof setSelectedPlayer
]>;
