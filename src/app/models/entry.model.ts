import {ICurrencyDetails} from './company.model';
import {INameUniqueName} from './general.model';
import {IPaginatedResponse, IPagination} from './base.model';

export class EntryListRequestModel implements IPagination {
    count: number;
    page: number;
    totalItems: number;
    totalPages: number;
    toDate: string;
    fromDate: string;
}

export class EntryListResponse implements IPaginatedResponse<EntryListItem> {
    count: number;
    page: number;
    results: EntryListItem[];
    size: number;
    totalItems: number;
    totalPages: number;
    fromDate: string;
    toDate: string;
}

export class EntryListItem {
    entryDate: string;
    closingBalance: EntryClosingBalance;
    entries: EntryDetailModel[];
}

export class EntryDetailModel {
    entryType: string;
    entryDate: string;
    uniqueName: string;
    createdBy: INameUniqueName;
    currencySymbol: string;
    amount: number;
    baseAccount: INameUniqueName;
    particularAccount: INameUniqueName;
    fileNames: any;
    description: string;
    status: string;
    statusMessage: string;
    baseAccountCategory: string;
}

export class EntryClosingBalance {
    sales: string;
    expense: string;
    deposit: string;
}

export class EntryModel {
    entryDate: any;
    transactions: EntryTransaction[];
    exchangeRate: number;
    entryType: EntryTypes;
    particular: INameUniqueName;
    attachedFileUniqueNames: string[];
    attachedFilesVm: string[];
    description: string;
    chequeNumber?: string;
    isMultiCurrencyAvailable?: boolean;
    baseCurrencyDetails: ICurrencyDetails;
    foreignCurrencyDetails: ICurrencyDetails;

    constructor() {
        this.transactions = [new EntryTransaction()];
        this.isMultiCurrencyAvailable = false;
        this.baseCurrencyDetails = null;
        this.foreignCurrencyDetails = null;
        this.attachedFileUniqueNames = [];
        this.attachedFilesVm = [];
        this.entryDate = new Date();
    }
}

export class EntryTransaction {
    amount: number;
    particular: INameUniqueName;
    type: string;
    description: string;

    constructor() {
        this.amount = 0;
    }
}

export enum EntryTypes {
    sales = 'sales',
    expense = 'expense',
    deposit = 'deposit'
}
