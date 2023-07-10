import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlmacenAdminAppComponent } from './components/almacen-admin-app/almacen-admin-app.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { TipoMedidaComponent } from './components/tipo-medida/tipo-medida.component';
import { TipoEntradaComponent } from './components/tipo-entrada/tipo-entrada.component';
import { TipoSalidaComponent } from './components/tipo-salida/tipo-salida.component';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { TipoEntregaComponent } from './components/tipo-entrega/tipo-entrega.component';
import { InventarioExistenteComponent } from './components/inventario-existente/inventario-existente.component';
import { ReporteEntradaComponent } from './components/reporte-entrada/reporte-entrada.component';
import { ReporteSalidaComponent } from './components/reporte-salida/reporte-salida.component';

const routes: Routes = [
  {
    path: '',
    component: AlmacenAdminAppComponent,
    children: [
      { path: 'entrada', component: EntradasComponent },

      { path: 'salida', component: SalidasComponent },

      { path: 'productos', component: ProductosComponent },

      { path: 'proveedores', component: ProveedoresComponent },

      { path: 'unidad-medida', component:  TipoMedidaComponent},
      { path: 'tipo-entrada', component: TipoEntradaComponent },
      { path: 'tipo-salida', component: TipoSalidaComponent },
      { path: 'tipo-producto', component: TipoProductoComponent },
      { path: 'tipo-entrega', component: TipoEntregaComponent },

      { path: 'reporteInventario', component: InventarioExistenteComponent },
      { path: 'reporteEntrada', component: ReporteEntradaComponent},
      { path: 'reporteSalida', component: ReporteSalidaComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
