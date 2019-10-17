import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-select-action-modal',
    templateUrl: './selectAction.modal.component.html',
    styleUrls: ['./selectAction.modal.controller.scss']
})

export class SelectActionModalComponent implements OnInit {
    public actions: Array<{ icon: string, style: any, color: string, name: string }> = [
        {
            icon: 'assets/icon/sales.svg',
            style: {
                border: '2px solid #45A7E6',
                'border-bottom-width': '5px'
            },
            color: 'sales',
            name: 'Sales/Income'
        },
        {
            icon: 'assets/icon/purchase.svg',
            style: {
                border: '1px solid #F2913B',
                'border-bottom-width': '5px'
            },
            color: 'purchase',
            name: 'Purchase/Expenses'
        },
        {
            icon: 'assets/icon/withdrawal.svg',
            style: {
                border: '1px solid #67AA5A',
                'border-bottom-width': '5px'
            },
            color: 'withdrawal',
            name: 'Withdrawal/Deposit'
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
