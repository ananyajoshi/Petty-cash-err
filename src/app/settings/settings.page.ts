import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';

@Component({
    selector: 'app-setting',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingPage implements OnInit {
    customPopoverOptions: any = {
        header: 'Hair Color',
        subHeader: 'Select your hair color',
        message: 'Only select your dominant hair color'
      };
    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
 
    }



}
