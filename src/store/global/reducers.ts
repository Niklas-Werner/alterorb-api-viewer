import { RootAction } from '../actions';

type GlobalState = {
    loading: boolean;
    error?: string;
};

const initialState: GlobalState = {
    loading: false
};

export function globalReducer(state = initialState, action: RootAction): GlobalState {
    switch (action.type) {
        case 'global.beginLoading':
            return { ...state, loading: true, error: undefined };
        case 'global.endLoading':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}
