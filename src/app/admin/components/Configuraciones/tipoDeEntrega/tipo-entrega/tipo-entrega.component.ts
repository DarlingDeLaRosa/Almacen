import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { alertIsSuccess, alertNoValidForm, alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { TipoDeEntregaService } from 'src/app/admin/Services/Configuracion/tipo-de-entrega.service';
import { GET } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-tipo-entrega',
  templateUrl: './tipo-entrega.component.html',
  styleUrls: ['./tipo-entrega.component.css']
})
export class TipoEntregaComponent implements OnInit {
  formTipoEntrega: FormGroup;
  url!: string;
  token!: string


  constructor(
    public fb: FormBuilder,
    private api: TipoDeEntregaService,
    private store: Store<{ app: AppState }>
  ) {
    this.formTipoEntrega = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    })
  }


  ngOnInit(): void {
    this.store.select(state => state.app.path).subscribe((path: string) => { this.url = path; });
    this.store.select(state => state.app.token).subscribe((token: string) => { this.token = token; });
  }

  sendData() {
    if (this.formTipoEntrega.valid) {

      this.api.postTipoEntrega(this.url, this.formTipoEntrega.value, this.token)
        .pipe(
          catchError((error) => {
            alertServerDown();
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res.data !== null) { alertIsSuccess(true); this.formTipoEntrega.reset() }
          else alertIsSuccess(false)
        })

    }else{
      alertNoValidForm()
    }
  }

}
