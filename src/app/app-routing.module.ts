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
        path: 'pages', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutPageModule),
        canActivate: [AuthGuard], resolve: [LayoutResolver]
    },
    {path: 'entry/:type', loadChildren: () => import('./entry/entry.module').then(m => m.EntryPageModule), canActivate: [AuthGuard]},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
