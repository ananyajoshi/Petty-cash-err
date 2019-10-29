import {createUrl} from '../base.url';

export const CompanyUrls = {
    getAll: createUrl('users/:uniqueName/companies'),
    currency: createUrl('currency'),
    currencyRate: createUrl('currency/rate?from=:from&to=:to&date=:date')
};
