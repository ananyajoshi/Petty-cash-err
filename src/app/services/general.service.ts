import {Injectable} from '@angular/core';
import {UserDetails} from '../models/user.model';

@Injectable()
export class GeneralService {
    get activeCompany(): string {
        return this._activeCompany;
    }

    set activeCompany(value: string) {
        this._activeCompany = value;
    }
    get user(): UserDetails {
        return this._user;
    }

    set user(value: UserDetails) {
        this._user = value;
    }

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    private _sessionId: string;
    private _user: UserDetails;
    private _activeCompany: string;
}
