import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { detalleProductoSalida, postSalida, putSalida } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class salidaService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getSalida(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getSalida, salidaHeader)
  }

  public getSalidaById(url: string, token: string, id:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/${id}`
    return this.http.get(getSalida, salidaHeader)
  }

  public filterSalida(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getSalida, salidaHeader)
  }

  public postSalida(url: string, data: postSalida, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const postSalida = `${url}/Salida`
    return this.http.post(postSalida, data, salidaHeader)
  }

  public editSalida(url: string, data: putSalida, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const editSalida = `${url}/Salida`
    return this.http.put(editSalida, data, salidaHeader)
  }

  public removeSalida(url: string, id: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const removeSalida = `${url}/Salida/${id}`
    return this.http.delete(removeSalida, salidaHeader)
  }

  // Detalles de Salida

  public getDetalleSalida(url: string, token: string, id: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaDetalleHeader = {headers: headers}

    const getDetalleSalida = `${url}/Salida/getdetalleSalidabyid?id=${id}`
    return this.http.get(getDetalleSalida, salidaDetalleHeader)
  }

  public postDetalleSalida(url: string, data: detalleProductoSalida[], token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const detalleSalidaHeader = {headers: headers}

    const postDetalleSalida = `${url}/Salida/adddetalle`
    return this.http.post(postDetalleSalida, data, detalleSalidaHeader)
  }

  // Salida Departamento

  public getTipoDepartamento(url: string, token: string, page: number){
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const departamentoHeader = {headers: headers}

    const getDepartamento = `${url}/Departamento?page=${page}&CantItems=${this.cantidadItems}` // arreglar esto
    return this.http.get(getDepartamento, departamentoHeader)
  }

  public filterTipoDepartamento(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Departamento/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`//areglar esto
    return this.http.get(getSalida, salidaHeader)
  }

  //para llenar el producto peticion por lote

  public findProductoById(url: string, token: string, id: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const getproducto = `${url}/Producto/getbiidcatalogo/${id}`
    return this.http.get(getproducto, productoHeader)
  }
}
