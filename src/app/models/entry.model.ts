import {ICurrencyDetails} from './company.model';

export class EntryModel {
    entryDate: any;
    transactions: EntryTransaction[];
    exchangeRate: number;
    entryType: EntryTypes;
    baseAccount: string;
    baseAccountName: string;
    attachedFiles: string[];
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
        this.attachedFiles = [];
        this.attachedFilesVm = [];
        this.entryDate = new Date();
    }
}

export class EntryTransaction {
    amount: number;
    particular: string;
    name: string;
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
