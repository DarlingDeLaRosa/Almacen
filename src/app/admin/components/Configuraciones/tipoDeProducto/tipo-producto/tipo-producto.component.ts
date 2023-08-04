import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess } from '../../../../Helpers/alertsFunctions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {
  formTipoProducto: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    //private api: TipoDeSalidaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoProducto = new FormGroup({
      nombre: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }


  sendData() {
    const respuesta: boolean = true;

    if (this.formTipoProducto.valid) {
      console.log(this.formTipoProducto.value)

      alertIsSuccess(respuesta)
      this.formTipoProducto.reset()
    }
  }

  //let dataTipoSalida: GET = { data: [], message: '', success: false };
  //
  //  if (this.formTipoSalida.valid) {
  //
  //    this.api.postTipoSalida(this.url, this.formTipoSalida.value, this.token)
  //      .subscribe((res: any) => {
  //
  //        dataTipoSalida = res
  //
  //        if (dataTipoSalida.success) {
  //          alertIsSuccess(true)
  //          this.formTipoSalida.reset()
  //        } else {
  //          alertIsSuccess(false)
  //        }
  //        ()=> {
  //          alertServerDown();
  //        }})
  //
  //  }
  //}
}
