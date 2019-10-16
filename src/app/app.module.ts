import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {metaReducers, reducers} from './store/reducer';
import {StoreModule} from '@ngrx/store';
import {ServiceModule} from './services/service.module';
import {ActionsModule} from './actions/actions.module';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {LayoutResolver} from './resolver/layout.resolver';
import {NoCompanyModalComponent} from './no-company-modal/no-company-modal.component';
import {SelectCompanyComponent} from './select-company/select-company.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, NoCompanyModalComponent, SelectCompanyComponent],
    entryComponents: [NoCompanyModalComponent, SelectCompanyComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        ServiceModule.forRoot(),
        ActionsModule.forRoot(),
        [!environment.production ? StoreDevtoolsModule.instrument() : []],
        SharedModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        LayoutResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
