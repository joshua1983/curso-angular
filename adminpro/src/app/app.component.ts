import { Component } from '@angular/core';
import { SettingsService } from './servicios/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor( public _ajustes:SettingsService){}




}
