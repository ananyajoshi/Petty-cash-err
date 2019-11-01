import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {DecimalDigitsDirective} from './directives/decimalDigits.directive';
import {MyCurrencyPipe} from './pipe/my-currency.pipe';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    declarations: [
        DecimalDigitsDirective,
        MyCurrencyPipe
    ],
    exports: [
        CommonModule,
        IonicModule,
        DecimalDigitsDirective,
        MyCurrencyPipe
    ]
})

export class SharedModule {
}
