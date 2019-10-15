import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [`./header.component.scss`]
})

export class HeaderComponent implements OnInit {
    @Input() public title: string = 'Home';
    @Input() public showSubTitle: string;
    @Input() public subTitle: string;

    constructor() {
    }

    ngOnInit() {
    }
}
