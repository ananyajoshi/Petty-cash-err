import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EntryModel} from '../../../models/entry.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/reducer';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {CreateEntryAction, ResetEntryAction} from '../../../actions/entry/entry.action';
import {Platform, PopoverController, ToastController} from '@ionic/angular';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PaymentModeComponent} from '../payment-mode/payment-mode.component';
import {SelectDebtorCreditorComponent} from '../select-debtor-creditor/select-debtor-creditor.component';
import * as moment from 'moment';
import {SelectWithdrawalDepositAccountComponent} from '../select-withdrawal-deposit-account/select-withdrawal-deposit-account.component';
import {CompanyService} from '../../../services/company/company.service';
import {GeneralService} from '../../../services/general.service';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {IOSFilePicker} from '@ionic-native/file-picker/ngx';
import {EntryUrls} from '../../../services/entry/entry.url';
// import {Plugins} from '@capacitor/core'

// const {Device} = Plugins;

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

    public isFileUploading: boolean;
    public paymentModePopover;
    public debtorListPopover;
    public depositListPopover;

    constructor(private router: Router, private store: Store<AppState>, private popoverCtrl: PopoverController, private _companyService: CompanyService,
                private _generalService: GeneralService, private platform: Platform, private toasterCtrl: ToastController) {
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

    ionViewDidEnter() {
        // this._generalService.manageInputFocusScroll(90);
    }

    async showPaymentMode() {
        this.paymentModePopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.depositAccounts],
                entryType: this.requestModal.entryType
            },
            component: PaymentModeComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover',
            showBackdrop: true
        });

        await this.paymentModePopover.present();

        this.paymentModePopover.onDidDismiss().then(res => {
            if (res && res.data) {
                if (['notYetReceived', 'notYetPaid'].includes(res.data.uniqueName)) {
                    this.otherPaymentMode = res.data;
                    this.requestModal.baseAccount = null;
                    this.requestModal.baseAccountName = null;
                    this.isBankAccountSelected = false;
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
        this.debtorListPopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.getAccounts(type)],
                entryType: this.requestModal.entryType,
                accountType: type
            },
            component: SelectDebtorCreditorComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover',
            showBackdrop: true
        });

        await this.debtorListPopover.present();

        this.debtorListPopover.onDidDismiss().then(res => {
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
        this.depositListPopover = await this.popoverCtrl.create({
            componentProps: {
                accountList: [...this.depositAccounts],
                type
            },
            component: SelectWithdrawalDepositAccountComponent,
            animated: true,
            backdropDismiss: false,
            cssClass: 'select-amount-popover',
            showBackdrop: true
        });

        await this.depositListPopover.present();

        this.depositListPopover.onDidDismiss().then(res => {
            if (res && res.data) {

                if (res.data.uniqueName === 'others') {
                    const isThereOthersAcc = this.depositAccounts.find(d => d.uniqueName === 'others');
                    if (isThereOthersAcc) {
                        if (type === 'withdrawal') {
                            this.requestModal.transactions[0].particular = isThereOthersAcc.uniqueName;
                            this.requestModal.transactions[0].name = isThereOthersAcc.name;
                        } else {
                            this.requestModal.baseAccount = isThereOthersAcc.uniqueName;
                            this.requestModal.baseAccountName = isThereOthersAcc.name;
                        }
                    } else {
                        if (type === 'withdrawal') {
                            this.requestModal.transactions[0].particular = '';
                            this.requestModal.transactions[0].name = 'Others';
                        } else {
                            this.requestModal.baseAccount = '';
                            this.requestModal.baseAccountName = 'Others';
                        }
                    }
                } else {
                    if (type === 'withdrawal') {
                        this.requestModal.transactions[0].particular = res.data.uniqueName;
                        this.requestModal.transactions[0].name = res.data.name;
                    } else {
                        this.requestModal.baseAccount = res.data.uniqueName;
                        this.requestModal.baseAccountName = res.data.name;

                        this.isBankAccountSelected = res.data.parentGroups.some(s => s.uniqueName === 'bankaccounts');
                    }
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

    async chooseFile() {
        // const info = await Device.getInfo();
        // console.log(info);

        if (this.platform.is('android')) {
            const fc = new FileChooser();
            fc.open({mime: 'image/*'})
                .then(uri => {
                    this.uploadFile(uri);
                })
                .catch(e => {
                    if (e !== 'User canceled.') {
                        this.showToaster('Something Went Wrong', 'danger');
                    }
                    this.isFileUploading = false;
                });
        } else if (this.platform.is('ios')) {
            const filePicker = new IOSFilePicker();
            filePicker.pickFile()
                .then(uri => {
                    this.uploadFile(uri);
                })
                .catch(e => {
                    if (e !== 'canceled') {
                        this.showToaster('Something Went Wrong', 'danger');
                        this.isFileUploading = false;
                    }
                });
        }
    }

    ngOnDestroy(): void {
        if (this.paymentModePopover) {
            this.paymentModePopover.dismiss();
        }

        if (this.debtorListPopover) {
            this.debtorListPopover.dismiss();
        }

        if (this.depositListPopover) {
            this.depositListPopover.dismiss();
        }
    }

    private uploadFile(uri) {
        const transfer = new FileTransfer();
        const fileTransfer: FileTransferObject = transfer.create();
        const options: FileUploadOptions = {
            fileKey: 'file',
            headers: {
                'Session-Id': this._generalService.sessionId
            }
        };
        const httpUrl = EntryUrls.uploadAttachment.replace(':companyUniqueName', this._generalService.activeCompany.uniqueName);
        fileTransfer.upload(uri, httpUrl, options)
            .then((data) => {
                if (data && data.response) {
                    const result = JSON.parse(data.response);
                    this.requestModal.attachedFiles.push(result.body.uniqueName);
                    this.requestModal.attachedFilesVm.push(result.body.path + '.' + result.body.imageFormat);
                    this.showToaster('Attachment uploaded successfully');
                    this.isFileUploading = false;
                }
            }, (err) => {
                // show toaster
                this.showToaster('Something Went Wrong');
                this.isFileUploading = false;
            });
    }

    private async showToaster(msg: string, type: string = 'success') {
        const toaster = await this.toasterCtrl.create({
            duration: 3000,
            color: type,
            message: msg,
            showCloseButton: true,
            position: 'top'
        });
        await toaster.present();
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
}
