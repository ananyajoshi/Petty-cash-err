import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'add-amount',
    templateUrl: './add-amount.component.html',
    styleUrls: ['./add-amount.component.scss']
})

export class AddAmountComponent implements OnInit {
    @Input() public actionType: string;
    public amount: number = 0;

    constructor(private popoverCtrl: PopoverController, private router: Router) {
    }

    ngOnInit() {
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
        this.router.navigate(['pages/home']);
    }

    onAmountAdded() {
        this.popoverCtrl.dismiss({amount: this.amount});
    }
}
