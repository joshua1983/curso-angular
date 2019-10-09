import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
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
      console.log('bloqueado');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
