import {BaseResponse} from '../models/base.model';
import {HttpErrorResponse} from '@angular/common/http';
import * as queryString from 'querystring';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {ToastController} from '@ionic/angular';

const invalidStatusCodes: number[] = [0, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];

export class BaseService {
    constructor(protected store: Store<AppState>, protected toastController: ToastController) {
    }

    handleCatch<TResponse, TRequest>(r: HttpErrorResponse, request?: any) {
        const data: BaseResponse<TResponse, TRequest> = new BaseResponse<TResponse, TRequest>();
        const toast = this.toastController.create({
            message: r.error.message,
            animated: true,
            color: 'danger',
            showCloseButton: true,
            position: 'top'
        }).then(t => {
            t.present();
        });

        if (invalidStatusCodes.includes(r.status)
        ) {
            data.status = 'error';
            data.message = 'Something went wrong';
            data.body = null;
            data.code = 'Internal Error';
        } else {
            // data = r.error as any;
            if (data) {
                if (data.code === 'SESSION_EXPIRED_OR_INVALID') {
                    // this.store.dispatch({type: 'LoginOut'});
                } else if (data.code === 'INVALID_JSON') {
                    const dataToSend = {
                        requestBody: '', // r.error.request ? r.error.request : request
                        queryString: data.queryString,
                        method: '',
                        url: r.url,
                        email: null,
                        userUniqueName: null,
                        environment: null,
                        key: r.error.message ? r.error.message.substring(r.error.message.indexOf(':') + 2, r.error.message.length) : null,
                    };
                    // this.store.dispatch({type: 'REPORT_INVALID_JSON', payload: dataToSend});
                } else if (data.code === '') {
                    // handle unshared company response
                    // this.store.dispatch({type: 'CompanyRefresh'});
                }
                if (typeof data !== 'string') {
                    data.request = request;
                    data.queryString = queryString;
                }
            }
        }
        return of(data);
    }
}
