import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoDeProductoModalComponent } from '../../../Modals/configuracion-modal/tipo-de-producto-modal/tipo-de-producto-modal.component';
import { tipoProducto } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-tipo-producto',
  templateUrl: './admin-tipo-producto.component.html',
  styleUrls: ['./admin-tipo-producto.component.css']
})
export class AdminTipoProductoComponent {

  data = [
    {
      id: 1,
      nombre: 'Azucar'
    },
    {
      id:2,
      nombre: 'Cafe'
    }
  ]

  dataFiltered: tipoProducto[] = this.data;
  filterTipoProducto: FormGroup;

  constructor(public dialog: MatDialog, public fb: FormBuilder) {
    this.filterTipoProducto = new FormGroup({
      filter: new FormControl(''),
    })
  }

  onInputFilterChange(event: Event) {
    const searchTerm = event.target as HTMLInputElement;
    if (searchTerm.value.length >= 2) {
      this.dataFiltered = this.data;
      this.dataFiltered = this.dataFiltered.filter(item => {
        return item.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
      })

    } else {
      this.dataFiltered = this.data;
    }
  }

  openModal(item: tipoProducto) {
    this.dialog.open(TipoDeProductoModalComponent, {data: item})
  }

  removeAlert(){
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el tipo de producto.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result)=> {
      if(result.isConfirmed)console.log('Eliminalo')
      else console.log('No, Mala mia')
    });
  }
}
