import {Injectable} from '@angular/core';

import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {AppState} from '../../store/reducer';
import {Observable, of} from 'rxjs';
import {AuthActionType, LoginUserAction, LoginUserCompleteAction, LoginUserErrorAction} from './auth.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BaseResponse} from '../../models/base.model';
import {LoginResponseModel, LoginWithPassword} from '../../models/login.model';


@Injectable()
export class AuthEffect {

    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>,
                private generalService: GeneralService, private router: Router) {
    }

    @Effect()
    LoginUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUserAction>(AuthActionType.LoginUser),
        switchMap((s) => {
            return this.authService.LoginWithPassword(s.request)
                .pipe(
                    map((res: BaseResponse<LoginResponseModel, LoginWithPassword>) => {
                        if (res.status !== 'success') {
                            // this.generalService.showErrorNotification(res.errors[0].message);
                            return new LoginUserErrorAction(res.message);
                        }
                        return new LoginUserCompleteAction(res.body);
                    }),
                    catchError((res) => {
                        // this.generalService.showErrorNotification(res.errors[0].message);
                        return of(new LoginUserErrorAction(res.message));
                    })
                );
        })
    );

    //
    @Effect()
    loginUserComplete$: Observable<any> = this.actions$.pipe(
        ofType<LoginUserCompleteAction>(AuthActionType.LoginUserComplete),
        switchMap((s) => {
            this.generalService.sessionId = s.result.session.id;
            this.generalService.user = s.result.user;
            this.router.navigate(['/pages/home']);
            return of();
        })
    );

    //
    // @Effect({dispatch: false})
    // LogoutUser$: Observable<void> = this.actions$.pipe(
    //     ofType<LogoutUserAction>(AuthActionType.LogoutUser),
    //     pipe(map((p) => {
    //         this.router.navigate(['/home']);
    //     }))
    // );
}
