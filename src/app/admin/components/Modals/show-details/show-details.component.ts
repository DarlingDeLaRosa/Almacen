import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
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
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getDetailsFromEntrada()
    })
  }

  getDetailsFromEntrada(){
    this.api.getDetalleEntrada(this.url, this.token, this.item)
    .subscribe((res: any)=>{
      this.detallesList = res.data
      console.log(this.detallesList)
      this.id = this.detallesList[0].idEntrada
    })
  }

  closeModal() {
    this.dialogRef.close()
  }
}
