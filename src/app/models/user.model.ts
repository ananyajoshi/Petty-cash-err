import {CreatedBy} from './base.model';
import {ICommonItem, IEntityItem} from './general.model';
import {Role} from './company.model';

export class UserDetails {
    public name: string;
    public email: string;
    public mobileNo: string;
    public contactNo: string;
    public uniqueName: string;
    public anAdmin: boolean;
    public authenticateTwoWay: boolean;
    public availableCredit: boolean;
    public isNewUser: boolean;
    public subUser: boolean;
    public subUsers: any[];
    public createdAt: string;
    public updatedAt: string;
    public createdBy: CreatedBy;
    public updatedBy: CreatedBy;
}

export interface UserEntityRole {
    sharedWith: ICommonItem;
    uniqueName: string;
    allowedCidrs: any[];
    allowedIps: any[];
    period?: any;
    from?: any;
    to?: any;
    sharedBy: ICommonItem;
    duration?: any;
    entity: IEntityItem;
    role: Role;
}
