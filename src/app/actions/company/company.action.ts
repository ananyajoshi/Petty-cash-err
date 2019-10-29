import {Action} from '@ngrx/store';
import {CompanyResponse, ICurrencyDetails} from '../../models/company.model';

export enum CompanyActionType {
    SetCompanies = '[Company] SetCompanies',

    GetCurrencies = '[Company] GetCurrencies',
    GetCurrenciesSuccess = '[Company] GetCurrenciesSuccess',
    GetCurrenciesError = '[Company] GetCurrenciesError',
}

export class SetCompanyAction implements Action {
    readonly type = CompanyActionType.SetCompanies;

    constructor(public companies: CompanyResponse[]) {
    }
}

export class GetCurrenciesAction implements Action {
    readonly type = CompanyActionType.GetCurrencies;

    constructor() {
    }
}

export class GetCurrenciesSuccessAction implements Action {
    readonly type = CompanyActionType.GetCurrenciesSuccess;

    constructor(public currencies: ICurrencyDetails[]) {
    }
}

export class GetCurrenciesErrorAction implements Action {
    readonly type = CompanyActionType.GetCurrenciesError;

    constructor(public error: string) {
    }
}


export type CompanyActionsUnion =
    SetCompanyAction
    | GetCurrenciesAction
    | GetCurrenciesSuccessAction
    | GetCurrenciesErrorAction;
