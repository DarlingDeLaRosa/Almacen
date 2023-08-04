import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NuevoProductModalComponent } from '../../Modals/nuevo-product-modal/nuevo-product-modal.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { detalleProducto } from 'src/app/admin/models/interfaces';
import { alertRemoveSure } from 'src/app/admin/Helpers/alertsFunctions';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  formEntrada: FormGroup;
  formDetalleEntrada: FormGroup;
  url!: string;
  token!: string

  detailGroup: detalleProducto[] = [];
  generalITBIS: boolean = false;
  serial: boolean = false;

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formEntrada = this.fb.group({
      itbisGeneral: new FormControl(''),
      fecha: new FormControl('', Validators.required),
      recinto: new FormControl('', Validators.required),
      proveedor: new FormControl('', Validators.required),
      tipoAlmacen: new FormControl('', Validators.required),
      tipoEntrada: new FormControl('', Validators.required),
      tipoEntrega: new FormControl('', Validators.required),
      noEntrada: new FormControl('', Validators.required),
      noContrato: new FormControl('', Validators.required),
      noFactura: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      ITBIS: new FormControl(''),
    });

    this.formDetalleEntrada = this.fb.group({
      itbisEspecifico: new FormControl(''),
      producto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      noSerial: new FormControl(''),
      ITBISArticulo: new FormControl(''),
      subtotal: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  openModal() {
    this.dialog.open(NuevoProductModalComponent)
  }

  itbisOption(event: any) {
    this.generalITBIS = event.value;
  }

  serialOption(event: any) {
    this.serial = event.value
  }

  getItbis() {
    //return this.data.map((item)=> item.itbis).reduce((acc, value) => acc + value, 0)
  }
  getSubtotal() {
    //return this.data.map((item)=> item.subtotal).reduce((acc, value) => acc + value, 0)
  }


  addDetail(){
    this.formEntrada.value.itbisGeneral = this.generalITBIS
    this.formDetalleEntrada.value.itbisEspecifico = !this.generalITBIS
    this.formDetalleEntrada.value.subtotal =
    this.formDetalleEntrada.value.cantidad * this.formDetalleEntrada.value.precio

    console.log(this.formDetalleEntrada.value)
    console.log(this.formDetalleEntrada.valid)

    if(this.formDetalleEntrada.valid){
      console.log(typeof this.formDetalleEntrada.value)
      console.log(this.formDetalleEntrada.value)

      this.detailGroup.push(this.formDetalleEntrada.value)
      this.formDetalleEntrada.reset()
    }
  }

  editDetail(index: number, item: detalleProducto){

    this.detailGroup.splice(index, 1)

    this.formDetalleEntrada.setValue({
      itbisEspecifico: `${item.itbisEspecifico}`,
      producto: `${item.producto}`,
      cantidad: `${item.cantidad}`,
      condicion: `${item.condicion}`,
      marca: `${item.marca}`,
      modelo: `${item.modelo}`,
      precio: `${item.precio}`,
      noSerial: `${item.noSerial}`,
      ITBISArticulo: `${item.ITBISArticulo}`,
      subtotal: `${item.subtotal}`,
    })
  }

  async removeDetail(index: number){

    let removeChoise: boolean = await alertRemoveSure()

    if(removeChoise){
      this.detailGroup.splice(index, 1)
    }
  }

  sendData() {

    //this.formEntrada.value.itbisGeneral = this.generalITBIS
    //this.formDetalleEntrada.value.itbisEspecifico = !this.generalITBIS
    //this.formDetalleEntrada.value.subtotal =
    //this.formDetalleEntrada.value.cantidad * this.formDetalleEntrada.value.precio

    //let dataEntrada: GET = { data: [], message: '', success: false };

    if (this.formEntrada.valid) {

      //this.api.postTipoSalida(this.url, this.formTipoSalida.value, this.token)
      //  .subscribe((res: any) => {
      //
      //    dataTipoSalida = res
      //
      //    if (dataTipoSalida.success) {
      //      alertIsSuccess(true)
      //      this.formTipoSalida.reset()
      //    } else {
      //      alertIsSuccess(false)
      //    }
      //    ()=> {
      //      alertServerDown();
      //    }})

    }
  }
}
