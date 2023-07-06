import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Marca', 'Modelo', 'Serial', 'Condicion', 'Precio', 'Stock', 'Editar', 'Eliminar'];
  data = [
    {
      Nombre: 'Azucar', Descripcion: 'azucar blanca', Marca: 'Lider', Modelo: 'Sacarosa',
      Serial: '100010023', Condicion: 'Nuevo', Precio: 2000, Stock: 78
    },
    {
      Nombre: 'Cafe', Descripcion: 'Cafe arabica', Marca: 'Cafe Santo Domingo', Modelo: 'Caturra',
      Serial: '100012294', Condicion: 'Nuevo', Precio: 4000, Stock: 91
    }
  ];

  constructor(public dialog: MatDialog) { }

  openModal() {
    this.dialog.open(ModalComponent)
  }
}
