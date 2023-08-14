import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { alertRemoveSure } from 'src/app/admin/Helpers/alertsFunctions';
import { detalleProductoSalida } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
  formSalida: FormGroup;
  formDetalleSalida: FormGroup;
  url!: string;
  token!: string

  detailGroup: detalleProductoSalida[] = [];
  generalITBIS: boolean = true;
  serial: boolean = false;

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private store: Store<{ app: AppState }>
  ) {
    this.formSalida = this.fb.group({
      fecha: new FormControl('', Validators.required),
      idRecinto: new FormControl('', Validators.required),
      idTipoSalida: new FormControl('', Validators.required),
      idTipoAlm: new FormControl('', Validators.required),
      idTipoEntrega: new FormControl('', Validators.required),
      idDepartamento: new FormControl('', Validators.required),
      observacion: new FormControl('', Validators.required),
      creadoPor: new FormControl('', Validators.required),
    });

    this.formDetalleSalida = this.fb.group({
      idProducto: new FormControl('', Validators.required),
      existencia: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      noSerial: new FormControl(''),
    })
  }

  itbisOption(event: any) {
    this.generalITBIS = event.value;
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  addDetail(){
    if(this.formDetalleSalida.valid){
      this.detailGroup.push(this.formDetalleSalida.value)
      this.formDetalleSalida.reset()
    }
  }

  editDetail(index: number, item: detalleProductoSalida){

    this.detailGroup.splice(index, 1)

    this.formDetalleSalida.setValue({
      producto: `${item.idProducto}`,
      cantidad: `${item.cantidad}`,
      condicion: `${item.condicion}`,
      marca: `${item.marca}`,
      modelo: `${item.modelo}`,
      precio: `${item.precio}`,
      noSerial: `${item.noSerial}`,
      existencia: `${item.existencia}`,
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

    if (this.formSalida.valid) {

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
