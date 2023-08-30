import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { Entrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-reporte-entrada',
  templateUrl: './reporte-entrada.component.html',
  styleUrls: ['./reporte-entrada.component.css']
})
export class ReporteEntradaComponent implements OnInit {
  
  dataFiltered!: Entrada[];
  filterReporteEntrada: FormGroup;
  url: string = '';
  token: string = '';
  pagina: number = 1;
  noPage: number = 1;
  idRol: number = 0;

  constructor(
    public dialog: MatDialog,
    private api: entradaService,
    private store: Store<{ app: AppState }>) {
    this.filterReporteEntrada = new FormGroup({
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

      this.getEntrada()
    })
  }

  getEntrada() {
    this.api.getEntrada(this.url, this.token, this.pagina)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  onInputFilterChange() {
    if (this.filterReporteEntrada.value.filter.length >= 2) {

      this.api.filterEntrada(this.url, this.token, this.pagina, this.filterReporteEntrada.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      })

    } else {
      this.getEntrada()
    }
  }

  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getEntrada()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getEntrada()
    }
  }
}
