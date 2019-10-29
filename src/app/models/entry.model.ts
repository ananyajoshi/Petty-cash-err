export class EntryModel {
    entryDate: string;
    transactions: EntryTransaction[];
    exchangeRate: number;
    entryType: EntryTypes;
    baseAccount: string;
    baseAccountName: string;
    attachedFiles: string[];
    description: string;
    chequeNumber?: string;

    constructor() {
        this.transactions = [new EntryTransaction()];
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
