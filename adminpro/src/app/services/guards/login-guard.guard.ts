import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router){}

  canActivate(){
    if (this._usuarioService.estaLogueado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
