import {IFlattenAccountsResultItem} from '../models/account.model';
import {AccountActionsUnion, AccountActionType} from '../actions/account/account.action';
import {EntryTypes} from '../models/entry.model';

export interface GeneralState {
    flattenAccounts: IFlattenAccountsResultItem[];
    salesAccounts: IFlattenAccountsResultItem[];
    expensesAccounts: IFlattenAccountsResultItem[];
    depositAccounts: IFlattenAccountsResultItem[];
    creditorsAccounts: IFlattenAccountsResultItem[];
    debtorsAccounts: IFlattenAccountsResultItem[];
}

const initialState: GeneralState = {
    expensesAccounts: [],
    salesAccounts: [],
    depositAccounts: [],
    flattenAccounts: [],
    creditorsAccounts: [],
    debtorsAccounts: []
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
                depositAccounts: filterAccounts(result, EntryTypes.deposit),
                creditorsAccounts: filterAccounts(result, 'creditors'),
                debtorsAccounts: filterAccounts(result, 'debtors')
            };

        case AccountActionType.GetFlattenAccountsError:
            return {
                ...state,
                flattenAccounts: [],
                expensesAccounts: [],
                salesAccounts: [],
                depositAccounts: [],
                debtorsAccounts: [],
                creditorsAccounts: []
            };

        default:
            return state;
    }
}

const filterAccounts = (accounts: IFlattenAccountsResultItem[], type: string) => {
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

        case 'creditors':
            return accounts.filter(acc => {
                return acc.parentGroups.some((s => s.uniqueName === 'sundrycreditors'));
            });
        case 'debtors':
            return accounts.filter(acc => {
                return acc.parentGroups.some((s => s.uniqueName === 'sundrydebtors'));
            });
    }
};
