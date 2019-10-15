import {environment} from '../../environments/environment';

export const createUrl = (url) => {
    return `${environment.apiUrl}/${url}`;
};
