import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postProveedor, proveedor } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class proveedorService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getProveedor(url: string, token: string, page: number, noPage:number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const getTipoProveedor = `${url}/Proveedor?page=${page}&CantItems=${noPage}`
    return this.http.get(getTipoProveedor, proveedorHeader)
  }

  public filterProveedor(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const getproveedor = `${url}/Proveedor/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getproveedor, proveedorHeader)
  }

  public findProveedorByRNC(url: string, token: string, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const getproveedor = `${url}/Proveedor/consultaproveedorbyrnc/${data}`
    return this.http.get(getproveedor, proveedorHeader)
  }

  public findProveedorByRS(url: string, token: string, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const getproveedor = `${url}/Proveedor/consultaproveedorbynombre/${data}`
    return this.http.get(getproveedor, proveedorHeader)
  }

  public postProveedor(url: string, data: postProveedor, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const postproveedor = `${url}/Proveedor`
    return this.http.post(postproveedor, data, proveedorHeader)
  }

  public editProveedor(url: string, data: proveedor, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const editProveedor = `${url}/Proveedor`
    return this.http.put(editProveedor, data, proveedorHeader)
  }

  public removeProveedor(url: string, id: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const proveedorHeader = {headers: headers}

    const removeProveedor = `${url}/Proveedor/${id}`
    return this.http.delete(removeProveedor, proveedorHeader)
  }
}
