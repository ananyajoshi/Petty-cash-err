import {Directive, ElementRef, HostListener, Input, OnDestroy} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Directive({
    selector: '[appDecimalDigitsDirective]'
})
export class DecimalDigitsDirective implements OnDestroy {
    @Input() public decimalPoints: number = 2;
    @Input() public OnlyNumber: boolean = true;
    @Input() public DecimalPlaces: string;
    @Input() public minValue: string;
    @Input() public maxValue: string;

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    private navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste'
    ];

    // tslint:disable-next-line:member-ordering
    constructor(private elemRef: ElementRef) {
        //
    }

    @HostListener('keypress', ['$event'])
    public onKeyPress(event) {
        const e = event as any;

        const valInFloat: number = parseFloat(e.target.value);

        if (this.minValue) {
            // (isNaN(valInFloat) && e.key === "0") - When user enters value for first time valInFloat will be NaN, e.key condition is
            // because I didn't want user to enter anything below 1.
            // NOTE: You might want to remove it if you want to accept 0
            if (valInFloat < parseFloat(this.minValue)) {
                e.preventDefault();
            }
        }

        if (this.maxValue) {
            if (valInFloat > parseFloat(this.maxValue)) {
                e.preventDefault();
            }
        }

        if (this.decimalPoints) {
            let currentCursorPos: number = -1;
            const el: HTMLInputElement = this.elemRef.nativeElement.children[0];
            if (typeof el.selectionStart === 'number') {
                currentCursorPos = el.selectionStart;
            } else {
                // Probably an old IE browser
                console.log('This browser doesn\'t support selectionStart');
            }

            const dotLength: number = e.target.value.replace(/[^.]/g, '').length;

            // If user has not entered a dot(.) e.target.value.split(".")[1] will be undefined
            const decimalLength = e.target.value.split('.')[1] ? e.target.value.split('.')[1].length : 0;

            // (this.giddhDecimalPlaces - 1) because we don't get decimalLength including currently pressed character
            // currentCursorPos > e.target.value.indexOf(".") because we must allow user's to enter value before dot(.)
            // Checking Backspace etc.. keys because firefox doesn't pressing them while chrome does by default
            // tslint:disable-next-line:radix
            if (dotLength > 1 || (dotLength === 1 && e.key === '.') || (currentCursorPos === 0 && e.key === '.') || (decimalLength > (this.decimalPoints - 1) &&
                currentCursorPos > e.target.value.indexOf('.')) && ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) === -1) {
                e.preventDefault();
            }
        }
    }

    @HostListener('paste', ['$event'])
    public onPaste(event) {
        if ('decimaldigitsdirective' in event.target.attributes) {
            let cl = event.clipboardData.getData('text/plain');
            if (cl.includes('\'') || cl.includes(',') || cl.includes(' ')) {
                cl = cl.replace(/'/g, '');
                cl = cl.replace(/,/g, '');
                cl = cl.replace(/ /g, '');

            } else {
                if (!new RegExp('^(\\d+)((\\.)\\d{1,' + this.decimalPoints + '})?$', 'g').test(cl)) {
                    cl = 0;
                }
            }
            const evt = new Event('input');
            event.target.value = cl;
            event.target.dispatchEvent(evt);
            event.preventDefault();
        }
        return;
    }

    @HostListener('drop', ['$event'])
    public onDrop(event) {
        if ('decimaldigitsdirective' in event.target.attributes) {
            let cl = event.dataTransfer.getData('text/plain');
            if (!new RegExp('^(\\d+)((\\.)\\d{1,' + this.decimalPoints + '})?$', 'g').test(cl)) {
                cl = 0;
            }
            const evt = new Event('input');
            event.target.value = cl;
            event.target.dispatchEvent(evt);
            event.preventDefault();
        }
        return;
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
