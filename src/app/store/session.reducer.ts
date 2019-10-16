import {AuthActionsUnion} from '../actions/auth/auth.action';
import {LoginResponseModel} from '../models/login.model';
import {CompanyResponse} from '../models/company.model';

export interface SessionState {
    data: LoginResponseModel;
    companies: CompanyResponse[];
}

const initialState: SessionState = {
    data: null,
    companies: []
};


export function SessionReducer(state: SessionState = initialState, action: AuthActionsUnion) {
    return state;
}
