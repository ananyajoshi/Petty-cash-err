import {AuthActionsUnion, AuthActionType} from '../actions/auth/auth.action';
import {LoginResponseModel} from '../models/login.model';

export interface SessionState {
    data: LoginResponseModel;
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
    isLoginWithPasswordInProcess: false,
    selectedLanguage: 'en',
    forgotPasswordInProcess: false,
    forgotPasswordSuccess: false,
    resetPasswordInProcess: false,
    resetPasswordSuccess: false
};


export function SessionReducer(state: SessionState = initialState, action: AuthActionsUnion) {
    switch (action.type) {
        case AuthActionType.LoginUser: {
            return {
                ...state,
                isLoginWithPasswordInProcess: true,
                data: null
            };
        }

        case AuthActionType.LoginUserComplete: {
            return {
                ...state,
                isLoginWithPasswordInProcess: false,
                data: action.result
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
