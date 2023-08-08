import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoSalida, tipoSalida } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeSalidaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoSalida(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoSalidaHeader = {headers: headers}

    const getTipoSalida = `${url}/TipoSalida?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoSalida, tipoSalidaHeader)
  }

  public filterTipoSalida(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoSalidaHeader = {headers: headers}

    const getTipoSalida = `${url}/TipoSalida/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoSalida, tipoSalidaHeader)
  }

  public postTipoSalida(url: string, data: postTipoSalida, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoSalidaHeader = {headers: headers}

    const postTipoSalida = `${url}/TipoSalida`
    return this.http.post(postTipoSalida, data, tipoSalidaHeader)
  }

  public editTipoSalida(url: string, data: tipoSalida, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoSalidaHeader = {headers: headers}

    const editTipoSalida = `${url}/TipoSalida`
    return this.http.put(editTipoSalida, data, tipoSalidaHeader)
  }

  public removeTipoSalida(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoSalidaHeader = {headers: headers}

    const removeTipoSalida = `${url}/TipoSalida/${id}`
    return this.http.delete(removeTipoSalida, tipoSalidaHeader)
  }
}
