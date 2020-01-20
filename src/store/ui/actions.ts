import { ActionTypes } from '../actions';

export function selectGame(gameIdOrJagexName: number | string | undefined) {
    return {
        type: 'ui.selectGame',
        gameId: typeof gameIdOrJagexName === 'number' ? gameIdOrJagexName : undefined,
        jagexName: typeof gameIdOrJagexName === 'string' ? gameIdOrJagexName : undefined
    } as const;
}

export function selectPlayer(name: string | undefined) {
    return {
        type: 'ui.selectPlayer',
        name
    } as const;
}

export type UIAction = ActionTypes<[
    typeof selectGame,
    typeof selectPlayer
]>;
