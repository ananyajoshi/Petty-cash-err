import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducer';
import {Observable} from 'rxjs';
import {BaseResponse} from '../../models/base.model';
import {CompanyResponse} from '../../models/company.model';
import {GeneralService} from '../general.service';
import {CompanyUrls} from './company.url';
import {HttpWrapperService} from '../httpWrapper.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class CompanyService extends BaseService {

    constructor(protected store: Store<AppState>, protected _generalService: GeneralService, private _http: HttpWrapperService) {
        super(store);
    }

    public getAll(): Observable<BaseResponse<CompanyResponse[], string>> {
        return this._http.get(CompanyUrls.getAll.replace(':uniqueName', this._generalService.user.uniqueName)).pipe(
            map((res) => {
                const data: BaseResponse<CompanyResponse[], string> = res;
                return data;
            }),
            catchError((e) => this.handleCatch<CompanyResponse[], string>(e, '')));
    }
}
