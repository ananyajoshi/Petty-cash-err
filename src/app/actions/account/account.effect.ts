import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {AuthActionType} from '../auth/auth.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {BaseResponse} from '../../models/base.model';
import {AppState} from '../../store/reducer';
import {AccountActionType, GetFlattenAccountAction, GetFlattenAccountCompleteAction, GetFlattenAccountErrorAction} from './account.action';
import {AccountService} from '../../services/account/account.service';
import {FlattenAccountsResponse} from '../../models/account.model';

@Injectable()
export class AccountEffect {
    constructor(private actions$: Actions, private store: Store<AppState>, private accountService: AccountService) {
    }

    @Effect()
    getFlattenAccounts$: Observable<Action> = this.actions$.pipe(
        ofType<GetFlattenAccountAction>(AccountActionType.GetFlattenAccounts),
        switchMap((s) => {
            return this.accountService.GetFlattenAccounts()
                .pipe(
                    map((res: BaseResponse<FlattenAccountsResponse, string>) => {
                        if (res.status !== 'success') {
                            return new GetFlattenAccountErrorAction(res.message);
                        }
                        return new GetFlattenAccountCompleteAction(res.body);
                    }),
                    catchError((res) => {
                        return of(new GetFlattenAccountErrorAction(res.message));
                    })
                );
        })
    );
}
