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
}

export class ResetPasswordRequest {
    verificationCode: string;
    uniqueKey: string;
    newPassword: string;
}
