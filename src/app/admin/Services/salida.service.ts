import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { detalleProductoSalida, postSalida, putSalida } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class salidaService {

  cantidadItems = 15

  constructor(private http: HttpClient) { }

  public getSalida(url: string, token: string, page: number, itemsPorPage:number, recinto: number| null  = null) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida?page=${page}&CantItems=${itemsPorPage}&idRecinto=${recinto}`
    return this.http.get(getSalida, salidaHeader)
  }

  public getSalidaReport(url: string, token: string, page: number, itemsPorPage:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/getallreport?page=${page}&CantItems=${itemsPorPage}`
    return this.http.get(getSalida, salidaHeader)
  }

  public getSalidaById(url: string, token: string, id:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/${id}`
    return this.http.get(getSalida, salidaHeader)
  }
  
  public getSalidaTransferencia(url: string, token: string, page:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/gettrasferencias/${page}/${this.cantidadItems}`
    return this.http.get(getSalida, salidaHeader)
  }

  public getSalidaTransferenciaFilter(estado: string, url: string, token: string, page:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/gettrasferencias_filter/${estado}/${page}/${this.cantidadItems}`
    return this.http.get(getSalida, salidaHeader)
  }

  public filterSalida(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const getSalida = `${url}/Salida/getbyname?nombre=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getSalida, salidaHeader)
  }

  public postSalida(url: string, data: string, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'token': token, 'Content-Type': 'application/json'})
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

  public authSalida(idSalida:number, url: string, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaHeader = {headers: headers}

    const authSalida = `${url}/Salida/auth_edit/${idSalida}`
    return this.http.put(authSalida, '', salidaHeader)
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

    const getDetalleSalida = `${url}/Salida/getdetallesalidabyidsalida?id=${id}`
    return this.http.get(getDetalleSalida, salidaDetalleHeader)
  }

  public postDetalleSalida(url: string, data: any, token: string) {
    const headers: HttpHeaders = new HttpHeaders({'token': token, 'Content-Type': 'application/json'})
    const detalleSalidaHeader = {headers: headers}

    const postDetalleSalida = `${url}/Salida/adddetalle`
    return this.http.post(postDetalleSalida, data, detalleSalidaHeader)
  }

  public getAllDetalleSalida(url: string, token: string, page: number, data: string, desde:any, hasta: any) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const salidaDetalleHeader = {headers: headers}

    const getDetalleSalida = `${url}/Salida/getbynamedetailsreport?nombre=${data}&desde=${desde}&hasta=${hasta}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getDetalleSalida, salidaDetalleHeader)
  }

  // Salida Departamento

  public getTipoDepartamento(url: string, token: string, page: number,  noPage:number){
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const departamentoHeader = {headers: headers}

    const getDepartamento = `${url}/Departamento?page=${page}&CantItems=${noPage}`
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

    const getproducto = `${url}/Salida/getproducto${id}`
    return this.http.get(getproducto, productoHeader)
  }
}
