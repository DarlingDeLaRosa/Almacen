import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
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
    if (this.formTipoMedida.valid) {
      loading(true)
      this.api.postTipoMedida(this.url, this.formTipoMedida.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) { alertIsSuccess(true); this.formTipoMedida.reset() }
          else alertIsSuccess(false)
        })

    }else{
      alertNoValidForm()
    }
  }
}
