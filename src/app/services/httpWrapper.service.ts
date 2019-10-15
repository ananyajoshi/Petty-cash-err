import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeneralService} from './general.service';

@Injectable()
export class HttpWrapperService {

    constructor(private http: HttpClient, private generalService: GeneralService) {
    }

    public get = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        options.params = params;
        return this.http.get(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }
    public post = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.post(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }
    public put = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.put(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }
    public delete = (url: string, params?: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        options.search = this.objectToParams(params);
        return this.http.delete(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }

    public deleteWithBody = (url: string, request: any): Observable<any> => {
        const options = {headers: {}, body: {}};
        options.headers['Session-Id'] = this.generalService.sessionId;
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';
        options.headers = new HttpHeaders(options.headers);
        options.body = request;
        this.showLoader();
        return this.http.delete(url, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }

    public patch = (url: string, body: any, options?: any): Observable<any> => {
        options = this.prepareOptions(options);
        return this.http.patch(url, body, options).pipe(tap((res) => {
            //
        }), finalize(() => {
            this.hideLoader();
        }));
    }

    public prepareOptions(options: any): any {
        this.showLoader();
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

    private showLoader(): void {
        // this.loaderService.show();
    }

    private hideLoader(): void {
        // this.loaderService.hide();
    }
}
