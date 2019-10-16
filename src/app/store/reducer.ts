import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromSession from './session.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AppState {
    session: fromSession.SessionState;
}

export const reducers: ActionReducerMap<AppState> = {
    session: fromSession.SessionReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{auth: []}], rehydrate: true, storage: localStorage})(reducer);
}

// @ts-ignore
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
