import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeEntradaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-entrada-modal/tipo-de-entrada-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { tipoEntrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-tipo-entrada',
  templateUrl: './admin-tipo-entrada.component.html',
  styleUrls: ['./admin-tipo-entrada.component.css']
})
export class AdminTipoEntradaComponent implements OnInit {

  dataFiltered!: tipoEntrada[]
  filterTipoEntrada: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1

  constructor(
    public dialog: MatDialog,
    private api: TipoDeEntradaService,
    private store: Store<{ app: AppState }>
    ){
    this.filterTipoEntrada = new FormGroup({
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

      this.getTipoEntrada()
    })
  }

  getTipoEntrada() {
    this.api.getTipoEntrada(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    if (this.filterTipoEntrada.value.filter.length >= 3) {

      this.api.filterTipoEntrada(this.url, this.token, this.pagina, this.filterTipoEntrada.value.filter)
      .subscribe((res: any)=> {
        this.dataFiltered = res.data
      })

    } else {
      this.getTipoEntrada()
    }
  }

  openModal(item: tipoEntrada) {
    let dialogRef = this.dialog.open(TipoDeEntradaModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getTipoEntrada()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeTipoEntrada(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getTipoEntrada()
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
      this.getTipoEntrada()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getTipoEntrada()
    }
  }

}
