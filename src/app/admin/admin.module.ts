import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AlmacenAdminAppComponent } from './components/almacen-admin-app/almacen-admin-app.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { ModalComponent } from './components/Modals/product-modal/modal.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { MaterialAdminModule } from './material/material.module';
import { TipoMedidaComponent } from './components/tipo-medida/tipo-medida.component';
import { TipoEntradaComponent } from './components/tipo-entrada/tipo-entrada.component';
import { TipoSalidaComponent } from './components/tipo-salida/tipo-salida.component';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { TipoEntregaComponent } from './components/tipo-entrega/tipo-entrega.component';


@NgModule({
  declarations: [
    AlmacenAdminAppComponent,
    EntradasComponent,
    ModalComponent,
    ProductosComponent,
    ProveedoresComponent,
    ReportesComponent,
    SalidasComponent,
    TipoMedidaComponent,
    TipoEntradaComponent,
    TipoSalidaComponent,
    TipoProductoComponent,
    TipoEntregaComponent
  ],
  imports: [
    CommonModule,
    MaterialAdminModule,
    AdminRoutingModule,
  ],
})
export class AdminModule implements OnInit{

  ngOnInit(): void {
  }
}
