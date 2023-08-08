import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { alertIsSuccess, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeMedidaService } from 'src/app/admin/Services/Configuracion/tipo-de-medida.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-medida',
  templateUrl: './tipo-medida.component.html',
  styleUrls: ['./tipo-medida.component.css']
})
export class TipoMedidaComponent {
  formTipoMedida: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    private api: TipoDeMedidaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoMedida = new FormGroup({
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {
    let dataTipoMedida: GET = { data: [], message: '', success: false, cantItem: 0, cantPage: 0, currentPage: 0 }
    if (this.formTipoMedida.valid) {

      this.api.postTipoMedida(this.url, this.formTipoMedida.value, this.token)
        .subscribe((res: any) => {

          dataTipoMedida = res

          if (dataTipoMedida.success) {
            alertIsSuccess(true)
            this.formTipoMedida.reset()
          } else {
            alertIsSuccess(false)
          }
          () => {
            alertServerDown();
          }
        })

    }
  }
}
