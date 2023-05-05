import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaShared } from '../interface/factura.interface';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  urlRest: string = 'https://srv-appeon-000-w23.adacsc.co/RespuestaaEvento/';

  constructor(private http: HttpClient) {}

  getConsultaInfoFactura(factura: string, compania: string): Observable<FacturaShared> {
    const url = `${this.urlRest}factura/${factura}/${compania}`;
    return this.http.get<FacturaShared>(url);
  }

  setAceptarRechazarFactura(factura: string, compania: string, accion: number): Observable<FacturaShared> {
    const url = `${this.urlRest}enviarcorreo/${factura}/${compania}/${accion}`;
    return this.http.post<FacturaShared>(url, '');
  }
}
