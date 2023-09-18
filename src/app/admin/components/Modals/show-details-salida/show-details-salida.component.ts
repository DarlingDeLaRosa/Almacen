import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { salidaService } from 'src/app/admin/Services/salida.service';
import { detalleByIdSalida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';
import { catchError, combineLatest } from 'rxjs';
import { alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-show-details-salida',
  templateUrl: './show-details-salida.component.html',
  styleUrls: ['./show-details-salida.component.css']
})
export class ShowDetailsSalidaComponent {
  filterOptions: any = []
  url!: string;
  token!: string
  detallesList: detalleByIdSalida[] = []
  id!: number  
  tipoSalida: string = '' 

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: any,
    private api: salidaService,
    private dialogRef: MatDialogRef<ShowDetailsSalidaComponent>,
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit() {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getDetailsFromSalida()
    })
  }

  getDetailsFromSalida(){
    this.api.getDetalleSalida(this.url, this.token, this.item.idSalida)
    .pipe(
      catchError((error) => {
        alertServerDown();
        return error;
      })
    )
    .subscribe((res: any)=>{
      console.log(this.item)
      this.detallesList = res.data
      this.id = this.detallesList[0].idSalida
      this.tipoSalida = this.item.tipoSalida.nombre 
    })
  }

  closeModal() {
    this.dialogRef.close()
  }

}
