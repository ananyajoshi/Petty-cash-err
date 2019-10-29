import {createUrl} from '../base.url';

export const AuthUrls = {
    loginWithPassword: createUrl('v2/login-with-password'),
    forgotPassword: createUrl('users/:userEmail/forgot-password'),
    RESET_PASSWORD: createUrl('reset-password')
};
