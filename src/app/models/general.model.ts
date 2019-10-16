export interface INameUniqueName {
    uniqueName: string;
    name: string;
    isActive?: boolean;
}

export interface ICommonItem extends INameUniqueName {
    email: string;
    mobileNo: string;
}

export class AddressList {
    public stateCode: string;
    public address: string;
    public isDefault: boolean;
    public stateName: string;
}

export interface IEntityItem extends ICommonItem {
    entity: string;
}
