import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuardBackToLogIn } from './guards/auth-guard'; 

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent, 
    canActivate: [authGuardBackToLogIn]
  },
  {
    path: 'almacen',
    loadChildren: () =>
      import('./admin/superAdmin-routing.module').then((m) => m.AdminRoutingModule)
  },
  {
    path: 'user-almacen',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'almacen/inicio' }, 
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
