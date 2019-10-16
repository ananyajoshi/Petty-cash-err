import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpWrapperService} from './httpWrapper.service';
import {GeneralService} from './general.service';
import {CompanyService} from './company/company.service';
import {AuthService} from './auth/auth.service';


@NgModule({
    imports: [],
    declarations: [],
})
export class ServiceModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                HttpWrapperService,
                GeneralService,
                CompanyService,
                AuthService
            ]
        };
    }
}
