import {EntryModel} from '../models/entry.model';
import {EntryActionType, EntryActionUnion} from '../actions/entry/entry.action';

export interface EntryState {
    createEntryInProcess: boolean;
    createEntrySuccess: boolean;
    requestModal: EntryModel;
}

const initialState: EntryState = {
    createEntryInProcess: false,
    createEntrySuccess: false,
    requestModal: new EntryModel()
};

export function EntryReducer(state: EntryState = initialState, action: EntryActionUnion): EntryState {
    switch (action.type) {
        case EntryActionType.createEntry:
            return {
                ...state,
                createEntryInProcess: true,
                createEntrySuccess: false,
            };

        case EntryActionType.createEntrySuccess: {
            return {
                ...state,
                createEntrySuccess: true,
                createEntryInProcess: false,
                requestModal: new EntryModel()
            };
        }

        case EntryActionType.SetEntryRequest: {
            return {
                ...state,
                requestModal: {
                    ...state.requestModal,
                    ...action.entry
                }
            };
        }

        case EntryActionType.ResetEntryRequest: {
            return {
                ...state,
                requestModal: new EntryModel()
            };
        }
        default:
            return state;
    }
}
