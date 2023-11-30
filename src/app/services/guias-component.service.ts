import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from './../environment';

@Injectable({
  providedIn: 'root'
})
export class GuiasComponentService {

  private http = inject(HttpClient)
  private url = `${environment.apiUrl}`;

  constructor() { }

  public getDocumentosPerGuia = (id_guia: any) => {
    return this.http.get(`${this.url}documentos/getDocumentosPerGuia/${id_guia}`);
  }

  public getGuiasPerClient = (id_cliente: any) => {
    return this.http.get(`${this.url}guias/getGuiasPerClient/${id_cliente}`);
  }

  public getDocumentoPDF = (id_guia: any, id_documento: any) => {
    return this.http.get(`${this.url}documentos/getDocumentoPDF/${id_guia}/${id_documento}`, { responseType: 'blob' });
  }

  public getGuiaPDF = (id_guia: any, id_cliente: any) => {
    return this.http.get(`${this.url}guias/getGuiaPDF/${id_guia}/${id_cliente}`, { responseType: 'blob' });
  }

  public getProductos = () => {
    return this.http.get(`${this.url}productos/getProductos`);
  }

  public addPedido = (pedido: any) => {
    return this.http.post("http://192.168.1.9:8000/api/pedidos/addPedido", pedido);
  }

}
