import {Injectable} from '@angular/core';
import {AppState} from '../../store/reducer';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CompanyService} from '../../services/company/company.service';
import {Observable, of} from 'rxjs';
import {CompanyActionType, GetCurrenciesAction, GetCurrenciesErrorAction, GetCurrenciesSuccessAction} from './company.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ICurrencyDetails} from '../../models/company.model';
import {BaseResponse} from '../../models/base.model';
import {GeneralService} from '../../services/general.service';

@Injectable()
export class CompanyEffect {
    constructor(private actions$: Actions, private store: Store<AppState>, private companyService: CompanyService, private _generalService: GeneralService) {
    }

    @Effect()
    getCompanyCurrencies$: Observable<Action> = this.actions$.pipe(
        ofType<GetCurrenciesAction>(CompanyActionType.GetCurrencies),
        switchMap((s) => {
            return this.companyService.currencyList().pipe(
                map((res: BaseResponse<ICurrencyDetails[], string>) => {
                    if (res.status !== 'success') {
                        return new GetCurrenciesErrorAction(res.message);
                    }
                    return new GetCurrenciesSuccessAction(res.body);
                }),
                catchError(e => {
                    return of(new GetCurrenciesErrorAction(e.message));
                })
            );
        }),
    );

    @Effect({dispatch: false})
    getCompanyCurrenciesSuccess$ = this.actions$.pipe(
        ofType<GetCurrenciesSuccessAction>(CompanyActionType.GetCurrenciesSuccess),
        map((s) => {
            this._generalService.currencies = s.currencies;
            return of();
        }),
    );
}
