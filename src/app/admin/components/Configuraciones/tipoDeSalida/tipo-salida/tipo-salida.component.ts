import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alertIsSuccess, alertNoValidForm, alertServerDown } from '../../../../Helpers/alertsFunctions';
import { TipoDeSalidaService } from 'src/app/admin/Services/Configuracion/tipo-de-salida.service';
import { AppState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { GET } from 'src/app/admin/models/interfaces';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-tipo-salida',
  templateUrl: './tipo-salida.component.html',
  styleUrls: ['./tipo-salida.component.css']
})
export class TipoSalidaComponent implements OnInit {
  formTipoSalida: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    private api: TipoDeSalidaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoSalida = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {
    if (this.formTipoSalida.valid) {

      this.api.postTipoSalida(this.url, this.formTipoSalida.value, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res.data !== null) { alertIsSuccess(true); this.formTipoSalida.reset() }
          else alertIsSuccess(false)
        })

    }else{
      alertNoValidForm()
    }
  }
}
