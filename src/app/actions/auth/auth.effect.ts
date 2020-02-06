import {Injectable} from '@angular/core';

import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {AppState} from '../../store/reducer';
import {Observable, of} from 'rxjs';
import {
    AuthActionType,
    ForgotPasswordAction,
    ForgotPasswordErrorAction,
    ForgotPasswordSuccessAction, GoogleSignInAction, GoogleSignInCompleteAction, GoogleSignInErrorAction,
    LoginUserAction,
    LoginUserCompleteAction,
    LoginUserErrorAction,
    LogoutUserAction,
    ResetPasswordAction,
    ResetPasswordErrorAction,
    ResetPasswordSuccessAction,
    SetActiveCompanyAction,
    TwoWayAuthenticationAction,
    TwoWayAuthenticationCompleteAction,
    TwoWayAuthenticationErrorAction
} from './auth.action';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {BaseResponse} from '../../models/base.model';
import {LoginResponseModel, LoginWithPassword, ResetPasswordRequest, VerifyMobileModel} from '../../models/login.model';
import {CompanyResponse} from '../../models/company.model';
import {GetFlattenAccountAction} from '../account/account.action';
import {GetCurrenciesAction} from '../company/company.action';
import {LoadingController, ToastController} from '@ionic/angular';


@Injectable()
export class AuthEffect {

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>,
                private generalService: GeneralService, private router: Router, protected toastController: ToastController) {
    }

    @Effect()
    LoginUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUserAction>(AuthActionType.LoginUser),
        switchMap((s) => {
            return this.authService.LoginWithPassword(s.request)
                .pipe(
                    map((res: BaseResponse<LoginResponseModel, LoginWithPassword>) => {
                        if (res.status !== 'success') {
                            return new LoginUserErrorAction(res.message);
                        }
                        if (res.status === "success") {
                            if (res.body.statusCode === "AUTHENTICATE_TWO_WAY") {
                                if (res.body.text) {
                                    const toast = this.toastController.create({
                                        message: res.body.text,
                                        animated: true,
                                        color: 'danger',
                                        showCloseButton: true,
                                        position: 'top',
                                        duration: 3000
                                    }).then(t => {
                                        t.present();
                                    });
                                }
                            }
                            return new LoginUserCompleteAction(res.body);
                        }
                        return new LoginUserErrorAction(res.message || 'Something went Wrong!');
                    }),
                    catchError((res) => {
                        return of(new LoginUserErrorAction(res.message || 'Something went Wrong!'));
                    })
                );
        })
    );


    //
    @Effect()
    loginUserComplete$: Observable<any> = this.actions$.pipe(
        ofType<LoginUserCompleteAction>(AuthActionType.LoginUserComplete),
        switchMap((s) => {
            if (s.result.statusCode !== "AUTHENTICATE_TWO_WAY") {
                this.generalService.sessionId = s.result.session.id;
                this.generalService.user = s.result.user;
                this.router.navigate(['/pages/home']);
            }
            return of();
        })
    );


    @Effect()
    twoWayAuthenticationComplete$: Observable<any> = this.actions$.pipe(
        ofType<TwoWayAuthenticationCompleteAction>(AuthActionType.TwoWayAuthenticationComplete),
        switchMap((s) => {
            this.generalService.sessionId = s.result.session.id;
            this.generalService.user = s.result.user;
            this.router.navigate(['/pages/home']);

            return of();
        })
    );


    @Effect()
    twoWayAuthentication$: Observable<Action> = this.actions$.pipe(
        ofType<TwoWayAuthenticationAction>(AuthActionType.TwoWayAuthentication),
        switchMap((s) => {
            return this.authService.VerifyNumberOTP(s.request)
                .pipe(
                    map((res: BaseResponse<LoginResponseModel, VerifyMobileModel>) => {
                        if (res.status !== 'success') {
                            return new TwoWayAuthenticationErrorAction(res.message);
                        }
                        return new TwoWayAuthenticationCompleteAction(res.body);

                    }),
                    catchError((res) => {
                        return of(new TwoWayAuthenticationErrorAction(res.message || 'Something went Wrong!'));
                    })
                );
        })
    );


    @Effect()
    forgotPassword$: Observable<Action> = this.actions$.pipe(
        ofType<ForgotPasswordAction>(AuthActionType.ForgotPassword),
        switchMap((s) => {
            return this.authService.ForgotPassword(s.userId)
                .pipe(
                    map((res: BaseResponse<string, string>) => {
                        if (res.status !== 'success') {
                            return new ForgotPasswordErrorAction(res.message);
                        }
                        const toast = this.toastController.create({
                            message: res.body,
                            animated: true,
                            color: 'success',
                            showCloseButton: true,
                            position: 'top',
                            duration: 3000
                        }).then(t => {
                            t.present();
                        });
                        return new ForgotPasswordSuccessAction(res.body);
                    }),
                    catchError((res) => {
                        return of(new ForgotPasswordErrorAction(res.message));
                    })
                );
        })
    );


    @Effect()
    signInWithGoogle$: Observable<Action> = this.actions$.pipe(
        ofType<GoogleSignInAction>(AuthActionType.GoogleSignIn),
        switchMap((s) => {
            return this.authService.LoginWithGoogle(s.request)
                .pipe(
                    map((res: BaseResponse<LoginResponseModel, string>) => {
                        if (res.status !== 'success') {
                            return new LoginUserErrorAction(res.message);
                        }
                        if (res.status === "success") {
                            if (res.body.statusCode === "AUTHENTICATE_TWO_WAY") {
                                if (res.body.text) {
                                    const toast = this.toastController.create({
                                        message: res.body.text,
                                        animated: true,
                                        color: 'danger',
                                        showCloseButton: true,
                                        position: 'top',
                                        duration: 3000
                                    }).then(t => {
                                        t.present();
                                    });
                                }
                            }
                            return new GoogleSignInCompleteAction(res.body);
                        }
                        return new GoogleSignInErrorAction(res.message || 'Something went Wrong!');
                    }),
                    catchError((res) => {
                        return of(new GoogleSignInErrorAction(res.message));
                    })
                );
        })
    );

    @Effect()
    resetPassword$: Observable<Action> = this.actions$.pipe(
        ofType<ResetPasswordAction>(AuthActionType.ResetPassword),
        switchMap((s) => {
            return this.authService.ResetPassword(s.req)
                .pipe(
                    map((res: BaseResponse<string, ResetPasswordRequest>) => {
                        if (res.status !== 'success') {
                            return new ResetPasswordErrorAction(res.message);
                        }
                        const toast = this.toastController.create({
                            message: res.body,
                            animated: true,
                            color: 'success',
                            showCloseButton: true,
                            position: 'top',
                            duration: 3000
                        }).then(t => {
                            t.present();
                        });
                        return new ResetPasswordSuccessAction(res.body);
                    }),
                    catchError((res) => {
                        return of(new ResetPasswordErrorAction(res.message));
                    })
                );
        })
    );

    @Effect()
    resetPasswordComplete$: Observable<any> = this.actions$.pipe(
        ofType<ResetPasswordSuccessAction>(AuthActionType.ResetPasswordComplete),
        switchMap((s) => {
            this.router.navigate(['login']);
            return of();
        })
    );

    @Effect()
    switchCompany$: Observable<any> = this.actions$.pipe(
        ofType<SetActiveCompanyAction>(AuthActionType.SetActiveCompany),
        switchMap(res => {
            let companies: CompanyResponse[] = [];
            this.store.pipe(take(1), select(s => s.company.companies)).subscribe(data => {
                companies = data;
            });
            this.generalService.activeCompany = {...companies.find(f => f.uniqueName === res.uniqueName)};
            this.generalService.companyChangeEvent.next(true);
            this.store.dispatch(new GetCurrenciesAction());
            return of(new GetFlattenAccountAction());
        })
    );

    //
    @Effect({dispatch: false})
    LogoutUser$: Observable<void> = this.actions$.pipe(
        ofType<LogoutUserAction>(AuthActionType.LogoutUser),
        map((p) => {
            this.generalService.sessionId = null;
            this.generalService.user = null;
            this.generalService.activeCompany = null;
            this.router.navigate(['/login']);
        })
    );
}
