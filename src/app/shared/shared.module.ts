import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {DecimalDigitsDirective} from './directives/decimalDigits.directive';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        HeaderComponent,
        DecimalDigitsDirective
    ],
    exports: [
        CommonModule,
        IonicModule,
        HeaderComponent,
        DecimalDigitsDirective,
    ]
})

export class SharedModule {
}
