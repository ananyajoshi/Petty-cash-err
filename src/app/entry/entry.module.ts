import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EntryPage} from './entry.page';
import {SharedModule} from '../shared/shared.module';
import {AddAmountComponent} from './components/add-amount/add-amount.component';
import {FormsModule} from '@angular/forms';
import {SelectAccountComponentComponent} from './components/select-account/select-account.component';

const routes: Routes = [
    {
        path: '',
        component: EntryPage,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
    declarations: [EntryPage, AddAmountComponent, SelectAccountComponentComponent],
    entryComponents: [AddAmountComponent, SelectAccountComponentComponent]
})
export class EntryPageModule {
}
