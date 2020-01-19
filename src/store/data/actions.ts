import { Achievement, Game, HighscoresOrbPoints, HighscoresModeEnum } from '../../api';
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

export type DataAction = ActionTypes<[
    typeof updateGames,
    typeof updateGameAchievements,
    typeof updateHighscores
]>;
