import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LayoutResolver} from './resolver/layout.resolver';

const routes: Routes = [
    {
        path: '', redirectTo: 'pages/home', pathMatch: 'full'
    },
    {
        path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
    },
    {
        path: 'pages', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutPageModule),
        canActivate: [AuthGuard], resolve: [LayoutResolver]
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
