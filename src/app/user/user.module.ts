import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AlmacenUserComponent } from './components/almacen-user/almacen-user.component';
import { MaterialUserModule } from './material/material.module';
import { VistaInicialUserComponent } from './inicio/vista-inicial-user/vista-inicial-user.component';
import { AdminModule } from '../admin/admin.module';
import { UserSalidasComponent } from './components/salidas/user-salidas/user-salidas.component';
import { EditUserSalidasComponent } from './components/salidas/edit-user-salidas/edit-user-salidas.component';
import { AdminUserSalidasComponent } from './components/salidas/admin-user-salidas/admin-user-salidas.component';
import { EditUserEntradasComponent } from './components/entradas/edit-user-entradas/edit-user-entradas.component';
import { AdminUserEntradasComponent } from './components/entradas/admin-user-entradas/admin-user-entradas.component';
import { UserEntradasComponent } from './components/entradas/user-entradas/user-entradas.component';

@NgModule({
  declarations: [
    AlmacenUserComponent,
    VistaInicialUserComponent,
    UserSalidasComponent,
    EditUserSalidasComponent,
    AdminUserSalidasComponent,
    EditUserEntradasComponent,
    AdminUserEntradasComponent,
    UserEntradasComponent
  ],
  imports: [
    AdminModule,
    CommonModule,
    UserRoutingModule,
    MaterialUserModule
  ]
})
export class UserModule { }
