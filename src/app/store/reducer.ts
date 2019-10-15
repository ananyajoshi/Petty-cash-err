import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AppState {
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{auth: []}], rehydrate: true, storage: localStorage})(reducer);
}

// @ts-ignore
const a: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
// if (typeof window !== 'undefined') {
//   a.push(localStorageSyncReducer);
// }
export const metaReducers = a;
