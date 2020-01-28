import {AuthActionsUnion, AuthActionType} from '../actions/auth/auth.action';
import {LoginResponseModel} from '../models/login.model';

export interface SessionState {
    data: LoginResponseModel;

    isTwoWayAuthenticationInProgress: boolean;
    isTwoWayAuthenticationSuccess: boolean;
    isLoginWithPasswordInProcess: boolean;

    activeCompany: string;
    selectedLanguage: string;

    forgotPasswordInProcess: boolean;
    forgotPasswordSuccess: boolean;
    resetPasswordInProcess: boolean;
    resetPasswordSuccess: boolean;
}

const initialState: SessionState = {
    activeCompany: '',
    data: null,
    isTwoWayAuthenticationInProgress: false,
    isTwoWayAuthenticationSuccess: false,
    isLoginWithPasswordInProcess: false,
    selectedLanguage: 'en',
    forgotPasswordInProcess: false,
    forgotPasswordSuccess: false,
    resetPasswordInProcess: false,
    resetPasswordSuccess: false
};


export function SessionReducer(state: SessionState = initialState, action: AuthActionsUnion) {
    switch (action.type) {
        case AuthActionType.GoogleSignIn:
        case AuthActionType.LoginUser: {
            return {
                ...state,
                isLoginWithPasswordInProcess: true,
                isTwoWayAuthenticationInProgress: false,
                isTwoWayAuthenticationSuccess: false,
                data: null
            };
        }
        case AuthActionType.GoogleSignInComplete:
        case AuthActionType.LoginUserComplete: {
            if (action.result.statusCode === "AUTHENTICATE_TWO_WAY") {
                return {
                    ...state,
                    isLoginWithPasswordInProcess: false,
                    isTwoWayAuthenticationInProgress: true,
                    isTwoWayAuthenticationSuccess: false,
                    data: action.result
                };
            }
            return {
                ...state,
                isLoginWithPasswordInProcess: false,
                isTwoWayAuthenticationInProgress: false,
                data: action.result
            };
        }

        case AuthActionType.TwoWayAuthentication: {
            return {
                ...state,
                isLoginWithPasswordInProcess: true,
                isTwoWayAuthenticationInProgress: true,
                isTwoWayAuthenticationSuccess: false,
            };
        }

        case AuthActionType.TwoWayAuthenticationComplete: {

            return {
                ...state,
                isLoginWithPasswordInProcess: false,
                isTwoWayAuthenticationInProgress: false,
                isTwoWayAuthenticationSuccess: true,
                data: action.result
            };
        }
        case AuthActionType.TwoWayAuthenticationError: {
            return {
                ...state,
                isLoginWithPasswordInProcess: false,
                isTwoWayAuthenticationInProgress: true,
                isTwoWayAuthenticationSuccess: false,
            };
        }

        case AuthActionType.ForgotPassword:
            return {
                ...state,
                forgotPasswordInProcess: true,
                forgotPasswordSuccess: false
            };

        case AuthActionType.ForgotPasswordComplete: {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordInProcess: false
            };
        }

        case AuthActionType.ForgotPasswordError: {
            return {
                ...state,
                forgotPasswordInProcess: false,
                forgotPasswordSuccess: false
            };
        }

        case AuthActionType.ResetPassword: {
            return {
                ...state,
                resetPasswordInProcess: true,
                forgotPasswordSuccess: false
            };
        }

        case AuthActionType.ResetPasswordComplete: {
            return {
                ...state,
                resetPasswordInProcess: false,
                resetPasswordSuccess: true
            };
        }

        case AuthActionType.ResetPasswordError: {
            return {
                ...state,
                resetPasswordInProcess: false,
                resetPasswordSuccess: false
            };
        }

        case AuthActionType.SetActiveCompany: {
            return {
                ...state,
                activeCompany: action.uniqueName
            };
        }

        case AuthActionType.SetActiveLanguage: {
            return {
                ...state,
                selectedLanguage: action.lang
            };
        }

        case AuthActionType.LogoutUser: {
            return initialState;
        }
        case AuthActionType.GoogleSignInError:
        case AuthActionType.LoginUserError: {
            return initialState;
        }

        case AuthActionType.ResetStoreFlags: {
            return initialState;
        }

        default:
            return state;
    }
}
