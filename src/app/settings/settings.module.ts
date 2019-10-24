import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SettingPage} from './settings.page';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

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
        ReactiveFormsModule
    ],
    declarations: [SettingPage]
})
export class SettingPageModule {
}
