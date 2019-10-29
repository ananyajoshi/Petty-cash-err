import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../store/reducer';
import {select, Store} from '@ngrx/store';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import {CompanyService} from '../services/company/company.service';
import {Injectable} from '@angular/core';
import {UserDetails} from '../models/user.model';
import {take} from 'rxjs/operators';
import {GeneralService} from '../services/general.service';
import {Session} from '../models/login.model';
import {NoCompanyModalComponent} from '../no-company-modal/no-company-modal.component';
import {SetCompanyAction} from '../actions/company/company.action';
import {SetActiveCompanyAction} from '../actions/auth/auth.action';

@Injectable()
export class LayoutResolver implements Resolve<any> {

    constructor(private store: Store<AppState>, private alertCtrl: AlertController,
                private _companyService: CompanyService, private modalController: ModalController,
                private _generalService: GeneralService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let user: UserDetails = null;
        let session: Session;
        let activeCompany: string;
        this.store.pipe(take(1), select(s => s.session)).subscribe(s => {
            session = s.data.session;
            user = s.data.user || null;
            activeCompany = s.activeCompany;
        });

        if (!session || !user) {
            return false;
        } else {
            this._generalService.sessionId = session.id;
            this._generalService.user = user;
        }

        return this._companyService.getAll().toPromise().then(async (result) => {
            if (result.status === 'success') {
                if (result.body.length) {
                    this.store.dispatch(new SetCompanyAction(result.body));
                    if (activeCompany) {
                        const companyIndex = result.body.findIndex(s => s.uniqueName === activeCompany);
                        if (companyIndex > -1) {
                            this.store.dispatch(new SetActiveCompanyAction(activeCompany));
                        } else {
                            this.store.dispatch(new SetActiveCompanyAction(result.body[0].uniqueName));
                        }
                    } else {
                        this.store.dispatch(new SetActiveCompanyAction(result.body[0].uniqueName));
                    }
                    return true;
                } else {
                    const modal = await this.modalController.create({
                        component: NoCompanyModalComponent,
                        backdropDismiss: false,
                        cssClass: 'nocompany-popover',
                        componentProps: {
                            email: this._generalService.user.email
                        }
                    });
                    await modal.present();
                }
            } else {
                const modal = await this.modalController.create({
                    component: NoCompanyModalComponent,
                    backdropDismiss: false,
                    cssClass: 'nocompany-popover',
                    componentProps: {
                        email: this._generalService.user.email
                    }
                });
                await modal.present();
            }
        }).catch(reason => {
            // show modal here
            return reason;
        });
    }

}
