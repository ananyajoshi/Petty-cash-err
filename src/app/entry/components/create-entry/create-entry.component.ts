import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EntryModel} from '../../../models/entry.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/reducer';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CreateEntryAction, ResetEntryAction} from '../../../actions/entry/entry.action';
import {PopoverController} from '@ionic/angular';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PaymentModeComponent} from '../payment-mode/payment-mode.component';
import {SelectDebtorCreditorComponent} from '../select-debtor-creditor/select-debtor-creditor.component';
import * as moment from 'moment';
import {SelectWithdrawalDepositAccountComponent} from '../select-withdrawal-deposit-account/select-withdrawal-deposit-account.component';
import {CompanyService} from '../../../services/company/company.service';

@Component({
    selector: 'create-entry',
    templateUrl: './create-entry.component.html',
    styleUrls: ['./create-entry.component.scss']
})

export class CreateEntryComponent implements OnInit, OnDestroy {
    public requestModal: EntryModel;
    public salesAccounts: IFlattenAccountsResultItem[] = [];
    public expensesAccounts: IFlattenAccountsResultItem[] = [];
    public depositAccounts: IFlattenAccountsResultItem[] = [];
    public debtorsAccounts: IFlattenAccountsResultItem[] = [];
    public creditorsAccount: IFlattenAccountsResultItem[] = [];
    public otherPaymentMode: IFlattenAccountsResultItem = null;
    public createEntryInProcess: boolean = false;
    public activeCurrency: 0 | 1 = 0;
    public isBankAccountSelected: boolean = false;

    constructor(private router: Router, private store: Store<AppState>, private popoverCtrl: PopoverController, private _companyService: CompanyService) {
    }

    ngOnInit() {
        this.store.pipe(select(s => s.entry.requestModal), untilDestroyed(this)).subscribe(req => {
            this.requestModal = req;

            if (req.isMultiCurrencyAvailable) {
                this.getCurrencyDetails();
            }
        });

        this.store.pipe(select(s => s.entry.createEntryInProcess), untilDestroyed(this))
            .subscribe(result => this.createEntryInProcess = result);

        this.store.pipe(
            select(s => s.general),
            untilDestroyed(this)
        ).subscribe(res => {
            this.salesAccounts = res.salesAccounts;
            this.expensesAccounts = res.expensesAccounts;
            this.depositAccounts = res.depositAccounts;
            this.debtorsAccounts = res.debtorsAccounts;
            this.creditorsAccount = res.creditorsAccounts;
        });
    }

    goToHome() {
        this.store.dispatch(new ResetEntryAction());
        this.router.navigate(['pages', 'home']);
    }

    createEntry() {
        this.requestModal.entryDate = moment(this.requestModal.entryDate).format('DD-MM-YYYY');
        this.store.dispatch(new CreateEntryAction(this.requestModal));
    }

    async showPaymentMode() {
        const paymentModePopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.depositAccounts],
                entryType: this.requestModal.entryType
            },
            component: PaymentModeComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover'
        });

        await paymentModePopover.present();

        paymentModePopover.onDidDismiss().then(res => {
            if (res && res.data) {
                if (['notYetReceived', 'notYetPaid'].includes(res.data.uniqueName)) {
                    this.otherPaymentMode = res.data;
                    this.requestModal.baseAccount = null;
                    this.requestModal.baseAccountName = null;
                } else {
                    this.otherPaymentMode = null;
                    this.requestModal.baseAccount = res.data.uniqueName;
                    this.requestModal.baseAccountName = res.data.name;
                    this.isBankAccountSelected = res.data.parentGroups.some(s => s.uniqueName === 'bankaccounts');
                }
            } else {
                // this.goToHome();
            }
        }).catch(reason => {
            //
        });
    }

    async showDebtorCreditor(type: string) {
        const accountListPopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.getAccounts(type)],
                entryType: this.requestModal.entryType,
                accountType: type
            },
            component: SelectDebtorCreditorComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover'
        });

        await accountListPopover.present();

        accountListPopover.onDidDismiss().then(res => {
            if (res && res.data) {
                this.requestModal.baseAccount = res.data.uniqueName;
                this.requestModal.baseAccountName = res.data.name;
            } else {
                //
            }
        }).catch(reason => {
            //
        });
    }

    async showWithdrawalDepositAcc(type: string) {
        const accountListPopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.depositAccounts.filter(f => f.uniqueName !== this.requestModal.transactions[0].particular)],
                type
            },
            component: SelectWithdrawalDepositAccountComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover'
        });

        await accountListPopover.present();

        accountListPopover.onDidDismiss().then(res => {
            if (res && res.data) {
                if (type === 'withdrawal') {
                    this.requestModal.transactions[0].particular = res.data.uniqueName;
                    this.requestModal.transactions[0].name = res.data.name;
                } else {
                    this.requestModal.baseAccount = res.data.uniqueName;
                    this.requestModal.baseAccountName = res.data.name;
                }
            } else {
                // this.goToHome();
            }
        }).catch(reason => {
            //
        });
    }

    switchExchangeRate() {
        this.activeCurrency = this.activeCurrency === 0 ? 1 : 0;
        let rate = 0;
        if (Number(this.requestModal.exchangeRate)) {
            rate = 1 / this.requestModal.exchangeRate;
        }
        this.requestModal.exchangeRate = rate;
    }

    exchangeRateChanged() {
        this.requestModal.exchangeRate = Number(this.requestModal.exchangeRate) || 0;
    }

    private getAccounts(type: string): IFlattenAccountsResultItem[] {
        if (type === 'debtors') {
            return this.debtorsAccounts;
        } else {
            return this.creditorsAccount;
        }
    }

    private getCurrencyDetails() {
        this._companyService.getCurrencyRateNewApi(this.requestModal.baseCurrencyDetails.code, this.requestModal.foreignCurrencyDetails.code,
            moment().format('DD-MM-YYYY'))
            .subscribe(res => {
                const rate = res.body;
                if (rate) {
                    this.requestModal.exchangeRate = rate;
                }
            });
    }

    ngOnDestroy(): void {
    }
}
