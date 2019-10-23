import {Component, OnInit} from '@angular/core';
import {LogoutUserAction} from '../actions/auth/auth.action';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'no-company-data',
    templateUrl: './no-company-modal.component.html',
    styleUrls: ['./no-company-modal.component.scss']
})

export class NoCompanyModalComponent implements OnInit {
    constructor(private store: Store<AppState>, private popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    logout() {
        this.store.dispatch(new LogoutUserAction());
        this.popoverController.dismiss();
    }
}
