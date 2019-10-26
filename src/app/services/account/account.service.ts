import {Observable} from 'rxjs';
import {BaseResponse} from '../../models/base.model';
import {catchError, map} from 'rxjs/operators';
import {HttpWrapperService} from '../httpWrapper.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducer';
import {BaseService} from '../base.service';
import {FlattenAccountsResponse} from '../../models/account.model';
import {GeneralService} from '../general.service';
import {AccountUrls} from './account.url';
import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountService extends BaseService {

    constructor(private _http: HttpWrapperService, protected store: Store<AppState>, private _generalService: GeneralService,
                protected toastController: ToastController) {
        super(store, toastController);
    }


    public GetFlattenAccounts(q?: string, page?: string, count?: string): Observable<BaseResponse<FlattenAccountsResponse, string>> {
        return this._http.get(AccountUrls.flattenAccounts
            .replace(':companyUniqueName', encodeURIComponent(this._generalService.activeCompany.uniqueName))
            .replace(':q', encodeURIComponent(q || ''))
            .replace(':count', count || '')
            .replace(':page', encodeURIComponent(page || '')))
            .pipe(map((res) => {
                const data: BaseResponse<FlattenAccountsResponse, string> = res;
                data.request = '';
                data.queryString = {q, page, count};
                return data;
            }), catchError((e) => this.handleCatch<FlattenAccountsResponse, string>(e)));

    }
}
