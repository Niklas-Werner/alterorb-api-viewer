import { RootAction } from '../actions';

type GamesState = {
    games: any[];
};

const initialState: GamesState = {
    games: []
};

export function gamesReducer(state = initialState, action: RootAction): GamesState {
    switch (action.type) {
        case 'games.updateGames':
            return { games: action.games };
        default:
            return state;
    }
}
