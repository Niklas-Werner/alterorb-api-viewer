import { RootAction } from '../actions';

type ConfigState = {
    ownName: string;
};

const initialState: ConfigState = {
    ownName: ''
};

export function configReducer(state = initialState, action: RootAction): ConfigState {
    switch (action.type) {
        case 'config.setOwnName':
            return {
                ...state,
                ownName: action.name.toLowerCase()
            };
        default:
            return state;
    }
}
