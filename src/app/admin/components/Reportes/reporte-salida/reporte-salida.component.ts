import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { salida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-salida',
  templateUrl: './reporte-salida.component.html',
  styleUrls: ['./reporte-salida.component.css']
})
export class ReporteSalidaComponent {
  
  dataFiltered: salida[] = [];
  filterReporteSalida: FormGroup;
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: salidaService,
    private store: Store<{ app: AppState }>) {
    this.filterReporteSalida = new FormGroup({
      filter: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
    })
   }

   ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol),
    ]).subscribe(([tokenValue, pathValue, idRol]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRol

      this.getSalida()
    })
  }

  getSalida() {
    this.loading = true

    this.api.getSalida(this.url, this.token, this.pagina)
      .subscribe((res: any) => {

        this.loading = false

        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          this.loading = false
          alertServerDown();
        }  
      });
  }

  onInputFilterChange() {
    if (this.filterReporteSalida.value.filter.length >= 2) {

      this.api.filterSalida(this.url, this.token, this.pagina, this.filterReporteSalida.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          alertServerDown();
        }
      })

    } else {
      this.getSalida()
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
