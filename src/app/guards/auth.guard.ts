import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppState} from '../store/reducer';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> | boolean | UrlTree {
        let session = null;
        this.store.pipe(
            take(1), select(s => s.session.data)
        ).subscribe(res => session = res);
        if (!session) {
            this.router.navigate(['/login']);
        }
        return !!session;
    }
}
