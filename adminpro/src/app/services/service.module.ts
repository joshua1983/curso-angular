import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivoService
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    HttpClientModule,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
