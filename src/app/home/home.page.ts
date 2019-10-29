import {Component, OnInit} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ResetEntryAction, SetEntryAction} from '../actions/entry/entry.action';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router,
                private store: Store<AppState>
    ) {
    }

    ngOnInit(): void {
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

}
