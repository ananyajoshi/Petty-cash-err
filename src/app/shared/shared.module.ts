import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {DecimalDigitsDirective} from './directives/decimalDigits.directive';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        DecimalDigitsDirective
    ],
    exports: [
        CommonModule,
        IonicModule,
        DecimalDigitsDirective,
    ]
})

export class SharedModule {
}
