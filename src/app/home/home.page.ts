import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, LoadingController, MenuController, ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ResetEntryAction, SetEntryAction} from '../actions/entry/entry.action';
import {EntryService} from '../services/entry/entry.service';
import {EntryReportItem, EntryReportRequestModel} from '../models/entry.model';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {GeneralService} from '../services/general.service';
import {EntryClosingBalanceDetailsComponent} from './entry-closing-baalnce-details-component/entry-closing-balance-details-component';
import {IFlattenAccountsResultItem} from '../models/account.model';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

//import { Camera,CameraOptions } from '@ionic-native/Camera';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
    public reportRequestModal: EntryReportRequestModel;
    public reportResponse: EntryReportItem[];
    public flattenAccounts: IFlattenAccountsResultItem[];
    public companyCurrencySymbol: string;
    private camera: Camera;
    imgData:any;
    imgName:any;
    myPhoto :any;
    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router,
                private store: Store<AppState>, private menuController: MenuController, private _entryService: EntryService,
                private _generalService: GeneralService, private _loadingController: LoadingController 
    ) {
        this.reportRequestModal = new EntryReportRequestModel();
        this.reportRequestModal.count = 10;
        this.reportRequestModal.size = 10;
        this.reportRequestModal.page = 1;
        this.camera = new Camera();
    }

    ngOnInit(): void {
        if (this._generalService.activeCompany) {
            this.companyCurrencySymbol = this._generalService.activeCompany.baseCurrencySymbol;
        }
        this.store.pipe(select(s => s.general.flattenAccounts), untilDestroyed(this)).subscribe(res => {
            this.flattenAccounts = res;
        });
    }

    ionViewWillEnter() {
        this._generalService.companyChangeEvent.subscribe(isChanged => {
            if (isChanged) {
                this.getReportData();
            }
        });
    }
   
    //A

    takePhoto(){
        const options:CameraOptions={
          quality:100,
          destinationType:this.camera.DestinationType.DATA_URL,
          encodingType:this.camera.EncodingType.PNG,
          mediaType:this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData)=>{
          this.myPhoto = 'data:image/png;base64,' + imageData;
          this.imgData=imageData;
        },(err)=>{
          console.log(err);
        });
    
      }
      getPhoto(){
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType:this.camera.EncodingType.PNG,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum:false
        }
        this.camera.getPicture(options).then((imageData) => {
          this.myPhoto = 'data:image/png;base64,' + imageData;
          this.imgData = imageData;
        }, (err) => {
          console.log(err);
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

    async showBalanceDetailsPopup(item: EntryReportItem) {
        const popover = await this.popover.create({
            component: EntryClosingBalanceDetailsComponent,
            componentProps: {
                entryReportItem: item,
                companyCurrencySymbol: this.companyCurrencySymbol
            },
        });

        await popover.present();
    }

    async pageChanged() {
        this.reportRequestModal.page += 1;
        this.reportRequestModal.count = 10;
        await this.getReportData();
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
                entry.showCreatedBy = entry.createdBy.uniqueName !== this._generalService.user.uniqueName;

                // entry type icon process
                const account = this.flattenAccounts.find(f => f.uniqueName === entry.particularAccount.uniqueName);
                if (account) {
                    let type: string;
                    if (account.parentGroups.some(s => s.uniqueName === 'bankaccounts')) {
                        type = 'bank';
                    } else if (account.parentGroups.some(s => s.uniqueName === 'cash')) {
                        type = 'cash';
                    }
                    // else if (account.parentGroups.some(s => ['sundrycreditors', 'sundrydebtors'].includes(s.uniqueName))) {
                    //     type = 'user';
                    // }
                    if (type) {
                        entry.entryTypeIcon = `../../assets/icon/${type}.svg`;
                    }
                }

                if (entry.fileNames) {
                    entry.fileNames = entry.fileNames.filter(f => f && f.length).map(file => {
                        file = `${environment.apiUrl}/company/${this._generalService.activeCompany.uniqueName}/image/${file}`;
                        return file;
                    });
                }

                // entry status icon preparation
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

    ngOnDestroy(): void {
    }

}
