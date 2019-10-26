import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EntryPage} from './entry.page';
import {SharedModule} from '../shared/shared.module';
import {AddAmountComponent} from './components/add-amount/add-amount.component';
import {FormsModule} from '@angular/forms';
import {SelectAccountComponentComponent} from './components/select-account/select-account.component';
import {CreateEntryComponent} from './components/create-entry/create-entry.component';
import {PaymentModeComponent} from './components/payment-mode/payment-mode.component';
import {SelectDebtorCreditorComponent} from './components/select-debtor-creditor/select-debtor-creditor.component';
import {SelectWithdrawalDepositAccountComponent} from './components/select-withdrawal-deposit-account/select-withdrawal-deposit-account.component';

const routes: Routes = [
    {
        path: '',
        component: EntryPage,
        pathMatch: 'full'
    },
    {
        path: 'create',
        component: CreateEntryComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    declarations: [EntryPage, AddAmountComponent, SelectAccountComponentComponent, CreateEntryComponent,
        PaymentModeComponent, SelectDebtorCreditorComponent, SelectWithdrawalDepositAccountComponent],
    entryComponents: [AddAmountComponent, SelectAccountComponentComponent, PaymentModeComponent, SelectDebtorCreditorComponent,
        SelectWithdrawalDepositAccountComponent]
})
export class EntryPageModule {
}
