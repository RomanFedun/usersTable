import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'app',
        canActivate: [authGuard],
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'prefix'
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
