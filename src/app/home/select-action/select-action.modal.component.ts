import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';
import {EntryTypes} from '../../models/entry.model';

@Component({
    selector: 'app-select-action-modal',
    templateUrl: './select-action.modal.component.html',
    styleUrls: ['./select-action.modal.controller.scss']
})

export class SelectActionModalComponent implements OnInit {
    public actions: Array<{ icon: string, style: any, color: string, name: string, type: EntryTypes }> = [
        {
            icon: 'assets/icon/sales.svg',
            style: {
                border: '2px solid #45A7E6',
                'border-bottom-width': '5px'
            },
            color: 'sales',
            name: 'Sales/Income',
            type: EntryTypes.sales
        },
        {
            icon: 'assets/icon/expense.svg',
            style: {
                border: '1px solid #F2913B',
                'border-bottom-width': '5px'
            },
            color: 'expense',
            name: 'Purchase/Expenses',
            type: EntryTypes.expense
        },
        {
            icon: 'assets/icon/deposit.svg',
            style: {
                border: '1px solid #67AA5A',
                'border-bottom-width': '5px'
            },
            color: 'deposit',
            name: 'Withdrawal/Deposit',
            type: EntryTypes.deposit
        },
    ];

    constructor(private router: Router, private popover: PopoverController) {
    }

    ngOnInit() {
    }

    actionSelected(item) {
        this.popover.dismiss(item);
    }
}
