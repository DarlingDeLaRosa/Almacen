import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { GET, getTipoSalida, removeTipoSalida, tipoSalida } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { alertIsSuccess, alertRemoveSure } from '../../../../Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-admin-tipo-salida',
  templateUrl: './admin-tipo-salida.component.html',
  styleUrls: ['./admin-tipo-salida.component.css']
})
export class AdminTipoSalidaComponent implements OnInit {

  dataFiltered: getTipoSalida[] = [
    {
      creadoPor: 0,
      descripcion: '',
      fechaCreacion: '',
      fechaModif: '',
      idTipoSalida: 0,
      nombre: ''
    }
  ]
  filterTipoSalida: FormGroup;

  constructor(public dialog: MatDialog, public fb: FormBuilder, private api: TipoDeSalidaService, private store: Store<{ app: AppState }>) {

    this.filterTipoSalida = new FormGroup({
      filter: new FormControl(''),
    })
  }


  ngOnInit() {
    let url = ''

    this.store.select(state => state.app.path).subscribe((path: string) => {
      url = path;
    });

    this.api.getTipoSalida(url)
      .subscribe((res: any) => {
        this.dataFiltered = res.data
        console.log(res)
    })
  }



  onInputFilterChange(event: Event) {
    const searchTerm = event.target as HTMLInputElement;
    if (searchTerm.value.length >= 2) {
      //this.dataFiltered = this.data;
      this.dataFiltered = this.dataFiltered.filter(item => {
        return item.nombre.toLowerCase().includes(searchTerm.value.toLowerCase());
      })

    } else {
      //this.dataFiltered = this.data;
    }
  }

  openModal(item: getTipoSalida) {
    this.dialog.open(TipoDeSalidaModalComponent, { data: item })
  }

  removeAlert(item: removeTipoSalida) {
    let url = ''

    this.api.removeTipoSalida(url, item.id)
    alertRemoveSure(true)
  }
}
