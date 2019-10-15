import {Injectable} from '@angular/core';

@Injectable()
export class GeneralService {

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    private _sessionId: string;
}
