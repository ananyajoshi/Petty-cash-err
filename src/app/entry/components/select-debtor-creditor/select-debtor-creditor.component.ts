import {Component, Input, OnInit} from '@angular/core';
import {EntryTypes} from '../../../models/entry.model';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'select-debtor-creditor-component',
    templateUrl: './select-debtor-creditor.component.html',
    styleUrls: ['./select-debtor-creditor.component.scss']
})

export class SelectDebtorCreditorComponent implements OnInit {
    @Input() public entryType: EntryTypes;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];
    @Input() public accountType: string;
    @Input() public selectedItem: IFlattenAccountsResultItem;

    constructor(private popoverCtrl: PopoverController) {

    }

    ngOnInit() {
        if (!this.selectedItem) {
            this.selectedItem = {uniqueName: '', name: 'Others'};
        }
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
