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


export class CreatedBy {
    public email: string;
    public mobileNo: string;
    public name: string;
    public uniqueName: string;
}
