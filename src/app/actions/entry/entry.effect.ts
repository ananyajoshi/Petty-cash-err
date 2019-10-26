import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../store/reducer';
import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CreateEntryAction, CreateEntryErrorAction, CreateEntrySuccessAction, EntryActionType} from './entry.action';
import {ToastController} from '@ionic/angular';
import {BaseResponse} from '../../models/base.model';
import {EntryService} from '../../services/entry/entry.service';
import {EntryModel} from '../../models/entry.model';

@Injectable()
export class EntryEffect {
    constructor(private actions$: Actions, private store: Store<AppState>, private generalService: GeneralService, private router: Router,
                protected toastController: ToastController, private _entryService: EntryService) {
    }

    @Effect()
    createEntry$: Observable<Action> = this.actions$.pipe(
        ofType<CreateEntryAction>(EntryActionType.createEntry),
        switchMap((s) => {
            return this._entryService.CreateEntry(s.entry, s.entry.entryType.toUpperCase())
                .pipe(
                    map((res: BaseResponse<any, EntryModel>) => {
                        if (res.status !== 'success') {
                            return new CreateEntryErrorAction(res.message);
                        }
                        return new CreateEntrySuccessAction(res.body);
                    }),
                    catchError((res) => {
                        return of(new CreateEntryErrorAction(res.message));
                    })
                );
        })
    );

    @Effect()
    createEntryComplete$: Observable<any> = this.actions$.pipe(
        ofType<CreateEntrySuccessAction>(EntryActionType.createEntrySuccess),
        switchMap((s) => {
            const toast = this.toastController.create({
                message: 'Entry Created Successfully',
                animated: true,
                color: 'success',
                showCloseButton: true,
                position: 'top'
            }).then(t => {
                t.present();
            });
            this.router.navigate(['/pages/home']);
            return of();
        })
    );
}
