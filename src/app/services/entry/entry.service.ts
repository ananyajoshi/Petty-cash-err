import {Observable} from 'rxjs';
import {BaseResponse} from '../../models/base.model';
import {catchError, map} from 'rxjs/operators';
import {HttpWrapperService} from '../httpWrapper.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducer';
import {BaseService} from '../base.service';
import {GeneralService} from '../general.service';
import {ToastController} from '@ionic/angular';
import {EntryUrls} from './entry.url';
import {EntryModel} from '../../models/entry.model';
import {Injectable} from '@angular/core';

@Injectable()
export class EntryService extends BaseService {

    constructor(private _http: HttpWrapperService, protected store: Store<AppState>, private _generalService: GeneralService,
                protected toastController: ToastController) {
        super(store, toastController);
    }


    public CreateEntry(entry: EntryModel, entryType: string): Observable<BaseResponse<any, EntryModel>> {
        return this._http.post(EntryUrls.create
            .replace(':companyUniqueName', encodeURIComponent(this._generalService.activeCompany.uniqueName))
            .replace(':entryType', encodeURIComponent(entryType)), entry)
            .pipe(map((res) => {
                const data: BaseResponse<any, EntryModel> = res;
                data.request = entry;
                return data;
            }), catchError((e) => this.handleCatch<any, EntryModel>(e)));

    }
}
