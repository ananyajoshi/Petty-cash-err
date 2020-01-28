import {createUrl} from '../base.url';

export const AuthUrls = {
    loginWithPassword: createUrl('v2/login-with-password'),
    forgotPassword: createUrl('users/:userEmail/forgot-password'),
    RESET_PASSWORD: createUrl('reset-password'),
    VERIFY_OTP: createUrl('v2/verify-number'),
    LOGIN_WITH_GOOGLE: createUrl('v2/signup-with-google'),
};
