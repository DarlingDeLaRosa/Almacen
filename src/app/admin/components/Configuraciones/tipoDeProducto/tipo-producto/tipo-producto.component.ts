import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess, alertServerDown, loading } from '../../../../Helpers/alertsFunctions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { TipoDeProductoService } from 'src/app/admin/Services/Configuracion/tipo-de-producto.service';
import { GET } from 'src/app/admin/models/interfaces';

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
    private api: TipoDeProductoService,
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
    let dataTipoProducto: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 };

    if (this.formTipoProducto.valid) {
      loading(true)
      this.api.postTipoProducto(this.url, this.formTipoProducto.value, this.token)
        .subscribe((res: any) => {
          loading(false)
          dataTipoProducto = res

          if (dataTipoProducto.success) {
            alertIsSuccess(true)
            this.formTipoProducto.reset()
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

}
