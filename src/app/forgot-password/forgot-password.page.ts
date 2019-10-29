import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ForgotPasswordAction, ResetPasswordAction} from '../actions/auth/auth.action';
import {ResetPasswordRequest} from '../models/login.model';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.page.html'
})
export class ForgotPasswordPage implements OnInit, OnDestroy {
    public forgotPasswordForm: FormGroup;
    public resetPasswordForm: FormGroup;

    public showResetPasswordForm: boolean = false;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {

        this.store.pipe(select(s => s.session.forgotPasswordSuccess), untilDestroyed(this)).subscribe(res => {
            this.showResetPasswordForm = res;
        });

        this.forgotPasswordForm = new FormGroup({
            userId: new FormControl('', [Validators.required])
        });

        this.resetPasswordForm = new FormGroup({
            verificationCode: new FormControl('', [Validators.required]),
            uniqueKey: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required])
        });
    }

    public forgotPassword() {
        const userId = this.forgotPasswordForm.getRawValue();
        this.resetPasswordForm.patchValue({uniqueKey: userId});
        this.store.dispatch(new ForgotPasswordAction(userId));
    }

    public resetPassword() {
        const objToSend: ResetPasswordRequest = this.resetPasswordForm.value;
        this.store.dispatch(new ResetPasswordAction(objToSend));
    }

    ngOnDestroy(): void {
    }
}
