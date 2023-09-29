import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorModalComponent } from '../../Modals/proveedor-modal/proveedor-modal.component';
import { proveedor } from 'src/app/admin/models/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { proveedorService } from 'src/app/admin/Services/proveedor.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { catchError, combineLatest } from 'rxjs';
import { alertBackMessage, alertIsSuccess, alertRemoveSuccess, alertRemoveSure, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit {

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
  ) {
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

    this.api.getProveedor(this.url, this.token, this.pagina, 15)
      .pipe(
        catchError((error) => {
          this.loading = false
          alertServerDown();
          return error;
        })
      )
      .subscribe((res: any) => {
        this.loading = false;
        this.noPage = res.cantPage
        this.dataFiltered = res.data
      });
  }

  dataFilter() {
    console.log(this.filterProveedor.value.filter)
    if (this.filterProveedor.value.filter.length >= 3) {

      this.api.filterProveedor(this.url, this.token, this.pagina, this.filterProveedor.value.filter)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          this.noPage = res.cantPage
          this.dataFiltered = res.data
        })

    } else {
      this.getProveedor()
    }
  }

  openModal(item: proveedor) {
    let dialogRef = this.dialog.open(ProveedorModalComponent, { data: item })

    dialogRef.afterClosed().subscribe(() => {
      this.getProveedor()
    })
  }

  async removeAlert(item: number) {

    let removeChoise: boolean = await alertRemoveSure()

    if (removeChoise) {
      loading(true)
      this.api.removeProveedor(this.url, item, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)

          if (res.data !== null) { alertRemoveSuccess(); this.getProveedor() }
          else { alertBackMessage(res.message) }
        })
    }
  }


  nextPage() {
    if (this.pagina < this.noPage) {
      this.pagina += 1
      this.getProveedor()
    }
  }

  previousPage() {
    if (this.pagina > 1) {
      this.pagina -= 1
      this.getProveedor()
    }
  }
}
