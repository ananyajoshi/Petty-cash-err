import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
    selector: 'no-company-data',
    templateUrl: './no-company-modal.component.html',
    styleUrls: ['./no-company-modal.component.scss']
})

export class NoCompanyModalComponent implements OnInit {
    constructor(private router: Router, private popoverController: PopoverController) {
    }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['login']);
        this.popoverController.dismiss();
    }
}
