import { RootAction } from '../actions';
import { Game, Achievement, HighscoresOrbPoints, Account } from '../../api';

type DataState = {
    games: Record<number, Game> | null;
    achievements: Record<number, Achievement[] | null>;
    highscores: HighscoresOrbPoints[] | null;
    players: Record<string, Account>;
    playerNames: Record<string, string>;
};

const initialState: DataState = {
    games: null,
    achievements: {},
    highscores: null,
    players: {},
    playerNames: {}
};

export function dataReducer(state = initialState, action: RootAction): DataState {
    switch (action.type) {
        case 'data.updateGames':
            return {
                ...state,
                games: Object.fromEntries(action.games.map(game => [game.id, game]))
            };
        case 'data.updateGameAchievements':
            return {
                ...state,
                achievements: {
                    ...state.achievements,
                    [action.gameId]: action.achievements
                }
            };
        case 'data.updateHighscores':
            return {
                ...state,
                highscores: action.highscores
            };
        case 'data.updatePlayer':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.player.uuid!]: action.player
                },
                playerNames: {
                    ...state.playerNames,
                    [action.player.displayName!]: action.player.uuid!
                }
            };
        default:
            return state;
    }
}
