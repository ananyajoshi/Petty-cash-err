import {createUrl} from '../base.url';

export const EntryUrls = {
    create: createUrl('company/:companyUniqueName/pettycash-manager/generate?entryType=:entryType'),
    uploadAttachment: createUrl('company/:companyUniqueName/images'),
    getReport: createUrl('company/:companyUniqueName/pettycash-manager/client-report')
};
