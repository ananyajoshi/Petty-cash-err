export class BaseResponse<TResponse, TRequest> {
    public status: string;
    public code?: string;
    public message?: string;
    public body?: TResponse;
    // public body?: any;
    public response?: TResponse;
    // public response?: any;
    public request?: TRequest;
    // public request?: any;
    public queryString?: any;
}

export class MessageData {
    public type: 'Error' | 'Info';
    public title: string;
    public message: string;
}

export interface IPagination {
    count: number;
    page: number;
    totalItems: number;
    totalPages: number;
}

export interface IPaginatedResponse<T = any> extends IPagination {
    size: number;
    results: T[];
}

export class CreatedBy {
    public email: string;
    public mobileNo: string;
    public name: string;
    public uniqueName: string;
}
