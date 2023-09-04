import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard, authGuardBackToLogIn } from './guards/auth-guard';
import { roleSuperAdminGuard, roleUserGuard } from './guards/role-guards';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [authGuardBackToLogIn]},
  {
    path: 'almacen',
    //canActivate: [authGuard, roleSuperAdminGuard],
    loadChildren: ()=>
    import('./admin/superAdmin-routing.module').then((m)=>m.AdminRoutingModule)
  },
  {
    path: 'user-almacen',
    //canActivate: [roleUserGuard],
    loadChildren: ()=>
    import('./user/user-routing.module').then((m)=>m.UserRoutingModule)
  },
  {
    path: 'admin-almacen',
    loadChildren: ()=>
    //crear modulo admin
    import('./user/user-routing.module').then((m)=>m.UserRoutingModule)
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
