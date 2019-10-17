import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'select-account-component',
    templateUrl: './select-account.component.html',
    styleUrls: ['./select-account.component.scss']
})

export class SelectAccountComponentComponent implements OnInit {
    @Input() public actionType: string;
    @Input() public accountList

    constructor() {
    }

    ngOnInit() {
    }
}
