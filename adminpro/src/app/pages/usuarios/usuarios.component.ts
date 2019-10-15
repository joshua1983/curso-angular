import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
//import swal from 'sweetalert';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];
  totalRegistros: number;
  desde:number = 0;
  cargando:boolean = false;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuario(this.desde)
      .subscribe( (resp:any) => {
        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.total;
        this.cargando = false;
      })
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string){
    if (termino.length <= 0){
      this.cargarUsuarios()
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino).subscribe( (usuarios: Usuario[] )=> {
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

  borrarUsuario(usuario:Usuario){
    if (usuario._id === this._usuarioService.usuario._id){
      swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¡Esta seguro?',
      text: 'Esta a punto de borrar a '+usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar){
        this._usuarioService.borrarUsuario(usuario._id).subscribe( (resp:any) => {
          swal('Usuario borrado', 'El usuario ha sido borrado', 'info');
          this.desde = 0;
          this.cargarUsuarios();
        })
      }
    })
  }

  guardarUsuario(usuario:Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
