import {UserDetails} from './user.model';

export class LoginWithPassword {
    uniqueKey: string;
    password: string;
}

export interface Session {
    id: string;
    expiresAt: string;
    createdAt: string;
}

export class LoginResponseModel {
    public user: UserDetails;
    public isNewUser: boolean;
    public session?: Session;
    public intercomHash?: string;
// this below field will be returned when we have two way authentication enabled.
    public contactNumber: string;
    public countryCode: string;
    public statusCode: string;
    public text: string;
}

export class ResetPasswordRequest {
    verificationCode: string;
    uniqueKey: string;
    newPassword: string;
}

export class VerifyMobileModel {
    public mobileNumber: string;
    public countryCode: number = 91;
    public oneTimePassword: string;
}