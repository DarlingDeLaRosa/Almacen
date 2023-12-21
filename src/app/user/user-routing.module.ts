import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenUserComponent } from './components/almacen-user/almacen-user.component';
import { VistaInicialUserComponent } from './inicio/vista-inicial-user/vista-inicial-user.component';
import { AdminUserSalidasComponent } from './components/salidas/admin-user-salidas/admin-user-salidas.component';
import { AdminUserEntradasComponent } from './components/entradas/admin-user-entradas/admin-user-entradas.component';
import { UserEntradasComponent } from './components/entradas/user-entradas/user-entradas.component';
import { UserSalidasComponent } from './components/salidas/user-salidas/user-salidas.component';
import { EditUserSalidasComponent } from './components/salidas/edit-user-salidas/edit-user-salidas.component';
import { EditUserEntradasComponent } from './components/entradas/edit-user-entradas/edit-user-entradas.component';
import { AdminProductoComponent } from './components/productos/admin-producto/admin-producto.component';
import { ProductosComponent } from './components/productos/productos/productos.component';

// Tengo que saber si podre usar los componentes del admin debido a la ruta que utiliza.. TODO
const routes: Routes = [
  {
    path: 'user-almacen',
    component: AlmacenUserComponent,
    children: [
      { path: 'administrar-entrada', component: AdminUserEntradasComponent },
      { path: 'administrar-salida', component: AdminUserSalidasComponent },
      { path: 'administrar-producto', component: AdminProductoComponent},

      { path: 'entrada', component: UserEntradasComponent },
      { path: 'salida', component: UserSalidasComponent },
      { path: 'producto', component: ProductosComponent },

      { path: 'editar-entrada/:id', component: EditUserSalidasComponent },
      { path: 'editar-salida/:id', component: EditUserEntradasComponent },

      { path: 'inicio', component: VistaInicialUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
