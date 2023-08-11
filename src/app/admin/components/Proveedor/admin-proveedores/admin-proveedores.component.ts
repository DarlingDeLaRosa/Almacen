import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorModalComponent } from '../../Modals/proveedor-modal/proveedor-modal.component';
import Swal from 'sweetalert2';
import { proveedor } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit{

  dataFiltered!: proveedor[]
  filterProveedor: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1

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
    this.api.getProveedor(this.url, this.token, this.pagina,)
      .subscribe((res: any) => {
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    console.log(this.filterProveedor.value.filter)
    if (this.filterProveedor.value.filter.length >= 3) {

      this.api.filterProveedor(this.url, this.token, this.pagina, this.filterProveedor.value.filter)
      .subscribe((res: any)=> {
        console.log(res)
        this.dataFiltered = res.data
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
      this.api.removeProveedor(this.url, item, this.token)
        .subscribe((res: any) => {

          if (res) {
            alertRemoveSuccess()
            this.getProveedor()
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
