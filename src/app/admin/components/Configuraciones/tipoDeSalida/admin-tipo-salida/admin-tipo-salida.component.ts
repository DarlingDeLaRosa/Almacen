import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { tipoSalida } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { EditData } from 'src/app/store/actions';

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
  form: FormGroup;


  constructor(public dialog: MatDialog, public fb: FormBuilder, public store: Store<{app: AppState}>) {
    this.form = new FormGroup({
      filter: new FormControl(''),
    })
  }


  onInputChange(event: Event) {
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
    this.store.dispatch(EditData({edit: item}))
    this.dialog.open(TipoDeSalidaModalComponent, {data: item})
  }

  removeAlert() {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Está seguro que desea eliminar el tipo de salida.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }
}
