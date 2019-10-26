import {Component, Input, OnInit} from '@angular/core';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';
import {EntryTypes} from '../../../models/entry.model';

@Component({
    selector: 'payment-mode-component',
    templateUrl: './payment-mode.component.html',
    styleUrls: ['./payment-mode.component.scss']
})

export class PaymentModeComponent implements OnInit {
    @Input() public entryType: EntryTypes;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];

    constructor(private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
    }

    accountSelected(account: IFlattenAccountsResultItem) {
        this.popoverCtrl.dismiss({account});
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }
}
