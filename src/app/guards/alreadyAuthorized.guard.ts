import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AlreadyAuthorizedGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> | boolean | UrlTree {
        let session = null;
        this.store.pipe(
            take(1), select(s => s.session.data)
        ).subscribe(res => session = res);
        return !session;
    }
}
