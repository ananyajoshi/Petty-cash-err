import {Component, OnInit} from '@angular/core';
import {GeneralService} from '../services/general.service';
import {CompanyResponse} from '../models/company.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.page.html',
    styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
    public activeCompany: CompanyResponse;

    constructor(private _generalService: GeneralService) {
    }

    ngOnInit() {
        this.activeCompany = this._generalService.activeCompany;
    }

}
