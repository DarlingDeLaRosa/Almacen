import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeAlmacenModalComponent } from '../../../Modals/configuracion-modal/tipo-de-almacen-modal/tipo-de-almacen-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { tipoAlmacen } from 'src/app/admin/models/interfaces';
import { TipoDeAlmacenService } from 'src/app/admin/Services/Configuracion/tipo-de-almacen.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-tipo-almacen',
  templateUrl: './admin-tipo-almacen.component.html',
  styleUrls: ['./admin-tipo-almacen.component.css']
})
export class AdminTipoAlmacenComponent implements OnInit {

  dataFiltered!: tipoAlmacen[]
  filterTipoAlmacen: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1


  constructor(
    public dialog: MatDialog,
    private api: TipoDeAlmacenService,
    private store: Store<{ app: AppState }>
    ){
    this.filterTipoAlmacen = new FormGroup({
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

      this.getTipoAlmacen()
    })
  }

  getTipoAlmacen() {
    this.api.getTipoAlmacen(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    if (this.filterTipoAlmacen.value.filter.length >= 3) {

      this.api.filterTipoAlmacen(this.url, this.token, this.pagina, this.filterTipoAlmacen.value.filter)
      .subscribe((res: any)=> {
        this.dataFiltered = res.data
      })

    } else {
      this.getTipoAlmacen()
    }
  }

  openModal(item: tipoAlmacen) {
    let dialogRef = this.dialog.open(TipoDeAlmacenModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getTipoAlmacen()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeTipoAlmacen(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getTipoAlmacen()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })
    }
  }

  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getTipoAlmacen()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getTipoAlmacen()
    }
  }
}
