import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuiasComponentService {

  private http = inject(HttpClient)

  constructor() { }

  public getDocumentosPerGuia = (id_guia: any) => {
    return this.http.get(`http://192.168.2.103:8000/api/documentos/getDocumentosPerGuia/${id_guia}`);
  }

  public getGuiasPerClient = (id_cliente: any) => {
    return this.http.get(`http://192.168.2.103:8000/api/guias/getGuiasPerClient/${id_cliente}`);
  }

  public getDocumentoPDF = (id_guia: any, id_documento: any) => {
    return this.http.get(`http://192.168.2.103:8000/api/documentos/getDocumentoPDF/${id_guia}/${id_documento}`, { responseType: 'blob' });
  }

  public getGuiaPDF = (id_guia: any, id_cliente: any) => {
    return this.http.get(`http://192.168.2.103:8000/api/guias/getGuiaPDF/${id_guia}/${id_cliente}`, { responseType: 'blob' });
  }

}
