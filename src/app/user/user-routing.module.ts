import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenUserComponent } from './components/almacen-user/almacen-user.component';

// Tengo que saber si podre usar los componentes del admin debido a la ruta que utiliza.. TODO
const routes: Routes = [
  {
    path: '',
    component: AlmacenUserComponent,
    children: [
      //{ path: 'entrada', component: EntradasComponent},
      //{ path: 'reportes', component: },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
