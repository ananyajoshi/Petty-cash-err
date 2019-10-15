import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {Actions} from '@ngrx/effects';

import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {AppState} from '../../store/reducer';


@Injectable()
export class LoginEffect {

    constructor(private actions$: Actions, private loginService: AuthService, private store: Store<AppState>,
                private generalService: GeneralService, private router: Router) {
    }

    // @Effect()
    // LoginUser$: Observable<Action> = this.actions$.pipe(
    //     ofType<LoginUserAction>(AuthActionType.LoginUser),
    //     switchMap((s) => {
    //         return this.loginService.Login(s.user)
    //             .pipe(
    //                 map((res: BaseResponse<LoginResponse, Login>) => {
    //                     if (res.hasError) {
    //                         this.generalService.showErrorNotification(res.errors[0].message);
    //                         return new LoginUserErrorAction(res.errors);
    //                     }
    //                     return new LoginUserCompleteAction(res.data);
    //                 }),
    //                 catchError((res) => {
    //                     this.generalService.showErrorNotification(res.errors[0].message);
    //                     return of(new LoginUserErrorAction(res.errors));
    //                 })
    //             );
    //     })
    // );
    //
    // @Effect()
    // loginUserComplete$: Observable<any> = this.actions$.pipe(
    //     ofType<LoginUserCompleteAction>(AuthActionType.LoginUserComplete),
    //     switchMap((s) => {
    //         this.generalService.token = s.user.token;
    //         this.generalService.user = s.user.user;
    //         const userResponse: BaseResponse<UserProfile, string> = new BaseResponse();
    //         userResponse.data = s.user.user;
    //         this.router.navigate(['/pages/dashboard']);
    //         return this.loginService.GetProfileImage().pipe(map(p => {
    //             return new SetUserProfilePicture(p);
    //         }));
    //
    //
    //     })
    // );
    //
    // @Effect({dispatch: false})
    // LogoutUser$: Observable<void> = this.actions$.pipe(
    //     ofType<LogoutUserAction>(AuthActionType.LogoutUser),
    //     pipe(map((p) => {
    //         this.router.navigate(['/home']);
    //     }))
    // );
}
