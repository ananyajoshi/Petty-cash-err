import {Action} from '@ngrx/store';
import {CompanyResponse} from '../../models/company.model';

export enum CompanyActionType {
    SetCompanies = '[Company] SetCompanies'
}

export class SetCompanyAction implements Action {
    readonly type = CompanyActionType.SetCompanies;

    constructor(public companies: CompanyResponse[]) {
    }
}


export type CompanyActionsUnion =
    SetCompanyAction;
