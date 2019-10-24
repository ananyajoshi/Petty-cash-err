import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'create-entry',
    templateUrl: './create-entry.component.html',
    styleUrls: ['./create-entry.component.scss']
})

export class CreateEntryComponent implements OnInit {
    @Input() public actionType: string = 'sales';
    public amount: number = 0;

    constructor(private popoverCtrl: PopoverController, private router: Router) {
    }

    ngOnInit() {
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
    }

    onAmountAdded() {
        this.popoverCtrl.dismiss({amount: this.amount});
    }
}
