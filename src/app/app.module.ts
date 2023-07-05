import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { AuthComponent } from './components/auth/auth.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/reducer';
import { AlmacenAppComponent } from './components/almacen-app/almacen-app.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AlmacenAppComponent,
    EntradasComponent,
    SalidasComponent,
    ProveedoresComponent,
    ReportesComponent,
    ConfiguracionesComponent,
    ProductosComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule ,
    BrowserAnimationsModule,
    StoreModule.forRoot({app: appReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
