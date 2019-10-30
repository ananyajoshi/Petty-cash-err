import {Component, Input, OnInit} from '@angular/core';
import {PopoverController, ToastController} from '@ionic/angular';

@Component({
    selector: 'add-amount',
    templateUrl: './add-amount.component.html',
    styleUrls: ['./add-amount.component.scss']
})

export class AddAmountComponent implements OnInit {
    @Input() public actionType: string;
    public amount: number = 0;

    constructor(private popoverCtrl: PopoverController, private toasterController: ToastController) {
    }

    ngOnInit() {
    }

    focusOnInput() {
        if (Number(this.amount) === 0) {
            this.amount = undefined;
        }
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }

    onAmountAdded() {
        const amount = Number(this.amount);
        if (Number.isNaN(amount) || amount < 0) {
            this.toasterController.create({
                color: 'danger',
                duration: 3000,
                message: 'Please add valid amount',
                showCloseButton: true,
                position: 'top'
            }).then((res => {
                res.present();
                return;
            }));
        } else {
            this.popoverCtrl.dismiss({amount: this.amount});
        }
    }
}
