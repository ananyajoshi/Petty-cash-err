import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppState} from '../store/reducer';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {EntryModel} from '../models/entry.model';

@Injectable({providedIn: 'root'})
export class EntryGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> | boolean | UrlTree {
        let requestModal: EntryModel = null;
        this.store.pipe(
            take(1), select(s => s.entry.requestModal)
        ).subscribe(res => requestModal = res);

        if (!requestModal.entryType) {
            this.router.navigate(['pages', 'home']);
            return false;
        }
        return true;
    }
}
