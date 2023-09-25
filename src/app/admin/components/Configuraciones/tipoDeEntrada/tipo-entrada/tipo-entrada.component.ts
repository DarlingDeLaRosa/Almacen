import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertServerDown, loading } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeEntradaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrada.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-entrada',
  templateUrl: './tipo-entrada.component.html',
  styleUrls: ['./tipo-entrada.component.css']
})
export class TipoEntradaComponent implements OnInit {
  formTipoEntrada: FormGroup;
  url!: string;
  token!: string

  constructor(
    public fb: FormBuilder,
    private api: TipoDeEntradaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoEntrada = this.fb.group({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {

    if (this.formTipoEntrada.valid) {
      loading(true)
      this.api.postTipoEntrada(this.url, this.formTipoEntrada.value, this.token)
        .pipe(
          catchError((error) => {
            loading(false)
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          loading(false)
          if (res.data !== null) { alertIsSuccess(true); this.formTipoEntrada.reset() }
          else alertIsSuccess(false)
        })

    }else{
      alertNoValidForm()
    }
  }
}
