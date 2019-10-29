import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {SharedModule} from '../shared/shared.module';
import {SelectActionModalComponent} from './select-action/select-action.modal.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        TranslateModule
    ],
    declarations: [HomePage, SelectActionModalComponent],
    entryComponents: [SelectActionModalComponent]
})
export class HomePageModule {
}
