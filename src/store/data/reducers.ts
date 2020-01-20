import { RootAction } from '../actions';
import { Game, Achievement, HighscoresOrbPoints, Account, PlayerAchievement } from '../../api';

type StateDataEntry<T> = {
    fetching: boolean;
    error: string | null;
    data: T | null;
};

const initialStateDataEntry: StateDataEntry<any> = {
    fetching: false,
    error: null,
    data: null
};

type DataState = {
    games: StateDataEntry<Record<number, Game>>;
    achievements: Record<number, StateDataEntry<Achievement[]> | undefined>;
    highscores: StateDataEntry<HighscoresOrbPoints[]>;
    players: Record<string, StateDataEntry<Account> | undefined>;
    playerAchievements: Record<string, StateDataEntry<PlayerAchievement[]> | undefined>;
};

const initialState: DataState = {
    games: initialStateDataEntry,
    achievements: {},
    highscores: initialStateDataEntry,
    players: {},
    playerAchievements: {}
};

export function dataReducer(state = initialState, action: RootAction): DataState {
    switch (action.type) {
        case 'data.fetchGamesStarted':
            return {
                ...state,
                games: {
                    fetching: true,
                    error: null,
                    data: null
                }
            };
        case 'data.fetchGamesSuccess':
            return {
                ...state,
                games: {
                    fetching: false,
                    error: null,
                    data: Object.fromEntries(action.games.map(game => [game.id, game]))
                }
            };
        case 'data.fetchGamesError':
            return {
                ...state,
                games: {
                    fetching: false,
                    error: action.message,
                    data: null
                }
            };
        case 'data.fetchGameAchievementsStarted':
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    [action.gameId]: {
                        fetching: true,
                        error: null,
                        data: null
                    }
                }
            };
        case 'data.fetchGameAchievementsSuccess':
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    [action.gameId]: {
                        fetching: false,
                        error: null,
                        data: action.achievements
                    }
                }
            };
        case 'data.fetchGameAchievementsError':
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    [action.gameId]: {
                        fetching: false,
                        error: action.message,
                        data: null
                    }
                }
            };
        case 'data.fetchHighscoresStarted':
            return {
                ...state,
                highscores: {
                    fetching: true,
                    error: null,
                    data: null
                }
            };
        case 'data.fetchHighscoresSuccess':
            return {
                ...state,
                highscores: {
                    fetching: false,
                    error: null,
                    data: action.highscores
                }
            };
        case 'data.fetchHighscoresError':
            return {
                ...state,
                highscores: {
                    fetching: false,
                    error: action.message,
                    data: null
                }
            };
        case 'data.fetchPlayerStarted':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        fetching: true,
                        error: null,
                        data: null
                    }
                }
            };
        case 'data.fetchPlayerSuccess':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        fetching: false,
                        error: null,
                        data: action.player
                    }
                }
            };
        case 'data.fetchPlayerError':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        fetching: false,
                        error: action.message,
                        data: null
                    }
                }
            };
        case 'data.fetchPlayerAchievementsStarted':
            return {
                ...state,
                playerAchievements: {
                    ...state.playerAchievements,
                    [action.playerUuid]: {
                        fetching: true,
                        error: null,
                        data: null
                    }
                }
            };
        case 'data.fetchPlayerAchievementsSuccess':
            return {
                ...state,
                playerAchievements: {
                    ...state.playerAchievements,
                    [action.playerUuid]: {
                        fetching: false,
                        error: null,
                        data: action.achievements
                    }
                }
            };
        case 'data.fetchPlayerAchievementsError':
            return {
                ...state,
                playerAchievements: {
                    ...state.playerAchievements,
                    [action.playerUuid]: {
                        fetching: false,
                        error: action.message,
                        data: null
                    }
                }
            };
        default:
            return state;
    }
}
