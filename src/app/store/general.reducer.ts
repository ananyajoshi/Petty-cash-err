import {IFlattenAccountsResultItem} from '../models/account.model';
import {AccountActionsUnion, AccountActionType} from '../actions/account/account.action';
import {EntryTypes} from '../models/entry.model';

export interface GeneralState {
    flattenAccounts: IFlattenAccountsResultItem[];
    salesAccounts: IFlattenAccountsResultItem[];
    expensesAccounts: IFlattenAccountsResultItem[];
    depositAccounts: IFlattenAccountsResultItem[];
}

const initialState: GeneralState = {
    expensesAccounts: [],
    salesAccounts: [],
    depositAccounts: [],
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
                salesAccounts: filterAccounts(result, EntryTypes.sales),
                expensesAccounts: filterAccounts(result, EntryTypes.expense),
                depositAccounts: filterAccounts(result, EntryTypes.deposit)
            };

        case AccountActionType.GetFlattenAccountsError:
            return {
                ...state,
                flattenAccounts: [],
                expensesAccounts: [],
                salesAccounts: [],
                depositAccounts: []
            };

        default:
            return state;
    }
}

const filterAccounts = (accounts: IFlattenAccountsResultItem[], type: EntryTypes) => {
    switch (type) {
        case EntryTypes.sales:
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'otherincome' || s.uniqueName === 'revenuefromoperations');
            });

        case EntryTypes.expense:
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'operatingcost' || s.uniqueName === 'indirectexpenses');
            });

        case EntryTypes.deposit:
            return accounts.filter(acc => {
                return acc.parentGroups.some(s => s.uniqueName === 'bankaccounts' || s.uniqueName === 'cash');
            });
    }
};
