import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { AlmacenSupervisorComponent } from "./components/almacen-supervisor/almacen-supervisor.component";


const routes: Routes = [
  {
    path: '',
    component: AlmacenSupervisorComponent,
    children: [
      //{ path: 'administrar-entrada', component: AdminUserEntradasComponent},
      //{ path: 'administrar-salida', component: AdminUserSalidasComponent},
      { path: 'inicio', component: InicioComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class supervisorRoutingModule { }
