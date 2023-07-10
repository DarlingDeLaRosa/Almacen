import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlmacenAdminAppComponent } from './components/almacen-admin-app/almacen-admin-app.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { TipoMedidaComponent } from './components/tipo-medida/tipo-medida.component';
import { TipoEntradaComponent } from './components/tipo-entrada/tipo-entrada.component';
import { TipoSalidaComponent } from './components/tipo-salida/tipo-salida.component';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { TipoEntregaComponent } from './components/tipo-entrega/tipo-entrega.component';

const routes: Routes = [
  {
    path: '',
    component: AlmacenAdminAppComponent,
    children: [
      { path: 'entrada', component: EntradasComponent },
      { path: 'salida', component: SalidasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'unidad-medida', component:  TipoMedidaComponent},
      { path: 'tipo-entrada', component: TipoEntradaComponent },
      { path: 'tipo-salida', component: TipoSalidaComponent },
      { path: 'tipo-producto', component: TipoProductoComponent },
      { path: 'tipo-entrega', component: TipoEntregaComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
