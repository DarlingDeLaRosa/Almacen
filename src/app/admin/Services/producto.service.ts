import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postProducto, producto } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class productoService {

  cantidadItems = 15
  constructor(private http: HttpClient) { }

  public getProducto(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const getTipoproducto = `${url}/Producto?page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getTipoproducto, productoHeader)
  }

  public filterProducto(url: string, token: string, page: number, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const getproducto = `${url}/Producto/getbyname?name=${data}&page=${page}&CantItems=${this.cantidadItems}`
    return this.http.get(getproducto, productoHeader)
  }

  public findProductoByCode(url: string, token: string, data: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const getproducto = `${url}/Producto/getbiidcatalogo/${data}`
    return this.http.get(getproducto, productoHeader)
  }

  public postProducto(url: string, data: postProducto, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const postproducto = `${url}/Producto`
    return this.http.post(postproducto, data, productoHeader)
  }

  public editProducto(url: string, data: producto, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const editproducto = `${url}/Producto`
    return this.http.put(editproducto, data, productoHeader)
  }

  public removeProducto(url: string, id: number, token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const removeproducto = `${url}/producto/${id}`
    return this.http.delete(removeproducto, productoHeader)
  }

  // Ezcases de Productos 

  public getProductoEscazes(url: string, token: string, page: number) {
    const headers: HttpHeaders = new HttpHeaders().set('token', token)
    const productoHeader = {headers: headers}

    const getTipoproducto = `${url}/Producto/getproductoreport${page}-${this.cantidadItems}`
    return this.http.get(getTipoproducto, productoHeader)
  }
}
