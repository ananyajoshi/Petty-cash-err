import {IFlattenAccountsResultItem} from '../models/account.model';
import {AccountActionsUnion, AccountActionType} from '../actions/account/account.action';

export interface GeneralState {
    flattenAccounts: IFlattenAccountsResultItem[];
}

const initialState: GeneralState = {
    flattenAccounts: []
};

export function GeneralReducer(state: GeneralState = initialState, action: AccountActionsUnion): GeneralState {
    switch (action.type) {
        case AccountActionType.GetFlattenAccounts:
            return state;

        case AccountActionType.GetFlattenAccountsComplete:
            return {
                ...state,
                flattenAccounts: action.result.results
            };

        case AccountActionType.GetFlattenAccountsError:
            return {
                ...state,
                flattenAccounts: []
            };

        default:
            return state;
    }
}
