import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  displayedColumns: string[] = ['nombre', 'rnc', 'representante', 'Editar', 'Eliminar'];
  data = [
    {
      nombre: 'Azucar', rnc: 'azucar blanca', representante: 'Lider',
    },
  ];

  constructor(public dialog: MatDialog) { }

  openModal() {
    //this.dialog.open(ModalComponent)
  }
}
