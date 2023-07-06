import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenAdminAppComponent } from '../admin/components/almacen-admin-app/almacen-admin-app.component';
import { EntradasComponent } from '../admin/components/entradas/entradas.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { ReportesComponent } from '../admin/components/reportes/reportes.component';

// Tengo que saber si podre usar los componentes del admin debido a la ruta que utiliza.. TODO
const routes: Routes = [
  {
    path: '',
    component: AlmacenAdminAppComponent,
    children: [
      { path: 'entrada', component: EntradasComponent},
      { path: 'salidas', component: SalidasComponent},
      { path: 'reportes', component: ReportesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
