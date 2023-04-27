import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaShared } from '../interface/factura.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  urlRest: string = 'http://10.1.20.84:3131/RespuestaaEvento/';

  constructor(private http: HttpClient) {}

  getConsultaInfoFactura(factura: string, compania: string): Observable<FacturaShared> {
    const url = `${this.urlRest}factura/${factura}/${compania}`;
    return this.http.get<FacturaShared>(url);
  }

  setAceptarRechazarFactura(factura: string, compania: string, accion: string): Observable<FacturaShared> {
    const url = `${this.urlRest}enviarcorreo/${factura}/${compania}/${accion}`;
    return this.http.get<FacturaShared>(url);
  }
}
