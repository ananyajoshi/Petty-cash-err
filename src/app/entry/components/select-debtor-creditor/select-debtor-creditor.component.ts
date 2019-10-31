import {Component, Input} from '@angular/core';
import {EntryTypes} from '../../../models/entry.model';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'select-debtor-creditor-component',
    templateUrl: './select-debtor-creditor.component.html',
    styleUrls: ['./select-debtor-creditor.component.scss']
})

export class SelectDebtorCreditorComponent {
    @Input() public entryType: EntryTypes;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];
    @Input() public accountType: string;
    public selectedItem: IFlattenAccountsResultItem;

    constructor(private popoverCtrl: PopoverController) {

    }

    accountSelected(account: IFlattenAccountsResultItem) {
        this.selectedItem = account;
    }

    next() {
        this.popoverCtrl.dismiss(this.selectedItem);
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }
}
