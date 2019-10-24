import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'balance-view',
    templateUrl: './balance-view.component.html',
    styleUrls: ['./balance-view.component.scss']
})

export class BalanceViewComponent implements OnInit {
    @Input() public actionType: string = 'sales';
    public amount: number = 0;

    constructor(private popoverCtrl: PopoverController, private router: Router) {
    }

    ngOnInit() {
    }

    cancelModal() {
        this.router.navigate(['pages/home/select-action']);
        this.popoverCtrl.dismiss();
    }

    onAmountAdded() {
        this.popoverCtrl.dismiss({amount: this.amount});
    }
}
