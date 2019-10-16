import {Component, OnInit} from '@angular/core';
import {GeneralService} from '../services/general.service';
import {CompanyResponse} from '../models/company.model';
import {ModalController} from '@ionic/angular';
import {SelectCompanyComponent} from '../select-company/select-company.component';
import {AppState} from '../store/reducer';
import {Store} from '@ngrx/store';
import {LogoutUserAction} from '../actions/auth/auth.action';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.page.html',
    styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
    public activeCompany: CompanyResponse;

    constructor(private _generalService: GeneralService, private modalController: ModalController, private store: Store<AppState>) {
    }

    ngOnInit() {
        this.activeCompany = this._generalService.activeCompany;
    }

    async showCompanySwitchModal() {
        const modal = await this.modalController.create({
            component: SelectCompanyComponent,
            animated: true,
            componentProps: {
                activeCompanyUniqueName: this.activeCompany.uniqueName
            }
        });
        await modal.present();
    }

    logout() {
        this.store.dispatch(new LogoutUserAction());
    }

}
