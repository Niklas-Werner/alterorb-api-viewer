import { RootAction } from '../actions';

type UIState = {
    selectedGameJagexName: string | undefined;
    selectedPlayerName: string | undefined;
    searchPlayerName: string;
    searchingPlayer: boolean;
};

const initialState: UIState = {
    selectedGameJagexName: undefined,
    selectedPlayerName: undefined,
    searchPlayerName: '',
    searchingPlayer: false
};

export function uiReducer(state = initialState, action: RootAction): UIState {
    switch (action.type) {
        case 'ui.selectGame':
            return {
                ...state,
                selectedGameJagexName: action.jagexName
            };
        case 'ui.selectPlayer':
            return {
                ...state,
                selectedPlayerName: action.name
            };
        case 'ui.updateSearchPlayerName':
            return {
                ...state,
                searchPlayerName: action.name
            };
        case 'ui.searchPlayerStarted':
            return {
                ...state,
                searchingPlayer: true
            };
        case 'ui.searchPlayerFinished':
            return {
                ...state,
                searchingPlayer: false,
                searchPlayerName: ''
            };
        default:
            return state;
    }
}
