import {Component, Input, OnInit} from '@angular/core';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';
import {EntryTypes} from '../../../models/entry.model';

@Component({
    selector: 'select-account-component',
    templateUrl: './select-account.component.html',
    styleUrls: ['./select-account.component.scss']
})

export class SelectAccountComponentComponent implements OnInit {
    @Input() public entryType: EntryTypes;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];
    public searchModal: string = '';
    public title: string;

    public filteredAccounts: IFlattenAccountsResultItem[] = [];

    constructor(private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
        this.filteredAccounts = this.accountList;

        switch (this.entryType) {
            case EntryTypes.sales:
                this.title = 'Sales/Income Ac';
                break;
            case EntryTypes.expense:
                this.title = 'Expenses';
                break;
            case EntryTypes.deposit:
                this.title = 'Withdrawal Ac';
                break;
        }
    }

    searchInputChanged() {
        this.filteredAccounts = this.accountList.filter(f => {
            return f.name.toLowerCase().includes(this.searchModal.toLowerCase()) ||
                f.uniqueName.toLowerCase().includes(this.searchModal.toLowerCase());
        });
    }

    accountSelected(account: IFlattenAccountsResultItem) {
        this.popoverCtrl.dismiss(account);
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }
}
