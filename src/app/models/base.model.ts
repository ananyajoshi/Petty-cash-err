export class BaseResponse<T, TRequest> {
    public data: T;
    public status: 'success' | 'fail' | 'Fail' | 'Success';
    public hasError: boolean;
    public errors: MessageData[];
    public request?: TRequest;
    public queryString?: any;
}

export class MessageData {
    public type: 'Error' | 'Info';
    public title: string;
    public message: string;
}
