import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenAppComponent } from './components/almacen-app/almacen-app.component';
import { AuthComponent } from './components/auth/auth.component';
import { EntradasComponent } from './components/entradas/entradas.component';

const routes: Routes = [
  {path: '', component: AlmacenAppComponent},
  {path: 'login', component: AuthComponent},
  {path: 'entradas', component: EntradasComponent},
  {path: 'articulos', component: AlmacenAppComponent},
  {path: '', component: AlmacenAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
