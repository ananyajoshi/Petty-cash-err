import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {AppState} from '../store/reducer';
import {Store} from '@ngrx/store';
import {LogoutUserAction} from '../actions/auth/auth.action';

@Component({
    selector: 'no-company-data',
    templateUrl: './no-company-modal.component.html',
    styleUrls: ['./no-company-modal.component.scss']
})

export class NoCompanyModalComponent implements OnInit {
    @Input() public email: string;

    constructor(private router: Router, private modalController: ModalController, private store: Store<AppState>) {
    }

    ngOnInit() {
    }

    login() {
        this.store.dispatch(new LogoutUserAction());
        this.modalController.dismiss();
    }
}
