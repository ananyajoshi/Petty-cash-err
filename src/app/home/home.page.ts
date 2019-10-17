import {Component} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router) {
    }

    async openSelectActionModal() {
        const modal = await this.popover.create({
            component: SelectActionModalComponent,
            cssClass: 'my-custom-modal-css'
        });
        modal.present();

        modal.onDidDismiss().then(res => {
            if (res) {
                this.router.navigate([res.data.path]);
            }
        });
    }

}
