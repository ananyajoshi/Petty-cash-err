import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {LoginUserAction} from '../actions/auth/auth.action';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    public loginWithPasswordForm: FormGroup;
    private loader: HTMLIonLoadingElement;

    constructor(private store: Store<AppState>, private router: Router, private _loaderCtrl: LoadingController) {
    }

    ngOnInit() {
        this.loginWithPasswordForm = new FormGroup({
            uniqueKey: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8),
                Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$')])
        });

        this.store.pipe(select(state => state.session.isLoginWithPasswordInProcess), untilDestroyed(this)).subscribe(res => {
            if (!res && this.loader) {
               this.loader.dismiss();
            }
        });
    }

    async login() {
        this.loader = await this._loaderCtrl.create({
            message: 'Checking Info...'
        });
        await this.loader.present();
        this.store.dispatch(new LoginUserAction(this.loginWithPasswordForm.getRawValue()));
    }

    forgotPassword() {
        this.router.navigate(['forgot-password']);
    }

    ngOnDestroy(): void {
    }
}
