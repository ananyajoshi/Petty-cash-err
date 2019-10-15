import {AuthActionsUnion} from '../actions/auth/auth.action';

export interface AuthState {
    token: string;
}

const initialState: AuthState = {
    token: null
};


export function AuthReducer(state: AuthState = initialState, action: AuthActionsUnion) {
    return state;
}
