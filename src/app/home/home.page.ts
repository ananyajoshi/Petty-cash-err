import {Component, OnInit} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router,
                ) {
    }

    ngOnInit(): void {
    }

    async openSelectActionModal() {
        const modal = await this.popover.create({
            component: SelectActionModalComponent,
            cssClass: 'my-custom-modal-css w350',
        });
        modal.present();

        modal.onDidDismiss().then(res => {
            if (res) {
                this.router.navigate([res.data.path]);
            }
        });
    }

}
