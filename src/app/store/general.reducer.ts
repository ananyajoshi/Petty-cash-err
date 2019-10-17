import {IFlattenAccountsResultItem} from '../models/account.model';
import {AccountActionsUnion, AccountActionType} from '../actions/account/account.action';

export interface GeneralState {
    flattenAccounts: IFlattenAccountsResultItem[];
    salesAccounts: IFlattenAccountsResultItem[];
    purchaseAccounts: IFlattenAccountsResultItem[];
    withdrawalAccounts: IFlattenAccountsResultItem[];
}

const initialState: GeneralState = {
    purchaseAccounts: [],
    salesAccounts: [],
    withdrawalAccounts: [],
    flattenAccounts: []
};

export function GeneralReducer(state: GeneralState = initialState, action: AccountActionsUnion): GeneralState {
    switch (action.type) {
        case AccountActionType.GetFlattenAccounts:
            return state;

        case AccountActionType.GetFlattenAccountsComplete:
            const result = action.result.results;
            return {
                ...state,
                flattenAccounts: action.result.results,
                salesAccounts: filterAccounts(result, 'sales'),
                purchaseAccounts: filterAccounts(result, 'purchase'),
                withdrawalAccounts: filterAccounts(result, 'withdrawal')
            };

        case AccountActionType.GetFlattenAccountsError:
            return {
                ...state,
                flattenAccounts: [],
                purchaseAccounts: [],
                salesAccounts: [],
                withdrawalAccounts: []
            };

        default:
            return state;
    }
}

const filterAccounts = (accounts: IFlattenAccountsResultItem[], type: string) => {
    switch (type) {
        case 'sales':
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'otherincome' || s.uniqueName === 'revenuefromoperations');
            });

        case 'purchase':
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'operatingcost' || s.uniqueName === 'indirectexpenses');
            });

        case 'withdrawal':
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'bankaccounts' || s.uniqueName === 'cash');
            });
    }
};
