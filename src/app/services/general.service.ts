import {Injectable} from '@angular/core';
import {UserDetails} from '../models/user.model';
import {CompanyResponse} from '../models/company.model';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GeneralService {
    public companyChangeEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get activeCompany(): CompanyResponse {
        return this._activeCompany;
    }

    set activeCompany(value: CompanyResponse) {
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
    private _activeCompany: CompanyResponse;
}
