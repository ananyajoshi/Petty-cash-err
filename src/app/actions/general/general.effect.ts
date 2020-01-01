import {Injectable} from '@angular/core';
import {HttpWrapperService} from '../../services/httpWrapper.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {GeneralActionType, ReportInvalidJsonAction} from './general.action';
import {Action} from '@ngrx/store';

@Injectable()
export class GeneralEffect {
    constructor(private _http: HttpWrapperService, private actions$: Actions) {
    }

    @Effect({dispatch: false})
    reportInvalidJson$: Observable<Action> = this.actions$.pipe(
        ofType<ReportInvalidJsonAction>(GeneralActionType.ReportInvalidJson),
        switchMap((action) => {
            return this._http.reportInvalidJSON(action.model);
        })
    );
}
