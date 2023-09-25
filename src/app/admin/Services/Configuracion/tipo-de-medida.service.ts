import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoMedida, tipoMedida } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeMedidaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoMedida(url: string, token: string, page: number, noPage: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoMedidaHeader = {headers: headers}

    const getTipoMedida = `${url}/UnidadMedida?page=${page}&CantItems=${noPage}`
    return this.http.get(getTipoMedida, tipoMedidaHeader)
  }

  public filterTipoMedida(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoMedidaHeader = {headers: headers}

    const getTipoMedida = `${url}/UnidadMedida/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoMedida, tipoMedidaHeader)
  }

  public postTipoMedida(url: string, data: postTipoMedida, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoMedidaHeader = {headers: headers}

    const postTipoMedida = `${url}/UnidadMedida`
    return this.http.post(postTipoMedida, data, tipoMedidaHeader)
  }

  public editTipoMedida(url: string, data: tipoMedida, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoMedidaHeader = {headers: headers}

    const editTipoMedida = `${url}/UnidadMedida`
    return this.http.put(editTipoMedida, data, tipoMedidaHeader)
  }

  public removeTipoMedida(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoMedidaHeader = {headers: headers}

    const removeTipoMedida = `${url}/UnidadMedida/${id}`
    return this.http.delete(removeTipoMedida, tipoMedidaHeader)
  }
}
