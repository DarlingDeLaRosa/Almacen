import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoDeSalidaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-salida-modal/tipo-de-salida-modal.component';
import { GET, getTipoSalida, removeTipoSalida, tipoSalida } from 'src/app/admin/models/interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from '../../../../Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-admin-tipo-salida',
  templateUrl: './admin-tipo-salida.component.html',
  styleUrls: ['./admin-tipo-salida.component.css']
})
export class AdminTipoSalidaComponent implements OnInit {

  dataFiltered!: getTipoSalida[]
  filterTipoSalida: FormGroup;
  url: string = ''
  token: string = ''
  pagina: number = 0

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private api: TipoDeSalidaService,
    private store: Store<{ app: AppState }>
    ){
    this.filterTipoSalida = new FormGroup({
      filter: new FormControl(''),
    })
  }


  ngOnInit() {

    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getTipoSalida()
    })
  }

  getTipoSalida() {
    this.api.getTipoSalida(this.url, this.token)
      .subscribe((res: any) => {
        this.dataFiltered = res.data
        console.log(res)
      });
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
    let dialogRef = this.dialog.open(TipoDeSalidaModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getTipoSalida()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeTipoSalida(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getTipoSalida()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })
    }
  }
}
