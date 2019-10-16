import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {LoginUserAction} from '../actions/auth/auth.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginWithPasswordForm: FormGroup;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.loginWithPasswordForm = new FormGroup({
            uniqueKey: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.minLength(8),
                Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$')])
        });
    }

    login() {
        this.store.dispatch(new LoginUserAction(this.loginWithPasswordForm.getRawValue()));
    }

}
