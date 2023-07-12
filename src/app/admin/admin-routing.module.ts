import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlmacenAdminAppComponent } from './components/almacen-admin-app/almacen-admin-app.component';
import { EntradasComponent } from './components/Entrada/entradas/entradas.component';
import { SalidasComponent } from './components/Salida/salidas/salidas.component';
import { ProductosComponent } from './components/Producto/productos/productos.component';
import { ProveedoresComponent } from './components/Proveedor/proveedores/proveedores.component';
import { TipoMedidaComponent } from './components/Configuraciones/tipoDeMedida/tipo-medida/tipo-medida.component';
import { TipoEntradaComponent } from './components/Configuraciones/tipoDeEntrada/tipo-entrada/tipo-entrada.component';
import { TipoSalidaComponent } from './components/Configuraciones/tipoDeSalida/tipo-salida/tipo-salida.component';
import { TipoProductoComponent } from './components/Configuraciones/tipoDeProducto/tipo-producto/tipo-producto.component';
import { TipoEntregaComponent } from './components/Configuraciones/tipoDeEntrega/tipo-entrega/tipo-entrega.component';
import { InventarioExistenteComponent } from './components/Reportes/inventario-existente/inventario-existente.component';
import { ReporteEntradaComponent } from './components/Reportes/reporte-entrada/reporte-entrada.component';
import { ReporteSalidaComponent } from './components/Reportes/reporte-salida/reporte-salida.component';
import { AdminEntradasComponent } from './components/Entrada/admin-entradas/admin-entradas.component';
import { AdminProductosComponent } from './components/Producto/admin-productos/admin-productos.component';
import { AdminProveedoresComponent } from './components/Proveedor/admin-proveedores/admin-proveedores.component';
import { TipoAlmacenComponent } from './components/Configuraciones/tipoDeAlmacen/tipo-almacen/tipo-almacen.component';
import { UsuariosComponent } from './components/Configuraciones/usuario/usuarios/usuarios.component';
import { AdminTipoAlmacenComponent } from './components/Configuraciones/tipoDeAlmacen/admin-tipo-almacen/admin-tipo-almacen.component';
import { AdminTipoEntradaComponent } from './components/Configuraciones/tipoDeEntrada/admin-tipo-entrada/admin-tipo-entrada.component';
import { AdminTipoMedidaComponent } from './components/Configuraciones/tipoDeMedida/admin-tipo-medida/admin-tipo-medida.component';
import { AdminTipoSalidaComponent } from './components/Configuraciones/tipoDeSalida/admin-tipo-salida/admin-tipo-salida.component';
import { AdminTipoProductoComponent } from './components/Configuraciones/tipoDeProducto/admin-tipo-producto/admin-tipo-producto.component';
import { AdminTipoEntregaComponent } from './components/Configuraciones/tipoDeEntrega/admin-tipo-entrega/admin-tipo-entrega.component';
import { AdminUsuariosComponent } from './components/Configuraciones/usuario/admin-usuarios/admin-usuarios.component';
import { ReporteProveedorComponent } from './components/Reportes/reporte-proveedor/reporte-proveedor.component';
import { AdminSalidasComponent } from './components/Salida/admin-salidas/admin-salidas.component';

const routes: Routes = [
  {
    path: '',
    component: AlmacenAdminAppComponent,
    children: [
      {path: 'entrada', component: EntradasComponent,},
      {path: 'administrar-entrada', component: AdminEntradasComponent},

      { path: 'salida', component: SalidasComponent },
      {path: 'administrar-salida', component: AdminSalidasComponent},

      { path: 'productos', component: ProductosComponent },
      { path: 'administrar-producto', component: AdminProductosComponent },

      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'administrar-proveedores', component: AdminProveedoresComponent },

      { path: 'usuarios', component: UsuariosComponent },
      { path: 'tipo-medida', component: TipoMedidaComponent },
      { path: 'tipo-entrada', component: TipoEntradaComponent },
      { path: 'tipo-salida', component: TipoSalidaComponent },
      { path: 'tipo-producto', component: TipoProductoComponent },
      { path: 'tipo-entrega', component: TipoEntregaComponent },
      { path: 'tipo-almacen', component: TipoAlmacenComponent },

      { path: 'administrar-usuarios', component: AdminUsuariosComponent },
      { path: 'administrar-tipo-almacen', component: AdminTipoAlmacenComponent },
      { path: 'administrar-tipo-entrada', component: AdminTipoEntradaComponent },
      { path: 'administrar-tipo-medida', component: AdminTipoMedidaComponent },
      { path: 'administrar-tipo-salida', component: AdminTipoSalidaComponent },
      { path: 'administrar-tipo-producto', component: AdminTipoProductoComponent },
      { path: 'administrar-tipo-entrega', component: AdminTipoEntregaComponent },

      { path: 'reporteInventario', component: InventarioExistenteComponent },
      { path: 'reporteEntrada', component: ReporteEntradaComponent },
      { path: 'reporteSalida', component: ReporteSalidaComponent },
      { path: 'reporteProveedor', component: ReporteProveedorComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }