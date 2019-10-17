import {Action} from '@ngrx/store';
import {FlattenAccountsResponse} from '../../models/account.model';

export enum AccountActionType {
    GetFlattenAccounts = '[Account] GetFlattenAccounts',
    GetFlattenAccountsComplete = '[Account] GetFlattenAccountsComplete',
    GetFlattenAccountsError = '[Account] GetFlattenAccountsError'
}

export class GetFlattenAccountAction implements Action {
    readonly type = AccountActionType.GetFlattenAccounts;

    constructor() {
    }
}

export class GetFlattenAccountCompleteAction implements Action {
    readonly type = AccountActionType.GetFlattenAccountsComplete;

    constructor(public result: FlattenAccountsResponse) {
    }
}

export class GetFlattenAccountErrorAction implements Action {
    readonly type = AccountActionType.GetFlattenAccountsError;

    constructor(public error: string) {
    }
}

export type AccountActionsUnion =
    GetFlattenAccountAction
    | GetFlattenAccountCompleteAction
    | GetFlattenAccountErrorAction;
