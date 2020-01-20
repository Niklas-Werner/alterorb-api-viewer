import { RootAction } from '../actions';

type UIState = {
    selectedGameId: number | undefined;
    selectedGameJagexName: string | undefined;
    selectedPlayerName: string | undefined;
};

const initialState: UIState = {
    selectedGameId: undefined,
    selectedGameJagexName: undefined,
    selectedPlayerName: undefined
};

export function uiReducer(state = initialState, action: RootAction): UIState {
    switch (action.type) {
        case 'ui.selectGame':
            return {
                ...state,
                selectedGameId: action.gameId,
                selectedGameJagexName: action.jagexName
            };
        case 'ui.selectPlayer':
            return {
                ...state,
                selectedPlayerName: action.name
            };
        default:
            return state;
    }
}
