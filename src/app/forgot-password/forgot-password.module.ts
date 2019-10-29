import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForgotPasswordPage} from './forgot-password.page';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ForgotPasswordPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [ForgotPasswordPage],
    providers: [],
})
export class ForgotPasswordModule {
}
