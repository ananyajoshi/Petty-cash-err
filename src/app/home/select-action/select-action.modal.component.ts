import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'app-select-action-modal',
    templateUrl: './select-action.modal.component.html',
    styleUrls: ['./select-action.modal.controller.scss']
})

export class SelectActionModalComponent implements OnInit {
    public actions: Array<{ icon: string, style: any, color: string, name: string, path: string }> = [
        {
            icon: 'assets/icon/sales.svg',
            style: {
                border: '2px solid #45A7E6',
                'border-bottom-width': '5px'
            },
            color: 'sales',
            name: 'Sales/Income',
            path: '/entry/sales'
        },
        {
            icon: 'assets/icon/purchase.svg',
            style: {
                border: '1px solid #F2913B',
                'border-bottom-width': '5px'
            },
            color: 'purchase',
            name: 'Purchase/Expenses',
            path: '/entry/purchase'
        },
        {
            icon: 'assets/icon/withdrawal.svg',
            style: {
                border: '1px solid #67AA5A',
                'border-bottom-width': '5px'
            },
            color: 'withdrawal',
            name: 'Withdrawal/Deposit',
            path: '/entry/withdrawal'
        },
    ];

    constructor(private router: Router, private popover: PopoverController) {
    }

    ngOnInit() {
    }

    actionSelected(item) {
        this.popover.dismiss({path: item.path});
    }
}
