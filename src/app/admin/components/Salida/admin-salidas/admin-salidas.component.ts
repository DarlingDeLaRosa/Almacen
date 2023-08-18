import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salida } from 'src/app/admin/models/interfaces';
import { ShowDetailsComponent } from '../../Modals/show-details/show-details.component';
import { salidaService } from 'src/app/admin/Services/salida.service';

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
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

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

  onInputFilterChange(event: Event) {
    console.log(event)
  }

  openModal(detailId: number) {
    let dialogRef = this.dialog.open(ShowDetailsComponent, {data: detailId})

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
