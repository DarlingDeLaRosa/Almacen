import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenUserComponent } from './components/almacen-user/almacen-user.component';
import { VistaInicialUserComponent } from './inicio/vista-inicial-user/vista-inicial-user.component';
import { AdminUserSalidasComponent } from './components/salidas/admin-user-salidas/admin-user-salidas.component';
import { AdminUserEntradasComponent } from './components/entradas/admin-user-entradas/admin-user-entradas.component';

// Tengo que saber si podre usar los componentes del admin debido a la ruta que utiliza.. TODO
const routes: Routes = [
  {
    path: '',
    component: AlmacenUserComponent,
    children: [
      { path: 'administrar-entrada', component: AdminUserEntradasComponent},
      { path: 'administrar-salida', component: AdminUserSalidasComponent},
      { path: 'inicio', component: VistaInicialUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
