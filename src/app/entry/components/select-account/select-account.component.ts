import {Component, Input, OnInit} from '@angular/core';
import {IFlattenAccountsResultItem} from '../../../models/account.model';
import {PopoverController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'select-account-component',
    templateUrl: './select-account.component.html',
    styleUrls: ['./select-account.component.scss']
})

export class SelectAccountComponentComponent implements OnInit {
    @Input() public actionType: string;
    @Input() public accountList: IFlattenAccountsResultItem[] = [];
    public searchModal: string = '';

    public filteredAccounts: IFlattenAccountsResultItem[] = [];

    constructor(private popoverCtrl: PopoverController, private router: Router) {
    }

    ngOnInit() {
        this.filteredAccounts = this.accountList;
    }

    searchInputChanged() {
        this.filteredAccounts = this.accountList.filter(f => {
            return f.name.toLowerCase().includes(this.searchModal.toLowerCase()) ||
                f.uniqueName.toLowerCase().includes(this.searchModal.toLowerCase());
        });
    }

    cancelModal() {
        this.popoverCtrl.dismiss();
        this.router.navigate(['pages/home']);
    }
}
