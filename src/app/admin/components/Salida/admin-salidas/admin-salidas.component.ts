import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import Swal from 'sweetalert2';
import { combineLatest } from 'rxjs';
import { alertRemoveSure } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-salidas',
  templateUrl: './admin-salidas.component.html',
  styleUrls: ['./admin-salidas.component.css']
})
export class AdminSalidasComponent implements OnInit{
  url: string = ''
  token: string = ''
  pagina: number = 0
  filterSalida: FormGroup;

  constructor(
    public dialog: MatDialog,
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

      //this.getSalida()
    })
  }

  onInputFilterChange(event: Event) {
    console.log(event)
  }

  async removeAlert(item: number){
    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      //this.api.removeTipoSalida(this.url, item, this.token)
        //.subscribe((res: any) => {

          //if (res) {
          //  alertRemoveSuccess()
            //this.getTipoSalida()
          //} else {
          //  alertIsSuccess(false)
          //}
          //() => {
          //  alertServerDown();
          //}
        //})
    }
  }
}
