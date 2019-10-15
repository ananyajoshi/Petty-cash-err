import {Component} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './selectAction/selectAction.modal.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private modalController: ModalController, private popover: PopoverController) {
    }

    async openSelectActionModal() {
        const modal = await this.popover.create({
            component: SelectActionModalComponent,
            cssClass: 'my-custom-modal-css'
        });
        modal.present();
    }

}
