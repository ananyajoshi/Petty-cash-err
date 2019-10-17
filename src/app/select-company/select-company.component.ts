import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CompanyResponse} from '../models/company.model';
import {AppState} from '../store/reducer';
import {select, Store} from '@ngrx/store';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {SetActiveCompanyAction} from '../actions/auth/auth.action';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-select-company',
    templateUrl: './select-company.component.html',
    styleUrls: ['./select-company.component.scss'],
})
export class SelectCompanyComponent implements OnInit, OnDestroy {
    @Input() public activeCompanyUniqueName: string;
    public companies: CompanyResponse[] = [];

    constructor(private store: Store<AppState>, private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.store.pipe(
            select(s => s.company.companies), untilDestroyed(this)
        ).subscribe(res => {
            this.companies = res;
        });
    }

    switchCompany(uniqueName: string) {
        if (uniqueName === this.activeCompanyUniqueName) {
            return;
        }

        this.store.dispatch(new SetActiveCompanyAction(uniqueName));
        this.closeModal();
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    ngOnDestroy(): void {
    }

}
