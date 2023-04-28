import { Component, OnInit, isDevMode } from '@angular/core';
import { FacturaService } from './services/factura.service';
import { Parameters } from './interface/parameters.interface';
import { FacturaShared } from './interface/factura.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'verFacturaAda';
  consultaFactura: string = '';
  factura: FacturaShared = {
    legalNumbe: 0,
    compan: 0,
    contactN: '---',
    dsprefijo: '---',
    tipoDocumentoElectronico: '---',
    valorBrutomasTributos: 0,
    codigoCliente: 0,
  };
  loading: boolean = false;
  showBotones: boolean = false;

  constructor(private router: Router, private facturaService: FacturaService) {}

  ngOnInit(): void {
    const consulta = this.getParameterUrl();
    if (isDevMode()) {
      console.log('consultaDev: ', consulta);
    }
    if (consulta.factura && consulta.company) {
      this.consultarFactura(consulta.factura, consulta.company);
    }
  }

  consultarFactura(factura: string, company: string) {
    this.loading = true;
    this.facturaService.getConsultaInfoFactura(factura, company).subscribe({
      next: response => {
        this.factura = response;
        this.loading = false;
        this.showBotones = true;
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al consultar la factura. Inténtelo más tarde.',
        });
        console.error(err);
        this.loading = false;
      },
    });
  }

  aceptarRechazarFactura(accion: number) {
    if (!this.factura.legalNumbe && !this.factura.compan) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe consultar una factura primeramente.',
      });
      return;
    }

    this.facturaService.setAceptarRechazarFactura('' + this.factura.legalNumbe, '' + this.factura.compan, accion).subscribe({
      next: response => {
        let respuesta = accion === 1 ? 'aprobado' : 'rechazado';
        Swal.fire({
          icon: 'info',
          title: 'Correo enviado',
          text: `Usted a ${respuesta} la factura ${this.factura.legalNumbe}`,
        });
        this.showBotones = false;
        this.router.navigate(['/']);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al aceptar/rechazar la factura. Inténtelo más tarde.',
        });
        console.error(err);
      },
    });
  }

  getParameterUrl(): Parameters {
    let parametrosConsulta: Parameters = {
      factura: '',
      company: '',
    };
    const regexFactura = new RegExp('[\\?&]factura=([^&#]*)');
    const regexCompany = new RegExp('[\\?&]company=([^&#]*)');
    const url = location.href;
    if (isDevMode()) {
      console.log('[URL]: ', url);
    }
    const urlFacturaCompany = url.substring(url.indexOf('?'), url.length);
    const resultFactura = regexFactura.exec(urlFacturaCompany);
    const resultCompany = regexCompany.exec(urlFacturaCompany);
    const resFactura = resultFactura === null ? '' : decodeURIComponent(resultFactura[1].replace(/\+/g, ' '));
    const resCompany = resultCompany === null ? '' : decodeURIComponent(resultCompany[1].replace(/\+/g, ' '));

    if (!resFactura && !resCompany) {
      return parametrosConsulta;
    }

    return { factura: resFactura, company: resCompany };
  }
}
