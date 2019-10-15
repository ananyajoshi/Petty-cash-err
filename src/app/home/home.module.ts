import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {SharedModule} from '../shared/shared.module';
import {SelectActionModalComponent} from './selectAction/selectAction.modal.component';

@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage, SelectActionModalComponent],
    entryComponents: [SelectActionModalComponent]
})
export class HomePageModule {
}
