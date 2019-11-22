import {Component, OnInit} from '@angular/core';
import {LoadingController, MenuController, ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ResetEntryAction, SetEntryAction} from '../actions/entry/entry.action';
import {EntryService} from '../services/entry/entry.service';
import {EntryReportItem, EntryReportRequestModel} from '../models/entry.model';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {GeneralService} from '../services/general.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public reportRequestModal: EntryReportRequestModel;
    public reportResponse: EntryReportItem[];

    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router,
                private store: Store<AppState>, private menuController: MenuController, private _entryService: EntryService,
                private _generalService: GeneralService, private _loadingController: LoadingController
    ) {
        this.reportRequestModal = new EntryReportRequestModel();
        this.reportRequestModal.count = 50;
        this.reportRequestModal.page = 1;
    }

    ngOnInit(): void {
    }

    ionViewWillEnter() {
        this._generalService.companyChangeEvent.subscribe(isChanged => {
            if (isChanged) {
                this.getReportData();
            }
        });
    }

    async getReportData() {
        const loader = await this._loadingController.create({
            message: 'Getting Reports...'
        });
        loader.present();
        this._entryService.GetReport(this.reportRequestModal).subscribe(res => {
            if (res && res.status === 'success') {
                this.reportRequestModal.count = res.body.count;
                this.reportRequestModal.page = res.body.page;
                this.reportRequestModal.fromDate = res.body.fromDate;
                this.reportRequestModal.toDate = res.body.toDate;
                this.reportRequestModal.totalItems = res.body.totalItems;
                this.reportRequestModal.totalPages = res.body.totalPages;

                this.reportResponse = this.transformReportResponse(res.body.results);
            } else {
                this.reportResponse = [];
            }
            loader.dismiss();
        }, error => {
            loader.dismiss();
        });
    }

    toggleMenu() {
        this.menuController.toggle();
    }

    async openSelectActionModal() {
        const modal = await this.popover.create({
            component: SelectActionModalComponent,
            cssClass: 'select-action-popover',
            backdropDismiss: true,
            showBackdrop: true
        });
        modal.present();

        modal.onDidDismiss().then(res => {
            if (res && res.data) {
                this.store.dispatch(new SetEntryAction({entryType: res.data.type}));
                this.router.navigate(['pages', 'entry', res.data.type]);
            } else {
                this.store.dispatch(new ResetEntryAction());
            }
        });
    }

    private transformReportResponse(items: EntryReportItem[]): EntryReportItem[] {
        return items.map(item => {
            item.entryDate = moment(item.entryDate, 'DD-MM-YYYY').toDate();

            let total = 0;
            Object.keys(item.closingBalance).forEach(key => {
                total += item.closingBalance[key].amount;
            });
            item.totalClosingBalance = total;

            item.entries = item.entries.map(entry => {
                entry.entryDate = moment(entry.entryDate, 'DD-MM-YYYY').toDate();

                if (entry.fileNames) {
                    entry.fileNames = entry.fileNames.filter(f => !!f).map(file => {
                        file = `${environment.apiUrl}/company/${this._generalService.activeCompany.uniqueName}/image/${file}`;
                        return file;
                    });
                }

                // entry status icon
                const baseIconUrl = '../../assets/icon/';
                switch (entry.status) {
                    case 'approved':
                        entry.statusIcon = `${baseIconUrl}approved.svg`;
                        break;
                    case 'pending':
                        entry.statusIcon = `${baseIconUrl}pending.svg`;
                        break;
                    case 'rejected':
                        entry.statusIcon = `${baseIconUrl}rejected.svg`;
                        break;
                    case 'withdrawal':
                        entry.statusIcon = `${baseIconUrl}withdrawal.svg`;
                        break;
                    case 'deposit':
                        entry.statusIcon = `${baseIconUrl}deposit.svg`;
                        break;
                }

                return entry;
            });

            return item;
        });
    }

}
