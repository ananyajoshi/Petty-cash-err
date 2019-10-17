import {INameUniqueName} from './general.model';
import {IPaginatedResponse} from './base.model';

export interface IAccountsInfo extends INameUniqueName {
    stocks?: any[];
    mergedAccounts?: string;
}

export interface IFlattenAccountsResultItem extends IAccountsInfo {
    applicableTaxes: any[];
    isFixed: boolean;
    parentGroups: INameUniqueName[];
    currency?: string;
    nameStr?: string;
    uNameStr?: string;
}


export class FlattenAccountsResponse implements IPaginatedResponse {
    public count: number;
    public page: number;
    public results: IFlattenAccountsResultItem[];
    public size: number;
    public totalItems: number;
    public totalPages: number;
}
