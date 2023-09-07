import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../Modals/product-modal/modal.component';
import { producto } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { productoService } from 'src/app/admin/Services/producto.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { combineLatest } from 'rxjs';
import { alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, alertUnableToRemove, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  dataFiltered: producto[] = [];
  filterProducto: FormGroup;
  url: string = ''
  noPage: number = 1
  token: string = ''
  pagina: number = 1
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private api: productoService,
    private store: Store<{ app: AppState }>
  ) {
    this.filterProducto = new FormGroup({
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

      this.getProducto()
    })
  }

  getProducto() {
    this.loading = true
    
    this.api.getProducto(this.url, this.token, this.pagina)
      .subscribe((res: any) => {

        this.loading = false

        console.log(res)
        this.noPage = res.cantPage
        this.dataFiltered = res.data

          , () => {
            this.loading = false
            alertServerDown();
          }
      });
  }

  dataFilter() {
    console.log(this.filterProducto.value.filter)
    if (this.filterProducto.value.filter.length >= 3) {

      this.api.filterProducto(this.url, this.token, this.pagina, this.filterProducto.value.filter)
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })

    } else {
      this.getProducto()
    }
  }

  openModal(item: producto) {
    let dialogRef = this.dialog.open(ModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getProducto()
    })
  }

  async removeAlert(item: number, stock: number) {

    if (stock == 0) {
      let removeChoise: boolean = await alertRemoveSure()

      if (removeChoise) {
        loading(true)
        this.api.removeProducto(this.url, item, this.token)
          .subscribe((res: any) => {
            loading(false)
            if (res) {
              alertRemoveSuccess()
              this.getProducto()
            } else {
              alertIsSuccess(false)
            }
            () => {
              loading(false)
              alertServerDown();
            }
          })
      }
    } else {
      alertUnableToRemove()
    }
  }

  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getProducto()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getProducto()
    }
  }
}
