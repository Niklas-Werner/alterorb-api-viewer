import { RootAction } from '../actions';

type UIState = {
    selectedGameId: number | undefined;
    selectedGameJagexName: string | undefined;
    selectedPlayerUuid: string | undefined;
};

const initialState: UIState = {
    selectedGameId: undefined,
    selectedGameJagexName: undefined,
    selectedPlayerUuid: undefined
};

export function uiReducer(state = initialState, action: RootAction): UIState {
    switch (action.type) {
        case 'ui.selectGame':
            return {
                ...state,
                selectedGameId: action.gameId,
                selectedGameJagexName: action.jagexName
            };
        case 'ui.setSelectedPlayer':
            return {
                ...state,
                selectedPlayerUuid: action.uuid
            };
        default:
            return state;
    }
}
