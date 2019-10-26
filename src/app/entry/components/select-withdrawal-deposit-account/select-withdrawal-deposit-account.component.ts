import {Component, Input, OnInit} from '@angular/core';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';
import {EntryTypes} from '../../../models/entry.model';

@Component({
    selector: 'select-withdrawal-deposit-account-component',
    templateUrl: './select-withdrawal-deposit-account.component.html',
    styleUrls: ['./select-withdrawal-deposit-account.component.scss']
})

export class SelectWithdrawalDepositAccountComponent implements OnInit {
    @Input() public type: string;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];

    constructor(private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
    }

    accountSelected(account: IFlattenAccountsResultItem) {
        this.popoverCtrl.dismiss(account);
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }
}
