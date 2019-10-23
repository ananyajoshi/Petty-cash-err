import {Component, OnInit} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private modalController: ModalController, private popover: PopoverController, private router: Router,
                private activatedRouter: ActivatedRoute) {
    }

    ngOnInit(): void {
        // this.activatedRouter.url.subscribe(url => {
        //     const showSelectActionModal = url.some(u => u.path.includes('select-action'));
        //
        //     if (showSelectActionModal) {
        //         const action = this.activatedRouter.snapshot.params.action;
        //         this.openSelectActionModal();
        //     }
        // });
    }

    async openSelectActionModal() {
        const modal = await this.popover.create({
            component: SelectActionModalComponent,
            cssClass: 'my-custom-modal-css'
        });
        modal.present();

        modal.onDidDismiss().then(res => {
            if (res && res.data) {
                this.router.navigate([res.data.path]);
            }
        });
    }

}
