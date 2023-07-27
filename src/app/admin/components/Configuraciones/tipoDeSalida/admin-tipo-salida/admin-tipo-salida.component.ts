import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-tipo-salida',
  templateUrl: './admin-tipo-salida.component.html',
  styleUrls: ['./admin-tipo-salida.component.css']
})
export class AdminTipoSalidaComponent {

  data = [
    {
      id: 1, nombre: 'Donacion', descripcion: 'Cedido a un particular'
    },
    {
      id: 2, nombre: 'Asignado', descripcion: 'Entregado a un departamento para su uso',
    },
    {
      id: 3, nombre: 'Removido', descripcion: 'Desechado',
    },
    {
      id: 4, nombre: 'Robo', descripcion: 'Auto entrega de un particular',
    },
    {
      id: 5, nombre: 'Desaparicion', descripcion: 'No lo encontramos',
    }
  ]

  dataFiltered: tipoSalida[] = this.data;
  filterTipoSalida: FormGroup;

  constructor(public dialog: MatDialog, public fb: FormBuilder) {
    this.filterTipoSalida = new FormGroup({
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

  openModal(item: tipoSalida) {
    this.dialog.open(TipoDeSalidaModalComponent, {data: item})
  }

  removeAlert() {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Estas seguro que deseas eliminar el tipo de salida.',
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
