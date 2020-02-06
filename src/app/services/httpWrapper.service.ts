import {catchError, finalize, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralService} from './general.service';
import {environment} from '../../environments/environment';
import {createUrl} from './base.url';

@Injectable()
export class HttpWrapperService {

    constructor(private http: HttpClient, private generalService: GeneralService) {
    }

    public get = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        if (params)
            options.params = params;
        return this.http.get(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };
    public post = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.post(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };
    public put = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.put(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };
    public delete = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        if (params)
            options.search = this.objectToParams(params);
        return this.http.delete(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };

    public deleteWithBody = (url: string, request: any): Observable<any> => {
        const options = {headers: {}, body: {}};
        options.headers['Session-Id'] = this.generalService.sessionId;
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';
        options.headers = new HttpHeaders(options.headers);
        options.body = request;
        return this.http.delete(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };

    public patch = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.patch(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
        }));
    };

    public prepareOptions(options: any): any {
        const sessionId = this.generalService.sessionId;
        options = options || {};

        if (!options.headers) {
            options.headers = {} as any;
        }

        if (sessionId) {
            options.headers['Session-Id'] = sessionId;
        }
        // options.withCredentials = true;
        options.headers['cache-control'] = 'no-cache';
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }
        if (options.headers['Content-Type'] === 'multipart/form-data') {
            delete options.headers['Content-Type'];
        }
        if (!options.headers.Accept) {
            options.headers.Accept = 'application/json';
        }
        options.headers = new HttpHeaders(options.headers);
        return options;
    }

    public isPrimitive(value) {
        return value == null || (typeof value !== 'function' && typeof value !== 'object');
    }

    public objectToParams(object = {}) {
        return Object.keys(object).map((value) => {
            const objectValue = this.isPrimitive(object[value]) ? object[value] : JSON.stringify(object[value]);
            return `${value}=${objectValue}`;
        }).join('&');
    }

    public reportInvalidJSON(model) {
        model.email = this.generalService.user ? this.generalService.user.email : null;
        model.environment = environment.apiUrl;
        model.userUniqueName = this.generalService.user ? this.generalService.user.uniqueName : '';
        return this.post(createUrl('exception/invalid-json'), model).pipe(map((res) => {
            return res;
        }), catchError((e) => e));
    }
}
