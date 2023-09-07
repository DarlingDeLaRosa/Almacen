import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorModalComponent } from '../../Modals/proveedor-modal/proveedor-modal.component';
import { proveedor } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit{

  dataFiltered: proveedor[] = []
  filterProveedor: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;


  constructor(
    public dialog: MatDialog,
    private api: proveedorService,
    private store: Store<{ app: AppState }>
    ){
    this.filterProveedor = new FormGroup({
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

      this.getProveedor()
    })
  }

  getProveedor() {

    this.loading = true;

    this.api.getProveedor(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {

        this.loading = false;

        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          this.loading = false
          alertServerDown();
        } 
      });
  }

  dataFilter() {
    console.log(this.filterProveedor.value.filter)
    if (this.filterProveedor.value.filter.length >= 3) {

      this.api.filterProveedor(this.url, this.token, this.pagina, this.filterProveedor.value.filter)
      .subscribe((res: any)=> {
        this.noPage = res.cantPage
        this.dataFiltered = res.data

        ,() => {
          alertServerDown();
        } 
      })

    } else {
      this.getProveedor()
    }
  }

  openModal(item: proveedor) {
    let dialogRef = this.dialog.open(ProveedorModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(()=> {
      this.getProveedor()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeProveedor(this.url, item, this.token)
        .subscribe((res: any) => {
          loading(false)

          if (res) {
            alertRemoveSuccess()
            this.getProveedor()
          } else {
            alertIsSuccess(false)
          }
          () => {
            loading(false)
            alertServerDown();
          }
        })
    }
  }


  nextPage(){
    if(this.pagina < this.noPage){
      this.pagina += 1
      this.getProveedor()
    }
  }

  previousPage(){
    if(this.pagina > 1){
      this.pagina -= 1
      this.getProveedor()
    }
  }
}
