import {Component, OnInit} from '@angular/core';
import {GeneralService} from '../services/general.service';
import {CompanyResponse} from '../models/company.model';
import {MenuController, ModalController} from '@ionic/angular';
import {SelectCompanyComponent} from '../select-company/select-company.component';
import {AppState} from '../store/reducer';
import {Store} from '@ngrx/store';
import {LogoutUserAction} from '../actions/auth/auth.action';
import {AuthEffect} from '../actions/auth/auth.effect';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.page.html',
    styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
    public activeCompany: CompanyResponse;

    constructor(private _generalService: GeneralService, private modalController: ModalController, private store: Store<AppState>,
                private menu: MenuController, private authEffects: AuthEffect) {
    }

    ngOnInit() {
        // subscribe to active company
        this._generalService.companyChangeEvent.subscribe(isChanged => {
            if (isChanged) {
                this.activeCompany = this._generalService.activeCompany;
            }
        });
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

    closeMenu() {
        this.menu.close();
    }

    logout() {
        this.store.dispatch(new LogoutUserAction());
    }

}
