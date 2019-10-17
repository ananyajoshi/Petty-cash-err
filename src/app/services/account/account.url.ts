import {createUrl} from '../base.url';

export const AccountUrls = {
    flattenAccounts: createUrl('company/:companyUniqueName/flatten-accounts?q=:q&page=:page&count=:count')
};
