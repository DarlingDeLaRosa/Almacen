import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postTipoEntrega, tipoEntrega } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoDeEntregaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getTipoEntrega(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntregaHeader = {headers: headers}

    const getTipoEntrega = `${url}/TipoEntrega?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoEntrega, tipoEntregaHeader)
  }

  public filterTipoEntrega(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntregaHeader = {headers: headers}

    const getTipoEntrega = `${url}/TipoEntrega/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoEntrega, tipoEntregaHeader)
  }

  public postTipoEntrega(url: string, data: postTipoEntrega, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntregaHeader = {headers: headers}

    const postTipoEntrega = `${url}/TipoEntrega`
    return this.http.post(postTipoEntrega, data, tipoEntregaHeader)
  }

  public editTipoEntrega(url: string, data: tipoEntrega, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntregaHeader = {headers: headers}

    const editTipoEntrega = `${url}/TipoEntrega`
    return this.http.put(editTipoEntrega, data, tipoEntregaHeader)
  }

  public removeTipoEntrega(url: string, id: number, token: string) {

    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const tipoEntregaHeader = {headers: headers}

    const removeTipoEntrega = `${url}/TipoEntrega/${id}`
    return this.http.delete(removeTipoEntrega, tipoEntregaHeader)
  }
}
