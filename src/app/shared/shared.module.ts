import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        CommonModule,
        IonicModule,
        HeaderComponent,
    ]
})

export class SharedModule {
}
