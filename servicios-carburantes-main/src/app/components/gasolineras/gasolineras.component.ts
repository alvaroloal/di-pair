import { Component } from '@angular/core';
import { BuscadorMunicipiosComponent } from '../../components/buscador-municipios/buscador-municipios.component'
import { Gasolinera } from '../../models/gasolinera.dto';


@Component({
  selector: 'app-gasolineras',
  templateUrl: './gasolineras.component.html',
  styleUrl: './gasolineras.component.css'
})
export class GasolinerasComponent {

  municipio = "Gasolineras"  

  municipioSeleccionado!: string;
  carburanteSeleccionado!: string;
  precioFiltrado!: string;

  gasolinera!: Gasolinera;

  llamadaMunicipio(municipio: string) {
    this.municipio = municipio;
  }

  seleccionarCarburante(carburante: string) {
    this.carburanteSeleccionado = carburante;
    
  } 

  actualizarPrecio(precio: string) {
    this.precioFiltrado = precio;
  }

  mostrarGasolineraSeleccionada(gasolinera: Gasolinera) {
    this.gasolinera = gasolinera;
  }

}
