import { Achievement, Game, HighscoresOrbPoints, HighscoresModeEnum, Account } from '../../api';
import { ActionTypes, ThunkAction } from '../actions';

export function fetchGames(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const state = getState();
        if (state.data.games)
            return;
        const games = await api.listGames();
        dispatch(updateGames(games));
    };
}

export function updateGames(games: Game[]) {
    return {
        type: 'data.updateGames',
        games
    } as const;
}

export function fetchGameAchievements(gameId: number): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const state = getState();
        if (gameId in state.data.achievements)
            return;
        const achievements = await api.listGameAchievements(String(gameId));
        dispatch(updateGameAchievements(gameId, achievements));
    };
}

export function updateGameAchievements(gameId: number, achievements: Achievement[]) {
    return {
        type: 'data.updateGameAchievements',
        gameId,
        achievements
    } as const;
}

export function fetchHighscores(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const state = getState();
        if (state.data.highscores)
            return;
        const highscores = await api.highscores(HighscoresModeEnum.Orbpoints);
        dispatch(updateHighscores(highscores));
    };
}

export function updateHighscores(highscores: HighscoresOrbPoints[]) {
    return {
        type: 'data.updateHighscores',
        highscores
    } as const;
}

export function fetchPlayer(uuidOrName: string, type: 'uuid' | 'name', force = false): ThunkAction<Account> {
    return async (dispatch, getState, { api }) => {
        const { data: { players, playerNames } } = getState();
        let player;
        switch (type) {
            case 'uuid':
                player = players[uuidOrName];
                if (player !== undefined) {
                    if (!force && player.displayName! in playerNames)
                        return player;
                }
                if (player === undefined || force)
                    player = await api.accountDetail(uuidOrName);
                break;
            case 'name':
                const uuid = playerNames[uuidOrName];
                if (uuid !== undefined) {
                    const player = players[uuid];
                    if (!force && player)
                        return player;
                }
                player = await api.searchAccounts(uuidOrName);
                break;
        }
        dispatch(updatePlayer(player));
        return player;
    };
}

export function updatePlayer(player: Account) {
    return {
        type: 'data.updatePlayer',
        player
    } as const;
}

export type DataAction = ActionTypes<[
    typeof updateGames,
    typeof updateGameAchievements,
    typeof updateHighscores,
    typeof updatePlayer
]>;
