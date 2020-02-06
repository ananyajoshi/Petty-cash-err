import {Action} from '@ngrx/store';
import {LoginResponseModel, LoginWithPassword, ResetPasswordRequest, VerifyMobileModel} from '../../models/login.model';

export enum AuthActionType {
    LoginUser = '[User] Login',
    LoginUserComplete = '[User] Login complete',
    LoginUserError = '[User] Login Error',

    GoogleSignIn = '[User] GoogleSignIn',
    GoogleSignInComplete = '[User] GoogleSignIn complete',
    GoogleSignInError = '[User] GoogleSignIn Error',

    TwoWayAuthentication = '[User] Two Way Authentication',
    TwoWayAuthenticationComplete = '[User] Two Way Authentication complete',
    TwoWayAuthenticationError = '[User] Two Way Authentication Error',

    LogoutUser = '[User] Logout',

    SetActiveCompany = '[User] Set Active Company',
    SetActiveLanguage = '[User] Set Active Language',

    ForgotPassword = '[User] ForgotPassword',
    ForgotPasswordError = '[User] ForgotPassword Error',
    ForgotPasswordComplete = '[User] ForgotPassword Complete',

    ResetPassword = '[User] Reset Password',
    ResetPasswordComplete = '[User] Reset Password Complete',
    ResetPasswordError = '[User] Reset Password Error',

    ResetStoreFlags = '[User] Reset Store Flags',

    ChangePassword = '[User] Change Password',
    ChangePasswordComplete = '[User] Change Password Complete',
    ChangePasswordError = '[User] Change Password Error',
}

export class LoginUserAction implements Action {
    readonly type = AuthActionType.LoginUser;

    constructor(public request: LoginWithPassword) {
    }
}

export class LoginUserCompleteAction implements Action {
    readonly type = AuthActionType.LoginUserComplete;

    constructor(public result: LoginResponseModel) {
    }
}

export class LoginUserErrorAction implements Action {
    readonly type = AuthActionType.LoginUserError;

    constructor(public errors: string) {
    }
}


export class GoogleSignInAction implements Action {
    readonly type = AuthActionType.GoogleSignIn;

    constructor(public request: string) {
    }
}

export class GoogleSignInCompleteAction implements Action {
    readonly type = AuthActionType.GoogleSignInComplete;

    constructor(public result: LoginResponseModel) {
    }
}

export class GoogleSignInErrorAction implements Action {
    readonly type = AuthActionType.GoogleSignInError;

    constructor(public errors: string) {
    }
}


export class TwoWayAuthenticationAction implements Action {
    readonly type = AuthActionType.TwoWayAuthentication;

    constructor(public request: VerifyMobileModel) {
    }
}

export class TwoWayAuthenticationCompleteAction implements Action {
    readonly type = AuthActionType.TwoWayAuthenticationComplete;

    constructor(public result: LoginResponseModel) {
    }
}

export class TwoWayAuthenticationErrorAction implements Action {
    readonly type = AuthActionType.TwoWayAuthenticationError;

    constructor(public errors: string) {
    }
}

export class ForgotPasswordAction implements Action {
    readonly type = AuthActionType.ForgotPassword;

    constructor(public userId: string) {
    }
}

export class ForgotPasswordSuccessAction implements Action {
    readonly type = AuthActionType.ForgotPasswordComplete;

    constructor(public response: string) {
    }
}

export class ForgotPasswordErrorAction implements Action {
    readonly type = AuthActionType.ForgotPasswordError;

    constructor(public error: string) {
    }
}

export class ResetPasswordAction implements Action {
    readonly type = AuthActionType.ResetPassword;

    constructor(public req: ResetPasswordRequest) {
    }
}

export class ResetPasswordSuccessAction implements Action {
    readonly type = AuthActionType.ResetPasswordComplete;

    constructor(public response: string) {
    }
}

export class ResetPasswordErrorAction implements Action {
    readonly type = AuthActionType.ResetPasswordError;

    constructor(public error: string) {
    }
}

export class ResetStoreFlags implements Action {
    readonly type = AuthActionType.ResetStoreFlags;

    constructor() {
    }
}

export class SetActiveCompanyAction implements Action {
    readonly type = AuthActionType.SetActiveCompany;

    constructor(public uniqueName: string) {
    }
}

export class SetActiveLanguage implements Action {
    readonly type = AuthActionType.SetActiveLanguage;

    constructor(public lang: string) {
    }
}

export class LogoutUserAction implements Action {
    readonly type = AuthActionType.LogoutUser;
}

export type AuthActionsUnion =
    LoginUserAction
    | LoginUserCompleteAction
    | LoginUserErrorAction
    | TwoWayAuthenticationAction
    | TwoWayAuthenticationCompleteAction
    | TwoWayAuthenticationErrorAction
    | GoogleSignInAction
    | GoogleSignInCompleteAction
    | GoogleSignInErrorAction
    | ForgotPasswordAction
    | ForgotPasswordSuccessAction
    | ForgotPasswordErrorAction
    | ResetPasswordAction
    | ResetPasswordSuccessAction
    | ResetPasswordErrorAction
    | SetActiveCompanyAction
    | SetActiveLanguage
    | LogoutUserAction
    | ResetStoreFlags;
