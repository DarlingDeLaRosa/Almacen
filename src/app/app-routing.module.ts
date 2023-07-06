import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent  },
  {
    path: 'admin-almacen',
    loadChildren: ()=>
    import('./admin/admin-routing.module').then((m)=>m.AdminRoutingModule)
  },
  {
    path: 'user-almacen',
    loadChildren: ()=>
    import('./user/user-routing.module').then((m)=>m.UserRoutingModule)
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
