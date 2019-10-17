import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {AddAmountComponent} from './components/add-amount/add-amount.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.page.html',
    styleUrls: ['./entry.page.scss'],
})
export class EntryPage implements OnInit {
    public actionType: string;

    constructor(private popoverCtrl: PopoverController, private activatedRouter: ActivatedRoute) {
    }

    async ngOnInit() {
        this.actionType = this.activatedRouter.snapshot.params.type;

        const addAmountPopover = await this.popoverCtrl.create({
            component: AddAmountComponent,
            showBackdrop: false,
            animated: true,
            componentProps: {
                actionType: this.actionType
            }
        });
        await addAmountPopover.present();
    }

}
