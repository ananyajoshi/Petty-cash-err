import {ModuleWithProviders, NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffect} from './auth/auth.effect';
import {CompanyEffect} from './company/company.effect';
import {AccountEffect} from './account/account.effect';
import {EntryEffect} from './entry/entry.effect';
import {GeneralEffect} from './general/general.effect';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            AuthEffect,
            CompanyEffect,
            AccountEffect,
            EntryEffect,
            CompanyEffect,
            GeneralEffect
        ])
    ],
    exports: [EffectsModule],
    declarations: [],
    providers: [],
})
export class ActionsModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ActionsModule,
            providers: []
        };
    }
}
