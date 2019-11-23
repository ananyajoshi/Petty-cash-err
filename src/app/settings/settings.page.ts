import {Component, OnDestroy, OnInit,} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/reducer';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {SetActiveLanguage} from '../actions/auth/auth.action';

@Component({
    selector: 'app-setting',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingPage implements OnInit, OnDestroy {
    public selectedLanguage: string;

    

    constructor(private translate: TranslateService, private store: Store<AppState>, private menuController: MenuController, ) {
    }

    ngOnInit() {
        this.store.pipe(
            select(s => s.session.selectedLanguage),
            untilDestroyed(this)
        ).subscribe(res => {
            this.selectedLanguage = res;
            this.changeLanguage(res);
        });
        //
    }

    toggleMenu() {
        this.menuController.toggle();
    }

    changeLanguage(lang: string) {
        this.store.dispatch(new SetActiveLanguage(lang));
        this.translate.use(lang);
    }

    ngOnDestroy(): void {
    }
}
