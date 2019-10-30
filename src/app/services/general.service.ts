import {Injectable} from '@angular/core';
import {UserDetails} from '../models/user.model';
import {CompanyResponse, ICurrencyDetails} from '../models/company.model';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class GeneralService {

    constructor() {

    }

    get currencies(): ICurrencyDetails[] {
        return this._currencies;
    }

    set currencies(value: ICurrencyDetails[]) {
        this._currencies = value;
    }

    get activeCompany(): CompanyResponse {
        return this._activeCompany;
    }

    set activeCompany(value: CompanyResponse) {
        this._activeCompany = value;
    }

    get user(): UserDetails {
        return this._user;
    }

    set user(value: UserDetails) {
        this._user = value;
    }

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(sessionId: string) {
        this._sessionId = sessionId;
    }

    public companyChangeEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _sessionId: string;
    private _user: UserDetails;
    private _activeCompany: CompanyResponse;
    private _currencies: ICurrencyDetails[];

    private keyboardShowSubscription: any = false;
    private keyboardHideSubscription: any = false;

    manageInputFocusScroll(marginTop = 0) {
        // if (this.keyboardShowSubscription) {
        //     this.keyboardShowSubscription.unsubscribe();
        // }
        // if (this.keyboardHideSubscription) {
        //     this.keyboardHideSubscription.unsubscribe();
        // }
        //
        // let scrollContent: any = document.querySelectorAll('.scroll-content');
        //
        // if (scrollContent.length) {
        //     scrollContent = scrollContent[scrollContent.length - 1];
        //
        //     let scrollTop = 0;
        //     // Controls if one input is changed to another without closing keyboard
        //     let lastBlur = 0;
        //     let lastFocus = 0;
        //
        //     this.keyboardShowSubscription = this.keyboard.onKeyboardShow().subscribe(() => {
        //         lastFocus = 1;
        //         setTimeout(() => {
        //             if (lastBlur === 0) {
        //                 lastBlur = 1;
        //                 scrollTop = scrollContent.scrollTop;
        //                 // const elementFocused: any = document.activeElement;
        //                 const elementFocused: any = scrollContent.querySelector(':focus');
        //
        //                 if (elementFocused) {
        //                     const elementToTop = elementFocused.getBoundingClientRect().top;
        //                     const windowTaller = window.innerHeight > elementToTop + scrollTop;
        //
        //                     let distance = elementToTop - marginTop - 40;
        //                     if (!windowTaller) {
        //                         distance += scrollTop;
        //                     }
        //
        //                     scrollContent.style.top = distance * -1 + 'px';
        //                 }
        //             }
        //             lastFocus = 0;
        //         }, 100);
        //     });
        //
        //     this.keyboardHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => {
        //         lastBlur = 1;
        //         setTimeout(() => {
        //             if (lastFocus === 0) {
        //                 scrollContent.removeAttribute('style');
        //                 scrollContent.scrollTop = scrollTop;
        //                 lastBlur = 0;
        //             }
        //         }, 100);
        //     });
        // }
    }
}
