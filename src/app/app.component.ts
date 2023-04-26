import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'verFacturaAda';
  consultaFactura: string = '';

  ngOnInit(): void {
    const fact = this.getParameterByName('fact');
    if (isDevMode()) {
      console.log('fact: ', fact);
    }
    if (fact) {
      //this.consultaFactura = JSON.parse(window.atob(fact));
    }
  }

  getParameterByName(name: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let url = location.href;
    url = url.substring(url.indexOf('?fact='), url.length);
    const results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
