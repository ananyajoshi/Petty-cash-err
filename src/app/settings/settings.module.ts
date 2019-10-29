import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SettingPage} from './settings.page';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: SettingPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TranslateModule,
        FormsModule
    ],
    declarations: [SettingPage]
})
export class SettingPageModule {
}
