import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {GoogleSignInAction, LoginUserAction, TwoWayAuthenticationAction} from '../actions/auth/auth.action';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {LoginResponseModel, VerifyMobileModel} from "../models/login.model";
import {skip, take} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    public loginWithPasswordForm: FormGroup;
    public twoWayAtuthenticationForm: FormGroup;
    private loader: HTMLIonLoadingElement;
    public isTwoWayAuthenticationInProgress: boolean = false;
    private isTwoWayAuthenticationSuccess: boolean;

    constructor(private alertController: AlertController, private store: Store<AppState>, private router: Router, private _loaderCtrl: LoadingController, private _cdrf: ChangeDetectorRef, private ngZone: NgZone) {
    }

    ngOnInit() {
        this.loginWithPasswordForm = new FormGroup({
            uniqueKey: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8),
                Validators.maxLength(20), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,20}$')])
        });
        this.twoWayAtuthenticationForm = new FormGroup({
            otp: new FormControl('', [Validators.required])
        });
        this.store.pipe(select(state => state.session.isLoginWithPasswordInProcess), untilDestroyed(this)).subscribe(res => {
            if (!res && this.loader) {
                this.loader.dismiss();
            }
        });

        this.store.pipe(select(state => state.session.isTwoWayAuthenticationInProgress), untilDestroyed(this)).subscribe(res => {
            this.isTwoWayAuthenticationInProgress = res;
            this._cdrf.detectChanges();
        });

        this.store.pipe(select(state => state.session.isTwoWayAuthenticationSuccess), untilDestroyed(this)).subscribe(res => {
            this.isTwoWayAuthenticationSuccess = res;
            this._cdrf.detectChanges();
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

    async verifyTwoWayCode() {
        this.loader = await this._loaderCtrl.create({
            message: 'authenticating otp...'
        });
        await this.loader.present();
        let user: LoginResponseModel;
        // this.userDetails$.pipe(take(1)).subscribe(p => user = p);
        this.store.pipe(select(state => state.session.data), untilDestroyed(this), take(1)).subscribe((p: LoginResponseModel) => user = p);

        let data = new VerifyMobileModel();
        data.countryCode = Number(user.countryCode);
        data.mobileNumber = user.contactNumber;
        data.oneTimePassword = this.twoWayAtuthenticationForm.value.otp;
        this.store.dispatch(new TwoWayAuthenticationAction(data));
        this.store.pipe(select(state => state.session.isTwoWayAuthenticationSuccess), untilDestroyed(this), skip(2), take(1)).subscribe(p => {
            // if (p) {
            this.loader.dismiss();
            // }
        })
    }

    async presentAlert() {

    }


    loginWithGoogle() {
        // const alert = await this.alertController.create({
        //     header: 'Alert',
        //     subHeader: 'Subtitle',
        //     message: 'This is an alert message.',
        //     buttons: ['OK']
        // });
        //
        // await alert.present();
        this.ngZone.run(
            () => {
                (window as any).plugins.googleplus.login(
                    {
                        'scopes': 'email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                        'webClientId': environment.google_client_id,
                        'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                    },
                    (obj) => {
                        this.store.dispatch(new GoogleSignInAction(obj.accessToken));
                        // console.log((JSON.stringify(obj))); // do something useful instead of alerting
                    },
                    (msg) => {
                        console.log(('error: ' + msg));
                    }
                );
            });
    }
}
