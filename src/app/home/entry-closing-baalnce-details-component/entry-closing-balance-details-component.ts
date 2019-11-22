import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EntryReportItem} from '../../models/entry.model';

@Component({
    selector: 'entry-closing-balance-details',
    templateUrl: './entry-closing-balance-details-component.html',
    styleUrls: ['./entry-closing-balance-details-component.scss']
})

export class EntryClosingBalanceDetailsComponent implements OnInit, OnDestroy {
    @Input() public entryReportItem: EntryReportItem;

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
