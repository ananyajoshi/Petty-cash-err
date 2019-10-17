import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import * as fromSession from './session.reducer';
import * as fromCompany from './company.reducer';
import * as fromGeneral from './general.reducer';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AppState {
    session: fromSession.SessionState;
    company: fromCompany.CompanyState;
    general: fromGeneral.GeneralState;
}

export const reducers: ActionReducerMap<AppState> = {
    session: fromSession.SessionReducer,
    company: fromCompany.CompanyReducer,
    general: fromGeneral.GeneralReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [{session: ['data', 'activeCompany']}], rehydrate: true, storage: localStorage})(reducer);
}

// @ts-ignore
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
