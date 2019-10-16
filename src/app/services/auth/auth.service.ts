import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {BaseResponse} from '../../models/base.model';
import {Observable} from 'rxjs';
import {HttpWrapperService} from '../httpWrapper.service';
import {AuthUrls} from './auth.url';
import {LoginResponseModel, LoginWithPassword} from '../../models/login.model';
import {BaseService} from '../base.service';
import {AppState} from '../../store/reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthService extends BaseService {

    constructor(private _http: HttpWrapperService, protected store: Store<AppState>) {
        super(store);
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
}
