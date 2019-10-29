import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, PopoverController} from '@ionic/angular';

@Component({
    selector: 'no-company-data',
    templateUrl: './no-company-modal.component.html',
    styleUrls: ['./no-company-modal.component.scss']
})

export class NoCompanyModalComponent implements OnInit {
    @Input() public email: string;
    constructor(private router: Router, private modalController: ModalController) {
    }

    ngOnInit() {
    }

    login() {
        this.router.navigate(['login']);
        this.modalController.dismiss();
    }
}
