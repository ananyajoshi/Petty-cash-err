import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {AddAmountComponent} from './components/add-amount/add-amount.component';
import {ActivatedRoute} from '@angular/router';
import {IFlattenAccountsResultItem} from '../models/account.model';
import {AppState} from '../store/reducer';
import {select, Store} from '@ngrx/store';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {SelectAccountComponentComponent} from './components/select-account/select-account.component';
import {BalanceViewComponent} from './components/balance-view/balance-view.component';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.page.html',
    styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit, OnDestroy {
    public actionType: string;
    public salesAccounts: IFlattenAccountsResultItem[] = [];
    public purchaseAccounts: IFlattenAccountsResultItem[] = [];
    public withdrawalAccounts: IFlattenAccountsResultItem[] = [];
    public accountList: IFlattenAccountsResultItem[] = [];

    public amount: number;

    constructor(private popoverCtrl: PopoverController, private activatedRouter: ActivatedRoute, private store: Store<AppState>) {
    }

    async ngOnInit() {
        this.actionType = this.activatedRouter.snapshot.params.type;

        this.store.pipe(
            select(s => s.general),
            untilDestroyed(this)
        ).subscribe(res => {
            this.salesAccounts = res.salesAccounts;
            this.purchaseAccounts = res.purchaseAccounts;
            this.withdrawalAccounts = res.withdrawalAccounts;

            this.assignAccountToList();
        });

        const addAmountPopover = await this.popoverCtrl.create({
            component: AddAmountComponent,
            animated: true,
            componentProps: {
                actionType: this.actionType
            },
            cssClass: 'w350'
        });
        await addAmountPopover.present();

        addAmountPopover.onDidDismiss().then(res => {
            this.amount = res.data.amount;
            this.showAccountList();
            // this.showBalance();
        }).catch(reason => {
            this.amount = 0;
        });
    }

    assignAccountToList() {
        switch (this.actionType) {
            case 'sales':
                this.accountList = this.salesAccounts;
                return;
            case 'purchase':
                this.accountList = this.purchaseAccounts;
                return;
            case 'withdrawal':
                this.accountList = this.withdrawalAccounts;
                return;
        }
    }

    async showAccountList() {
        const accountListPopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: this.accountList,
            },
            component: SelectAccountComponentComponent,
            animated: true,
            cssClass: 'w350'
        });

        await accountListPopover.present();

        accountListPopover.onDidDismiss().then(res => {
            this.showBalance();
        }).catch(reason => {
            //
        });
    }

    async showBalance() {
        const balancePopover = await this.popoverCtrl.create({
            component: BalanceViewComponent,
            animated: true,
            componentProps: {
                actionType: this.actionType
            },
            cssClass: 'w350 balance-popover'
        });
        await balancePopover.present();

        balancePopover.onDidDismiss().then(res => {
        }).catch(reason => {
            //
        });
    }

    ngOnDestroy(): void {
    }

}
