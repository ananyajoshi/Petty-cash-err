import {Action} from '@ngrx/store';
import {MessageData} from '../../models/base.model';

export enum AuthActionType {
    LoginUser = '[User] Login',
    LoginUserComplete = '[User] Login complete',
    LoginUserError = '[User] Login Error',

    LogoutUser = '[User] Logout',

    ForgotPassword = '[User] ForgotPassword',
    ForgotPasswordError = '[User] ForgotPassword Error',
    ForgotPasswordComplete = '[User] ForgotPassword Complete',

    ResetPassword = '[User] Reset Password',
    ResetPasswordComplete = '[User] Reset Password Complete',
    ResetPasswordError = '[User] Reset Password Error',

    ChangePassword = '[User] Change Password',
    ChangePasswordComplete = '[User] Change Password Complete',
    ChangePasswordError = '[User] Change Password Error',
}

export class LoginUserAction implements Action {
    readonly type = AuthActionType.LoginUser;

    constructor(public user: any) {
    }
}

export class LoginUserCompleteAction implements Action {
    readonly type = AuthActionType.LoginUserComplete;

    constructor(public user: any) {
    }
}

export class LoginUserErrorAction implements Action {
    readonly type = AuthActionType.LoginUserError;

    constructor(public errors: MessageData[]) {
    }
}

export class LogoutUserAction implements Action {
    readonly type = AuthActionType.LogoutUser;
}

export type AuthActionsUnion =
    LoginUserAction
    | LoginUserCompleteAction
    | LoginUserErrorAction
    | LogoutUserAction;
