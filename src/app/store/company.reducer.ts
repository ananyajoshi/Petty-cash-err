import {CompanyResponse} from '../models/company.model';
import {CompanyActionsUnion, CompanyActionType} from '../actions/company/company.action';

export interface CompanyState {
    companies: CompanyResponse[];
}

const initialState: CompanyState = {
    companies: []
};

export function CompanyReducer(state: CompanyState = initialState, action: CompanyActionsUnion) {
    switch (action.type) {
        case CompanyActionType.SetCompanies: {
            return {
                ...state,
                companies: action.companies
            };
        }
        default:
            return state;
    }
}
