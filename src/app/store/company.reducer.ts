import {CompanyResponse, ICurrencyDetails} from '../models/company.model';
import {CompanyActionsUnion, CompanyActionType} from '../actions/company/company.action';

export interface CompanyState {
    companies: CompanyResponse[];
    currencies: ICurrencyDetails[];
}

const initialState: CompanyState = {
    companies: [],
    currencies: []
};

export function CompanyReducer(state: CompanyState = initialState, action: CompanyActionsUnion) {
    switch (action.type) {
        case CompanyActionType.SetCompanies: {
            return {
                ...state,
                companies: action.companies
            };
        }

        case CompanyActionType.GetCurrencies:
            return {
                ...state,
                currencies: []
            };
        case CompanyActionType.GetCurrenciesError: {
            return {
                ...state,
                currencies: []
            };
        }
        case CompanyActionType.GetCurrenciesSuccess: {
            return {
                ...state,
                currencies: action.currencies
            };
        }
        default:
            return state;
    }
}
