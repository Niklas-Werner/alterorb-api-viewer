import { RootAction } from '../actions';
import { Game, Achievement } from '../../api';

type DataState = {
    games: {
        [id: number]: Game;
    } | null;
    achievements: {
        [gameId: number]: Achievement[] | null;
    };
};

const initialState: DataState = {
    games: null,
    achievements: {}
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
        default:
            return state;
    }
}
