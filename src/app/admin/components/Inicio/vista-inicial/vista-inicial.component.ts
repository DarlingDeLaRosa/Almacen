import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { alertServerDown } from 'src/app/admin/Helpers/alertsFunctions';
import { productoService } from 'src/app/admin/Services/producto.service';
import { producto } from 'src/app/admin/models/interfaces';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-vista-inicial',
  templateUrl: './vista-inicial.component.html',
  styleUrls: ['./vista-inicial.component.css']
})
export class VistaInicialComponent {

  itemEscasez: number = 0
  url: string = ''
  token: string = ''
  loading: boolean = false;

  constructor(
    private api: productoService,
    private store: Store<{ app: AppState }>
  ) {}
  
  ngOnInit(): void {
    combineLatest([
      this.store.select(state => state.app.token),
      this.store.select(state => state.app.path)
    ]).subscribe(([tokenValue, pathValue]) => {

      this.url = pathValue;
      this.token = tokenValue;

      this.getProductoAgotamineto()
    })
  }

  getProductoAgotamineto() {
    this.loading = true

    this.api.getProductoEscazes(this.url, this.token, 1)
      .subscribe((res: any) => {

        this.loading = false

        console.log(res)
        this.itemEscasez = res.data.length

          , () => {
            this.loading = false
            alertServerDown();
          }
      });
  }

}
