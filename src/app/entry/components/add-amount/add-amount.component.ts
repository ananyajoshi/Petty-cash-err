import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'add-amount',
    templateUrl: './add-amount.component.html',
    styleUrls: ['./add-amount.component.scss']
})

export class AddAmountComponent implements OnInit {
    @Input() public actionType: string;
    public amount: number = 0;

    constructor(private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
    }

    onAmountAdded() {
        this.popoverCtrl.dismiss({amount: this.amount});
    }
}
