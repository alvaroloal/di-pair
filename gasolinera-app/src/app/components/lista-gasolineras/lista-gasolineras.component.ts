import { Component, Input, input, OnInit } from '@angular/core';
import { Gasolinera } from '../../models/gasolinera-response.interfaces';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-lista-gasolineras',
  templateUrl: './lista-gasolineras.component.html',
  styleUrls: ['./lista-gasolineras.component.css'],
})
export class ListaGasolinerasComponent implements OnInit {

  listadoGasolineras: Gasolinera[] = [];
  gasolinerasFiltradas: Gasolinera[] = [];
  @Input() precioMaximo: number = 2;
  @Input() precioMinimo: number = 0;
  selectedFuel: string = '';
  codigoPostalBuscado: string = '';
  precioCambiado: boolean = false;

  constructor(private gasolineraService: GasolineraService) { }

  ngOnInit() {
    this.gasolineraService.getGasList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.gasolinerasFiltradas = this.listadoGasolineras;
        console.log(this.listadoGasolineras);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolineraConNombresGuenos: any = {};

      let gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        this.corregirPrecio(gasolineraChusquera['Precio Gasolina 95 E5']),
        this.corregirPrecio(gasolineraChusquera['Precio Gasoleo A']),
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Localidad'],
        gasolineraChusquera['Provincia'],
        parseFloat(gasolineraChusquera['Latitud'].replace(',', '.')),
        parseFloat(gasolineraChusquera['Longitud (WGS84)'].replace(',', '.')),
        gasolineraChusquera['Horario'],
        gasolineraChusquera['Remisión'],
        this.corregirPrecio(gasolineraChusquera['Precio Biodiesel']),
        this.corregirPrecio(gasolineraChusquera['Precio Gasolina 98 E5']),
        this.corregirPrecio(gasolineraChusquera['Precio Hidrogeno']),
        this.corregirPrecio(gasolineraChusquera['Precio Gasoleo B'])
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }

  private corregirPrecio(price: string): number {
    const precioCorregido = parseFloat(price.replace(',', '.'));
    return isNaN(precioCorregido) ? 0 : precioCorregido;
  }

  filterByFuel(fuel: string) {
    switch (fuel) {
      case '95':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => gasolinera.price95 !== null
        );

        break;
      case 'gasoleoA':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasoleoA !== null;
          }
        );
        break;
      case 'biodiesel':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => gasolinera.priceBiodiesel !== null
        );
        break;
      case '98':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasolina98 !== null;
          }
        );
        break;
      case 'hidrogeno':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceHidrogeno !== null;
          }
        );
        break;
      case 'gasoleoB':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasoleoB !== null;
          }
        );
        break;
    }
  }
  filterByPrice() {
    console.log('Precio mínimo:', this.precioMinimo);
    console.log('Precio máximo:', this.precioMaximo);

    this.gasolinerasFiltradas = this.listadoGasolineras.filter(
      (gasolinera) =>
        (gasolinera.price95 !== null && gasolinera.price95 >= this.precioMinimo && gasolinera.price95 <= this.precioMaximo) ||
        (gasolinera.priceGasoleoA !== null && gasolinera.priceGasoleoA >= this.precioMinimo && gasolinera.priceGasoleoA <= this.precioMaximo) ||
        (gasolinera.priceBiodiesel !== null && gasolinera.priceBiodiesel >= this.precioMinimo && gasolinera.priceBiodiesel <= this.precioMaximo) ||
        (gasolinera.priceGasolina98 !== null && gasolinera.priceGasolina98 >= this.precioMinimo && gasolinera.priceGasolina98 <= this.precioMaximo) ||
        (gasolinera.priceHidrogeno !== null && gasolinera.priceHidrogeno >= this.precioMinimo && gasolinera.priceHidrogeno <= this.precioMaximo) ||
        (gasolinera.priceGasoleoB !== null && gasolinera.priceGasoleoB >= this.precioMinimo && gasolinera.priceGasoleoB <= this.precioMaximo)
    );

    console.log('Gasolineras filtradas:', this.gasolinerasFiltradas);
    this.precioCambiado = true;
  }
  cambiandoPrecio() {
    this.precioCambiado = false;
  }
  filterByCodigoPostal() {
    if (this.codigoPostalBuscado === '') {
      this.gasolinerasFiltradas = this.listadoGasolineras;
    } else {
      this.gasolinerasFiltradas = this.listadoGasolineras.filter(
        (gasolinera) => gasolinera.postalCode === this.codigoPostalBuscado
      );
    }
  }
}