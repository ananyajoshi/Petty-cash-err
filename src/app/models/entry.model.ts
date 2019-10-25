export class EntryModel {
    entryDate: string;
    transactions: EntryTransaction[];
    exchangeRate: number;
    entryType: EntryTypes;

    constructor() {
        this.transactions = [new EntryTransaction()];
    }
}

export class EntryTransaction {
    amount: number;

    constructor() {
        this.amount = 0;
    }
}

export enum EntryTypes {
    sales = 'sales',
    expense = 'expense',
    deposit = 'deposit'
}
