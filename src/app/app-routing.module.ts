import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenAppComponent } from './components/almacen-app/almacen-app.component';
import { AuthComponent } from './components/auth/auth.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent  },
  {
    path: 'almacen',
    component: AlmacenAppComponent,
    children: [
      {path: 'entrada', component: EntradasComponent},
      {path: 'salida', component: SalidasComponent},
      {path: 'productos', component: ProductosComponent},
      {path: 'proveedores', component: ProveedoresComponent},
      {path: 'reportes', component: ReportesComponent},
      {path: 'configuraciones', component: ConfiguracionesComponent}
    ]
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
