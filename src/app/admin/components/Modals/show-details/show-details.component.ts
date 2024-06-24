import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertServerDown} from 'src/app/admin/Helpers/alertsFunctions';
import { entradaService } from 'src/app/admin/Services/entrada.service';
import { detalleByIdEntrada } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {
  filterOptions: any = []
  url!: string;
  token!: string
  detallesList: detalleByIdEntrada[] = []
  idRol: number = 0;
  id!: number  

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: number,
    private api: entradaService,
    private dialogRef: MatDialogRef<ShowDetailsComponent>,
    private store: Store<{ app: AppState }>
  ) {}

  ngOnInit() {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path),
      this.store.select(state => state.app.user.role.idRol)
    ]).subscribe(([tokenValue, pathValue, idRol]) => {

      this.url = pathValue;
      this.token = tokenValue;
      this.idRol = idRol

      this.getDetailsFromEntrada()
    })
  }

  getDetailsFromEntrada(){
    this.api.getDetalleEntrada(this.url, this.token, this.item)
    .subscribe((res: any)=>{
      this.detallesList = res.data
      this.id = this.detallesList[0].idEntrada
      
      ,() => {
        alertServerDown();
      }
    })
  }

  closeModal() {
    this.dialogRef.close()
  }
}
