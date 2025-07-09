import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


const primeNgComponents = [
  TableModule,
  InputTextModule,
  ButtonModule
]

@NgModule({
  imports: [primeNgComponents],
  exports: [primeNgComponents]
})
export class PrimeNgAdminModule { }
