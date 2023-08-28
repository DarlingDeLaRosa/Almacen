import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salida } from 'src/app/admin/models/interfaces';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { ShowDetailsSalidaComponent } from '../../Modals/show-details-salida/show-details-salida.component';

@Component({
  selector: 'app-admin-salidas',
  templateUrl: './admin-salidas.component.html',
  styleUrls: ['./admin-salidas.component.css']
})
export class AdminSalidasComponent implements OnInit {

  dataFiltered!: salida[]
  filterSalida: FormGroup;
  url: string = ''
  token: string = ''
  pagina: number = 1
  noPage: number = 1
  idRol: number = 0

  constructor(
    public dialog: MatDialog,
    private api: salidaService,
    private store: Store<{ app: AppState }>) {
    this.filterSalida = new FormGroup({
      filter: new FormControl(''),
    })
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, idRole]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRole

      this.getSalida()
    })
  }

  getSalida() {
    this.api.getSalida(this.url, this.token, this.pagina)
      .subscribe((res: any) => {
        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  onInputFilterChange() {
    if (this.filterSalida.value.filter.length >= 2) {

      this.api.filterSalida(this.url, this.token, this.pagina, this.filterSalida.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })

    } else {
      this.getSalida()
    }
  }

  openModal(detailId: number) {
    let dialogRef = this.dialog.open(ShowDetailsSalidaComponent, {data: detailId})

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  async removeAlert(item: number) {
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      this.api.removeSalida(this.url, item, this.token)
        .subscribe((res: any) => {
          
          if (res.sucess) {
            alertRemoveSuccess()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getSalida()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getSalida()
    }
  }

}
