import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/servicios/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this._ajustes.aplicarTema(tema);
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const element of selectores) {
      element.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for (const element of selectores) {
      if ( element.getAttribute('data-theme') === tema ) {
        element.classList.add('working');
      }
    }
  }

}
