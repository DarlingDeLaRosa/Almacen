import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { postTipoSalida } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeSalidaService{

  constructor(private http: HttpClient) { }

  public getTipoSalida(url: string) {
    const getTipoSalida = `${url}/TipoSalida`
    return this.http.get(getTipoSalida)
  }

  public postTipoSalida(url: string, data: postTipoSalida) {
    const postTipoSalida = `${url}/TipoSalida`
    return this.http.post(postTipoSalida, data)
  }

  //edit
  public removeTipoSalida(url: string, id: number) {
    const removeTipoSalida = `${url}/TipoSalida:${id}`
    return this.http.delete(removeTipoSalida)
  }
}
