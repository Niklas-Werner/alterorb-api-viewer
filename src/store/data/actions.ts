import { Account, Achievement, Game, HighscoresModeEnum, HighscoresOrbPoints, PlayerAchievement } from '../../api';
import { ActionTypes, ThunkAction } from '../actions';

export function fetchGames(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const { data: { games: { fetching, data, error } } } = getState();
        if (fetching || data || error)
            return;
        dispatch(fetchGamesStarted());
        try {
            const games = await api.listGames();
            dispatch(fetchGamesSuccess(games));
        }
        catch (e) {
            dispatch(fetchGamesError(String(e)));
        }
    };
}

export function fetchGamesStarted() {
    return { type: 'data.fetchGamesStarted' } as const;
}

export function fetchGamesSuccess(games: Game[]) {
    return { type: 'data.fetchGamesSuccess', games } as const;
}

export function fetchGamesError(message: string) {
    return { type: 'data.fetchGamesError', message } as const;
}

export function fetchAchievements(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const { data: { achievements: { fetching, data, error } } } = getState();
        if (fetching || data || error)
            return;
        dispatch(fetchAchievementsStarted());
        try {
            const achievements = await api.listAchievements();
            dispatch(fetchAchievementsSuccess(achievements));
        }
        catch (e) {
            dispatch(fetchAchievementsError(String(e)));
        }
    };
}

export function fetchAchievementsStarted() {
    return { type: 'data.fetchAchievementsStarted' } as const;
}

export function fetchAchievementsSuccess(achievements: Achievement[]) {
    return { type: 'data.fetchAchievementsSuccess', achievements } as const;
}

export function fetchAchievementsError(message: string) {
    return { type: 'data.fetchAchievementsError', message } as const;
}

export function fetchHighscores(): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const { data: { highscores: { fetching, data, error } } } = getState();
        if (fetching || data || error)
            return;
        dispatch(fetchHighscoresStarted());
        try {
            const highscores = await api.highscores(HighscoresModeEnum.Orbpoints);
            dispatch(fetchHighscoresSuccess(highscores));
        }
        catch (e) {
            dispatch(fetchHighscoresError(String(e)));
        }
    };
}

export function fetchHighscoresStarted() {
    return { type: 'data.fetchHighscoresStarted' } as const;
}

export function fetchHighscoresSuccess(highscores: HighscoresOrbPoints[]) {
    return { type: 'data.fetchHighscoresSuccess', highscores } as const;
}

export function fetchHighscoresError(message: string) {
    return { type: 'data.fetchHighscoresError', message } as const;
}

export function fetchPlayer(name: string): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const { data: { players: { [name]: item } } } = getState();
        if (item?.fetching || item?.data || item?.error)
            return;
        dispatch(fetchPlayerStarted(name));
        try {
            const player = await api.searchAccounts(String(name));
            dispatch(fetchPlayerSuccess(name, player));
        }
        catch (e) {
            dispatch(fetchPlayerError(name, String(e)));
        }
    };
}

export function fetchPlayerStarted(name: string) {
    return { type: 'data.fetchPlayerStarted', name } as const;
}

export function fetchPlayerSuccess(name: string, player: Account) {
    return { type: 'data.fetchPlayerSuccess', name, player } as const;
}

export function fetchPlayerError(name: string, message: string) {
    return { type: 'data.fetchPlayerError', name, message } as const;
}

export function fetchPlayerAchievements(playerUuid: string): ThunkAction {
    return async (dispatch, getState, { api }) => {
        const { data: { playerAchievements: { [playerUuid]: item } } } = getState();
        if (item?.fetching || item?.data || item?.error)
            return;
        dispatch(fetchPlayerAchievementsStarted(playerUuid));
        try {
            const achievements = await api.accountAchievements(playerUuid);
            dispatch(fetchPlayerAchievementsSuccess(playerUuid, achievements));
        }
        catch (e) {
            dispatch(fetchPlayerAchievementsError(playerUuid, String(e)));
        }
    };
}

export function fetchPlayerAchievementsStarted(playerUuid: string) {
    return { type: 'data.fetchPlayerAchievementsStarted', playerUuid } as const;
}

export function fetchPlayerAchievementsSuccess(playerUuid: string, achievements: PlayerAchievement[]) {
    return { type: 'data.fetchPlayerAchievementsSuccess', playerUuid, achievements } as const;
}

export function fetchPlayerAchievementsError(playerUuid: string, message: string) {
    return { type: 'data.fetchPlayerAchievementsError', playerUuid, message } as const;
}

export type DataAction = ActionTypes<[
    typeof fetchGamesStarted,
    typeof fetchGamesSuccess,
    typeof fetchGamesError,

    typeof fetchAchievementsStarted,
    typeof fetchAchievementsSuccess,
    typeof fetchAchievementsError,

    typeof fetchHighscoresStarted,
    typeof fetchHighscoresSuccess,
    typeof fetchHighscoresError,

    typeof fetchPlayerStarted,
    typeof fetchPlayerSuccess,
    typeof fetchPlayerError,

    typeof fetchPlayerAchievementsStarted,
    typeof fetchPlayerAchievementsSuccess,
    typeof fetchPlayerAchievementsError
]>;
