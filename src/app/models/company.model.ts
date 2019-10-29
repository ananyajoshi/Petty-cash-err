import {AddressList, ICommonItem} from './general.model';
import {UserEntityRole} from './user.model';

export interface ActiveFinancialYear {
    financialYearStarts: string;
    financialYearEnds: string;
    isLocked: boolean;
    uniqueName: string;
}

export interface CompanySubscription {
    discount: number;
    subscriptionDate: string;
    nextBillDate: string;
    autoDeduct: boolean;
    paymentMode: string;
    servicePlan: ServicePlan;
    paymentDue: boolean;
    remainingPeriod: number;
    primaryBillerConfirmed: boolean;
    billAmount: number;
    primaryBiller?: any;
    createdAt: string;
    createdBy: ICommonItem;
}

export interface ServicePlan {
    planName: string;
    servicePeriod: number;
    amount: number;
}

export interface Role {
    uniqueName: string;
    name: string;
    scopes?: any[];
}

export class GstDetail {
    public addressList: AddressList[];
    public gstNumber: string;
}

export class CompanyResponse {
    public canUserSwitch: boolean;
    public companyIdentity: any[];
    public activeFinancialYear: ActiveFinancialYear;
    public email: string;
    public city: string;
    public pincode: string;
    public country: string;
    public updatedAt: string;
    public updatedBy: ICommonItem;
    public createdAt: string;
    public createdBy: ICommonItem;
    public uniqueName: string;
    public baseCurrency: string;
    public contactNo: string;
    public companySubscription: CompanySubscription;
    public financialYears: ActiveFinancialYear[];
    public sharedEntity?: any;
    public address: string;
    public state: string;
    public shared: boolean;
    public alias?: any;
    public role: Role;
    public name: string;
    public gstDetails: GstDetail[];
    public panNumber?: string;
    public isMultipleCurrency?: boolean;
    public userEntityRoles?: UserEntityRole[];
    public nameAlias?: string;
    public balanceDisplayFormat?: string;
    public balanceDecimalPlaces?: string;
}

export class ICurrencyDetails {
    code: string;
    symbol: string;
}
