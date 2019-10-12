import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: String = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    if (!img){
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('http') >= 0){
      return img;
    }

    switch ( tipo ){
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
          url += '/medicos/' + img;
      break;

      case 'hospital':
          url += '/hospital/' + img;
      break;
      default:
        console.log('Tipo de imagen no existe');
        return url + '/usuarios/xxx'

    }

    return url;
  }

}