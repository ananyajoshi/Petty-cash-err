import {Action} from '@ngrx/store';

export enum GeneralActionType {
    ReportInvalidJson = '[General] Report Invalid Json'
}

export class ReportInvalidJsonAction implements Action {
    type = GeneralActionType.ReportInvalidJson;

    constructor(public model) {
    }
}

export type GeneralActionUnion =
    ReportInvalidJsonAction;
