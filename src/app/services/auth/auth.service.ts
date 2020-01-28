import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {BaseResponse} from '../../models/base.model';
import {Observable} from 'rxjs';
import {HttpWrapperService} from '../httpWrapper.service';
import {AuthUrls} from './auth.url';
import {LoginResponseModel, LoginWithPassword, ResetPasswordRequest, VerifyMobileModel} from '../../models/login.model';
import {BaseService} from '../base.service';
import {AppState} from '../../store/reducer';
import {Store} from '@ngrx/store';
import {ToastController} from '@ionic/angular';
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService extends BaseService {

    constructor(private _http: HttpWrapperService, protected store: Store<AppState>, protected toastController: ToastController) {
        super(store, toastController);
    }

    public LoginWithPassword(model: LoginWithPassword): Observable<BaseResponse<LoginResponseModel, LoginWithPassword>> {
        return this._http.post(AuthUrls.loginWithPassword, model).pipe(
            map((res) => {
                const data: BaseResponse<LoginResponseModel, LoginWithPassword> = res;
                data.request = model;
                // console.log(data);
                return data;
            }),
            catchError(e => this.handleCatch<LoginResponseModel, LoginWithPassword>(e, model))
        );
    }

    public ForgotPassword(userId: string): Observable<BaseResponse<string, any>> {
        return this._http.put(AuthUrls.forgotPassword.replace(':userEmail', userId), {}).pipe(map((res) => {
            const data: BaseResponse<string, any> = res;
            data.request = userId;
            return data;
        }), catchError((e) => this.handleCatch<string, any>(e)));
    }

    public LoginWithGoogle(token: string) {

        let args: any = {headers: {}};
        args.headers['cache-control'] = 'no-cache';
        args.headers['Content-Type'] = 'application/json';
        args.headers['Accept'] = 'application/json';
        args.headers['Access-Token'] = token;
        // args.headers = new HttpHeaders(args.headers);

        return this._http.get(AuthUrls.LOGIN_WITH_GOOGLE, null, {
            headers: args.headers,
            responseType: 'json'
        }).pipe(map((res) => {
            let data: BaseResponse<LoginResponseModel, string> = res as BaseResponse<LoginResponseModel, string>;
            return data;
        }), catchError((e) => this.handleCatch<LoginResponseModel, string>(e, args)));
    }

    public ResetPassword(model): Observable<BaseResponse<string, ResetPasswordRequest>> {
        return this._http.put(AuthUrls.RESET_PASSWORD, model).pipe(map((res) => {
            const data: BaseResponse<string, ResetPasswordRequest> = res;
            data.request = model;
            return data;
        }), catchError((e) => this.handleCatch<string, ResetPasswordRequest>(e)));
    }

    public VerifyNumberOTP(modele: VerifyMobileModel): Observable<BaseResponse<LoginResponseModel, VerifyMobileModel>> {
        return this._http.post(AuthUrls.VERIFY_OTP, modele).pipe(map((res) => {
            let data: BaseResponse<LoginResponseModel, VerifyMobileModel> = res;
            data.request = modele;
            return data;
        }), catchError((e) => this.handleCatch<LoginResponseModel, VerifyMobileModel>(e)));
    }
}
