import {ReplaySubject} from 'rxjs';
import {OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {GeneralService} from '../../services/general.service';

@Pipe({name: 'myCurrency', pure: true})

export class MyCurrencyPipe implements OnInit, OnDestroy, PipeTransform {

    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public _currencyNumberType: string;
    public _currencyDecimalType: number;

    constructor(private _generalService: GeneralService) {
        if (this._generalService.activeCompany) {
            this._currencyNumberType = this._generalService.activeCompany.balanceDisplayFormat ? this._generalService.activeCompany.balanceDisplayFormat : 'IND_COMMA_SEPARATED';
            // tslint:disable-next-line:radix
            this._currencyDecimalType = this._generalService.activeCompany.balanceDecimalPlaces ? parseInt(this._generalService.activeCompany.balanceDecimalPlaces) : 0;
        }
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public transform(input: number) {
        if (input == null) {
            return;
        }
        const result = input.toString().split('.');
        let finaloutput;
        const currencyType = this._currencyNumberType;
        // tslint:disable-next-line:radix
        const digitAfterDecimal: number = this._currencyDecimalType;
        let lastThree;
        let afterdecDigit = null;

        if (result[0].length <= 3) {
            if (!result[0].toString().includes('-')) {
                let op = result[0].toString();
                if (result.length > 1) {
                    if (digitAfterDecimal !== 0) {
                        result[1] = (result[1].length < 4) ? result[1] + '0000' : result[1];
                        op += '.' + result[1].substring(0, digitAfterDecimal);
                    }
                } else {
                    if (digitAfterDecimal === 2) {
                        op += '.' + '00';
                    }
                    if (digitAfterDecimal === 4) {
                        op += '.' + '0000';
                    }
                }

                return op;
            } else {
                let op = '-' + result[0].substring(1);
                if (result.length > 1) {
                    if (digitAfterDecimal !== 0) {
                        result[1] = (result[1].length < 4) ? result[1] + '0000' : result[1];
                        op += '.' + result[1].substring(0, digitAfterDecimal);
                    }
                } else {
                    if (digitAfterDecimal === 2) {
                        op += '.' + '00';
                    }
                    if (digitAfterDecimal === 4) {
                        op += '.' + '0000';
                    }
                }

                return op;
            }
        } else {
            lastThree = result[0].substring(result[0].length - 3);
            if (result.length > 1) {
                if (digitAfterDecimal !== 0) {
                    result[1] = (result[1].length < 4) ? result[1] + '0000' : result[1];
                    afterdecDigit = result[1].substring(0, digitAfterDecimal);
                }
            } else {
                if (digitAfterDecimal === 2) {
                    afterdecDigit = '00';
                }
                if (digitAfterDecimal === 4) {
                    afterdecDigit = '0000';
                }
            }
        }
        const otherNumbers = result[0].substring(0, result[0].length - 3);

        switch (currencyType) {
            case 'IND_COMMA_SEPARATED':
                if (otherNumbers) {
                    if (otherNumbers !== '' && otherNumbers !== '-') {
                        lastThree = ',' + lastThree;
                    }
                    let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
                    if (afterdecDigit) {
                        output += '.' + afterdecDigit;
                    }
                    finaloutput = output;
                }
                break;
            case 'INT_COMMA_SEPARATED': {

                if (otherNumbers !== '' && otherNumbers !== '-') {
                    lastThree = ',' + lastThree;
                }
                let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + lastThree;
                if (afterdecDigit) {
                    output += '.' + afterdecDigit;
                }
                finaloutput = output;

            }
                break;
            case 'INT_SPACE_SEPARATED': {

                if (otherNumbers !== '' && otherNumbers !== '-') {
                    lastThree = ' ' + lastThree;
                }
                let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + lastThree;
                if (afterdecDigit) {
                    output += '.' + afterdecDigit;
                }
                finaloutput = output;

            }
                break;
            case 'INT_APOSTROPHE_SEPARATED': {

                if (otherNumbers !== '' && otherNumbers !== '-') {
                    lastThree = '\'' + lastThree;
                }
                let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '\'') + lastThree;
                if (afterdecDigit) {
                    output += '.' + afterdecDigit;
                }
                finaloutput = output;

            }
                break;

            default: {
                if (otherNumbers !== '' && otherNumbers !== '-') {
                    lastThree = ',' + lastThree;
                }
                let output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + lastThree;

                if (afterdecDigit) {
                    output += '.' + afterdecDigit;
                }
                finaloutput = output;

            }
                break;
        }
        return finaloutput;

    }

}
