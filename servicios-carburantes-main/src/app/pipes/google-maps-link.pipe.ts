import { Pipe, PipeTransform } from '@angular/core';
import { Gasolinera } from '../models/gasolinera.dto';

@Pipe({
  name: 'googleMapsLink'
})
export class GoogleMapsLinkPipe implements PipeTransform {

  transform(gasolinera: Gasolinera): string {
  
    let latitudPunto = gasolinera.Latitud.replaceAll(",", ".");
    let longitudPunto = gasolinera.Longitud.replaceAll(",", ".");

    return `https://maps.google.com/?q=${latitudPunto},${longitudPunto}`;
  }

}
