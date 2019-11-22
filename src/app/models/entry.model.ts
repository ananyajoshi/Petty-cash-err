import {ICurrencyDetails} from './company.model';
import {INameUniqueName} from './general.model';
import {IPaginatedResponse, IPagination} from './base.model';

export class EntryReportRequestModel implements IPagination {
    count: number;
    size?: number;
    page: number;
    totalItems: number;
    totalPages: number;
    toDate: string;
    fromDate: string;
}

export class EntryReportResponse implements IPaginatedResponse<EntryReportItem> {
    count: number;
    page: number;
    results: EntryReportItem[];
    size: number;
    totalItems: number;
    totalPages: number;
    fromDate: string;
    toDate: string;
    closingBalance: EntryBalance;
    openingBalance: EntryBalance;
}

export class EntryReportItem {
    entryDate: Date;
    closingBalance: EntryBalance;
    entries: EntryDetailModel[];
    totalClosingBalance: number;
}

export class EntryDetailModel {
    entryType: string;
    entryDate: Date;
    uniqueName: string;
    createdBy: INameUniqueName;
    currencySymbol: string;
    amount: number;
    baseAccount: INameUniqueName;
    particularAccount: INameUniqueName;
    fileNames: string[];
    description: string;
    status: string;
    statusIcon: string;
    statusMessage: string;
    baseAccountCategory: string;
}

export class EntryBalance {
    sales: EntryAmountObject;
    expense: EntryAmountObject;
    deposit: EntryAmountObject;
}

export class EntryAmountObject {
    amount: number;
    type: string;
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
