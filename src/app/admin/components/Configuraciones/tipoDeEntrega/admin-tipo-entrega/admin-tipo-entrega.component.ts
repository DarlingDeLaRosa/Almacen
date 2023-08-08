import { Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoDeEntregaModalComponent } from '../../../Modals/configuracion-modal/tipo-de-entrega-modal/tipo-de-entrega-modal.component';
import { tipoEntrega } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-tipo-entrega',
  templateUrl: './admin-tipo-entrega.component.html',
  styleUrls: ['./admin-tipo-entrega.component.css']
})
export class AdminTipoEntregaComponent  implements OnInit{

  dataFiltered!: tipoEntrega[]
  filterTipoEntrega: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1

  constructor(
    public dialog: MatDialog,
    private api: TipoDeEntregaService,
    private store: Store<{ app: AppState }>
    ){
    this.filterTipoEntrega = new FormGroup({
      filter: new FormControl(''),
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getTipoEntrega()
    })
  }

  getTipoEntrega() {
    this.api.getTipoEntrega(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    if (this.filterTipoEntrega.value.filter.length >= 3) {

      this.api.filterTipoEntrega(this.url, this.token, this.pagina, this.filterTipoEntrega.value.filter)
      .subscribe((res: any)=> {
        this.dataFiltered = res.data
      })

    } else {
      this.getTipoEntrega()
    }
  }

  openModal(item: tipoEntrega) {
    let dialogRef = this.dialog.open(TipoDeEntregaModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getTipoEntrega()
    })
  }

  async removeAlert(item: number){

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeTipoEntrega(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getTipoEntrega()
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
      this.getTipoEntrega()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getTipoEntrega()
    }
  }

}
