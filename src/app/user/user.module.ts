import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AlmacenUserComponent } from './components/almacen-user/almacen-user.component';
import { MaterialUserModule } from './material/material.module';


@NgModule({
  declarations: [
    AlmacenUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialUserModule
  ]
})
export class UserModule { }
