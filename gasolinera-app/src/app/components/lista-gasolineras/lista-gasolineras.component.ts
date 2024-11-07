import { Component, Input, input, OnInit } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { PipeGoogleMapsPipe } from '../../pipes/pipe-google-maps.pipe';
import { Gasolinera } from '../../models/gasolinera-response.interface';

@Component({
  selector: 'app-lista-gasolineras',
  templateUrl: './lista-gasolineras.component.html',
  styleUrls: ['./lista-gasolineras.component.css'],
})
export class ListaGasolinerasComponent implements OnInit {

  listadoGasolineras: Gasolinera[] = [];
  gasolinerasFiltradas: Gasolinera[] = [];
  gasolinerasPrecio: Gasolinera[] = [];
  fuelTypes: string[] = ['Biodiesel', 'GasoleoA', 'GasoleoB', '95', '98', 'Hidrogeno'];
  combustiblesSeleccionados: string[] = [];
  @Input() precioMaximo: number = 2;
  @Input() precioMinimo: number = 0;
  selectedFuel: string = 'all';
  codigoPostalBuscado: string = '';

  constructor(private gasolineraService: GasolineraService) { }

  ngOnInit() {
    this.gasolineraService.getGasList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras).splice(0, 200);
        this.gasolinerasFiltradas = this.listadoGasolineras;
        console.log(this.listadoGasolineras);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraMostrar: any) => {
      const gasolineraConNombresGuenos: any = {};

      let gasolinera = new Gasolinera(
        gasolineraMostrar['IDEESS'],
        gasolineraMostrar['Rótulo'],
        this.corregirPrecio(gasolineraMostrar['Precio Gasolina 95 E5']),
        this.corregirPrecio(gasolineraMostrar['Precio Gasoleo A']),
        gasolineraMostrar['C.P.'],
        gasolineraMostrar['Dirección'],
        gasolineraMostrar['Localidad'],
        gasolineraMostrar['Provincia'],
        parseFloat(gasolineraMostrar['Latitud'].replace(',', '.')),
        parseFloat(gasolineraMostrar['Longitud (WGS84)'].replace(',', '.')),
        gasolineraMostrar['Horario'],
        gasolineraMostrar['Remisión'],
        this.corregirPrecio(gasolineraMostrar['Precio Biodiesel']),
        this.corregirPrecio(gasolineraMostrar['Precio Gasolina 98 E5']),
        this.corregirPrecio(gasolineraMostrar['Precio Hidrogeno']),
        this.corregirPrecio(gasolineraMostrar['Precio Gasoleo B'])
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
      case 'all':
        this.gasolinerasFiltradas = this.listadoGasolineras;
        break;
      case '95':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => gasolinera.price95 !=0
        );

        break;
      case 'gasoleoA':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasoleoA !=0;
          }
        );
        break;
      case 'biodiesel':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => gasolinera.priceBiodiesel !=0
        );
        break;
      case '98':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasolina98 !=0;
          }
        );
        break;
      case 'hidrogeno':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceHidrogeno !=0;
          }
        );
        break;
      case 'gasoleoB':
        this.gasolinerasFiltradas = this.listadoGasolineras.filter(
          (gasolinera) => {
            return gasolinera.priceGasoleoB !=0;
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
        (gasolinera.price95 !=0 && gasolinera.price95 >= this.precioMinimo && gasolinera.price95 <= this.precioMaximo) ||
        (gasolinera.priceGasoleoA !=0 && gasolinera.priceGasoleoA >= this.precioMinimo && gasolinera.priceGasoleoA <= this.precioMaximo) ||
        (gasolinera.priceBiodiesel !=0 && gasolinera.priceBiodiesel >= this.precioMinimo && gasolinera.priceBiodiesel <= this.precioMaximo) ||
        (gasolinera.priceGasolina98 !=0 && gasolinera.priceGasolina98 >= this.precioMinimo && gasolinera.priceGasolina98 <= this.precioMaximo) ||
        (gasolinera.priceHidrogeno !=0 && gasolinera.priceHidrogeno >= this.precioMinimo && gasolinera.priceHidrogeno <= this.precioMaximo) ||
        (gasolinera.priceGasoleoB !=0 && gasolinera.priceGasoleoB >= this.precioMinimo && gasolinera.priceGasoleoB <= this.precioMaximo)
    );

    console.log('Gasolineras filtradas:', this.gasolinerasFiltradas);
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
  modificarListaCarburantes(tipoCarburante: string) {
    if (!this.combustiblesSeleccionados.includes(tipoCarburante)) {
      this.combustiblesSeleccionados.push(tipoCarburante);
      console.log('Combustibles seleccionados:', this.combustiblesSeleccionados);
    } else {
      this.combustiblesSeleccionados.splice(this.combustiblesSeleccionados.indexOf(tipoCarburante), 1);
      console.log('Combustibles seleccionados:', this.combustiblesSeleccionados);
    }
  }
  filtrarPorCarburantes() {
    if (this.combustiblesSeleccionados.length === 0) {
      this.gasolinerasFiltradas = this.listadoGasolineras;
    } else {
      this.gasolinerasFiltradas = this.listadoGasolineras.filter((gasolinera) => {
        return this.combustiblesSeleccionados.some((combustible) => {
          switch (combustible) {
            case 'Biodiesel':
              return gasolinera.priceBiodiesel !=0;
            case 'GasoleoA':
              return gasolinera.priceGasoleoA !=0;
            case 'GasoleoB':
              return gasolinera.priceGasoleoB !=0;
            case '95':
              return gasolinera.price95 !=0;
            case '98':
              return gasolinera.priceGasolina98 !=0;
            case 'Hidrogeno':
              return gasolinera.priceHidrogeno !=0;
            default:
              return false;
          }
        });
      });
    }
    console.log('Gasolineras filtradas por carburantes:', this.gasolinerasFiltradas);
  }  
}