import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './superAdmin-routing.module';
import { AlmacenAdminAppComponent } from './components/almacen-superAdmin-app/almacen-admin-app.component';
import { EntradasComponent } from './components/Entrada/entradas/entradas.component';
import { ModalComponent } from './components/Modals/product-modal/modal.component';
import { ProductosComponent } from './components/Producto/productos/productos.component';
import { ProveedoresComponent } from './components/Proveedor/proveedores/proveedores.component';
import { SalidasComponent } from './components/Salida/salidas/salidas.component';
import { MaterialAdminModule } from './material/material.module';
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
import { UsuariosComponent } from './components/Configuraciones/usuario/usuarios/usuarios.component';
import { AdminUsuariosComponent } from './components/Configuraciones/usuario/admin-usuarios/admin-usuarios.component';
import { TipoAlmacenComponent } from './components/Configuraciones/tipoDeAlmacen/tipo-almacen/tipo-almacen.component';
import { AdminTipoAlmacenComponent } from './components/Configuraciones/tipoDeAlmacen/admin-tipo-almacen/admin-tipo-almacen.component';
import { AdminTipoEntradaComponent } from './components/Configuraciones/tipoDeEntrada/admin-tipo-entrada/admin-tipo-entrada.component';
import { AdminTipoMedidaComponent } from './components/Configuraciones/tipoDeMedida/admin-tipo-medida/admin-tipo-medida.component';
import { AdminTipoSalidaComponent } from './components/Configuraciones/tipoDeSalida/admin-tipo-salida/admin-tipo-salida.component';
import { AdminTipoProductoComponent } from './components/Configuraciones/tipoDeProducto/admin-tipo-producto/admin-tipo-producto.component';
import { AdminTipoEntregaComponent } from './components/Configuraciones/tipoDeEntrega/admin-tipo-entrega/admin-tipo-entrega.component';
import { ReporteProveedorComponent } from './components/Reportes/reporte-proveedor/reporte-proveedor.component';
import { AdminSalidasComponent } from './components/Salida/admin-salidas/admin-salidas.component';
import { EntradaModalComponent } from './components/Modals/entrada-modal/entrada-modal.component';
import { EditEntradasComponent } from './components/Entrada/edit-entradas/edit-entradas.component';
import { EditSalidasComponent } from './components/Salida/edit-salidas/edit-salidas.component';
import { ProveedorModalComponent } from './components/Modals/proveedor-modal/proveedor-modal.component';
import { UsuarioModalComponent } from './components/Modals/usuario-modal/usuario-modal.component';
import { TipoDeAlmacenModalComponent } from './components/Modals/configuracion-modal/tipo-de-almacen-modal/tipo-de-almacen-modal.component';
import { TipoDeEntradaModalComponent } from './components/Modals/configuracion-modal/tipo-de-entrada-modal/tipo-de-entrada-modal.component';
import { TipoDeMedidaModalComponent } from './components/Modals/configuracion-modal/tipo-de-medida-modal/tipo-de-medida-modal.component';
import { TipoDeEntregaModalComponent } from './components/Modals/configuracion-modal/tipo-de-entrega-modal/tipo-de-entrega-modal.component';
import { TipoDeProductoModalComponent } from './components/Modals/configuracion-modal/tipo-de-producto-modal/tipo-de-producto-modal.component';
import { TipoDeSalidaModalComponent } from './components/Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { VistaInicialComponent } from './components/Inicio/vista-inicial/vista-inicial.component';
import { ReporteEntradaProductoComponent } from './components/Reportes/reporte-entrada-producto/reporte-entrada-producto.component';
import { ReporteSalidaProductoComponent } from './components/Reportes/reporte-salida-producto/reporte-salida-producto.component';
import { NuevoProductModalComponent } from './components/Modals/nuevo-product-modal/nuevo-product-modal.component';
import { ReporteTransparenciaComponent } from './components/Reportes/reporte-transparencia/reporte-transparencia.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AlmacenAdminAppComponent,
    EntradasComponent,
    ModalComponent,
    ProductosComponent,
    ProveedoresComponent,
    SalidasComponent,
    TipoMedidaComponent,
    TipoEntradaComponent,
    TipoSalidaComponent,
    TipoProductoComponent,
    TipoEntregaComponent,
    InventarioExistenteComponent,
    ReporteEntradaComponent,
    ReporteSalidaComponent,
    AdminEntradasComponent,
    AdminProductosComponent,
    AdminProveedoresComponent,
    UsuariosComponent,
    AdminUsuariosComponent,
    TipoAlmacenComponent,
    AdminTipoAlmacenComponent,
    AdminTipoEntradaComponent,
    AdminTipoMedidaComponent,
    AdminTipoSalidaComponent,
    AdminTipoProductoComponent,
    AdminTipoEntregaComponent,
    ReporteProveedorComponent,
    AdminSalidasComponent,
    EntradaModalComponent,
    EditEntradasComponent,
    EditSalidasComponent,
    ProveedorModalComponent,
    UsuarioModalComponent,
    TipoDeAlmacenModalComponent,
    TipoDeEntradaModalComponent,
    TipoDeMedidaModalComponent,
    TipoDeEntregaModalComponent,
    TipoDeProductoModalComponent,
    TipoDeSalidaModalComponent,
    VistaInicialComponent,
    ReporteEntradaProductoComponent,
    ReporteSalidaProductoComponent,
    NuevoProductModalComponent,
    ReporteTransparenciaComponent
  ],
  imports: [
    CommonModule,
    MaterialAdminModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
  ]
})
export class AdminModule implements OnInit{

  ngOnInit(): void {
  }
}
