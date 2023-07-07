import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AlmacenAdminAppComponent } from './components/almacen-admin-app/almacen-admin-app.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { ModalComponent } from './components/Modals/product-modal/modal.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { MaterialAdminModule } from './material/material.module';


@NgModule({
  declarations: [
    AlmacenAdminAppComponent,
    ConfiguracionesComponent,
    EntradasComponent,
    ModalComponent,
    ProductosComponent,
    ProveedoresComponent,
    ReportesComponent,
    SalidasComponent
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
