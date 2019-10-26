import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducer';
import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CreateEntrySuccessAction, EntryActionType} from './entry.action';
import {ToastController} from '@ionic/angular';

@Injectable()
export class EntryEffect {
    constructor(private actions$: Actions, private store: Store<AppState>, private generalService: GeneralService, private router: Router,
                protected toastController: ToastController) {
    }

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
