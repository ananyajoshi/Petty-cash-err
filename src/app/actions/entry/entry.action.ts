import {Action} from '@ngrx/store';
import {EntryModel} from '../../models/entry.model';

export enum EntryActionType {
    createEntry = '[Entry] createEntry',
    createEntrySuccess = '[Entry] createEntrySuccess',
    createEntryError = '[Entry] createEntryError',

    SetEntryRequest = '[Entry] SetEntry',
    ResetEntryRequest = '[Entry] ResetEntry'
}

export class CreateEntryAction implements Action {
    readonly type = EntryActionType.createEntry;

    constructor(public entry: EntryModel) {
    }
}

export class CreateEntrySuccessAction implements Action {
    readonly type = EntryActionType.createEntrySuccess;

    constructor(public result: any) {
    }
}

export class CreateEntryErrorAction implements Action {
    readonly type = EntryActionType.createEntryError;

    constructor(public error: string) {
    }
}

export class SetEntryAction implements Action {
    readonly type = EntryActionType.SetEntryRequest;

    constructor(public entry: Partial<EntryModel>) {
    }
}

export class ResetEntryAction implements Action {
    readonly type = EntryActionType.ResetEntryRequest;

    constructor() {
    }
}

export type EntryActionUnion =
    CreateEntryAction
    | CreateEntrySuccessAction
    | CreateEntryErrorAction
    | SetEntryAction
    | ResetEntryAction;
