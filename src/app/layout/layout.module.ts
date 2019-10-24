import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LayoutPage} from './layout.page';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutPage,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
            },
            {path: 'entry/:type', loadChildren: () => import('../entry/entry.module').then(m => m.EntryPageModule)},
            {
                path: 'setting', loadChildren: () => import('../settings/settings.module').then(m => m.SettingPageModule)
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [LayoutPage],
    providers: []
})
export class LayoutPageModule {
}
