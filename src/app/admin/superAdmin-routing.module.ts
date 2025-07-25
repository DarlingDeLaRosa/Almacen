import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlmacenAdminAppComponent } from './components/almacen-superAdmin-app/almacen-admin-app.component';
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
import { EditEntradasComponent } from './components/Entrada/edit-entradas/edit-entradas.component';
import { EditSalidasComponent } from './components/Salida/edit-salidas/edit-salidas.component';
import { VistaInicialComponent } from './components/Inicio/vista-inicial/vista-inicial.component';
import { ReporteEntradaProductoComponent } from './components/Reportes/reporte-entrada-producto/reporte-entrada-producto.component';
import { ReporteSalidaProductoComponent } from './components/Reportes/reporte-salida-producto/reporte-salida-producto.component';
import { MinStockProductComponent } from './components/Reportes/min-stock-product/min-stock-product.component';
import { TransferenciaComponent } from './components/Transferencia/transferencia.component';
import { userPermissionGuard } from './guards/user-permission-guard';
import { authGuard } from '../guards/auth-guard';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  {
    path: 'almacen',
    component: AlmacenAdminAppComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        component: VistaInicialComponent,
      },

      {
        path: 'entrada',
        component: EntradasComponent,
      },
      {
        path: 'administrar-entrada',
        component: AdminEntradasComponent,
      },
      {
        path: 'editar-entrada/:id',
        component: EditEntradasComponent,
      },

      {
        path: 'transferencia',
        component: TransferenciaComponent,
      },

      {
        path: 'salida',
        component: SalidasComponent,
      },
      {
        path: 'administrar-salida',
        component: AdminSalidasComponent,
      },
      {
        path: 'editar-salida/:id',
        component: EditSalidasComponent,
      },

      {
        path: 'productos',
        component: ProductosComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-producto',
        component: AdminProductosComponent,
      },

      {
        path: 'proveedores',
        component: ProveedoresComponent,
      },
      {
        path: 'administrar-proveedores',
        component: AdminProveedoresComponent,
      },
      {
        path: 'solicitudes',
        component: SolicitudesComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-usuarios',
        component: AdminUsuariosComponent,
        canActivate: [userPermissionGuard]
      },

      {
        path: 'tipo-medida',
        component: TipoMedidaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'tipo-entrada',
        component: TipoEntradaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'tipo-salida',
        component: TipoSalidaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'tipo-producto',
        component: TipoProductoComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'tipo-entrega',
        component: TipoEntregaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'tipo-almacen',
        component: TipoAlmacenComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-almacen',
        component: AdminTipoAlmacenComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-entrada',
        component: AdminTipoEntradaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-medida',
        component: AdminTipoMedidaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-salida',
        component: AdminTipoSalidaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-producto',
        component: AdminTipoProductoComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'administrar-tipo-entrega',
        component: AdminTipoEntregaComponent,
        canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteInventario',
        component: InventarioExistenteComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteEntrada',
        component: ReporteEntradaComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteSalida',
        component: ReporteSalidaComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteProveedor',
        component: ReporteProveedorComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteProductoEntrada',
        component: ReporteEntradaProductoComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteProductoSalida',
        component: ReporteSalidaProductoComponent,
        // canActivate: [userPermissionGuard]
      },
      {
        path: 'reporteStock',
        component: MinStockProductComponent,
        // canActivate: [userPermissionGuard]
      },
      // { path: '**', redirectTo: '/almacen/inicio', pathMatch: 'full' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
