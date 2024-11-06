import { Component, OnInit } from '@angular/core';
import { GasService } from '../../services/gas.service';
import { Gasolinera } from '../../models/gas-item.dto';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrl: './gas-list.component.css',
})
export class GasListComponent implements OnInit {
  listadoGasolineras: Gasolinera[] = [];
  listadoFiltrado: Gasolinera[] = [];

  filtros = {
    tipoCombustible: '',
    precioMin: null,
    precioMax: null,
    codigoPostal: '',
    nombresSeleccionados: []
  };

  nombresDisponibles: string[] = [];

  constructor(private gasService: GasService) {}

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      // transformo la respuesta del API en String (JSON)
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        // transformo el String en un objeto JSON
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.obtenerNombresDisponibles();
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }

      
    });
  }

  

  private cleanProperties(arrayGasolineras: any): Gasolinera[] {
    return arrayGasolineras.map((gasolineraMostrar:any) => {
      return new Gasolinera(
        gasolineraMostrar['IDEESS'],
        gasolineraMostrar['Rótulo'],
        parseFloat(gasolineraMostrar['Precio Gasolina 95 E5'].replace(',', '.')),
        parseFloat(gasolineraMostrar['Precio Gasoleo A'].replace(',', '.')),
        gasolineraMostrar['C.P.']
      );
    });
  }



  private obtenerNombresDisponibles() {
  
    this.nombresDisponibles = Array.from(
      new Set(this.listadoGasolineras.map((gas) => gas.nombre))
    );
  }

  
  aplicarFiltros() {
    this.listadoFiltrado = this.listadoGasolineras.filter((gasolinera) => {
      const cumpleCombustible =
        !this.filtros.tipoCombustible ||
        (this.filtros.tipoCombustible === 'Gasolina 95' && gasolinera.price95) ||
        (this.filtros.tipoCombustible === 'Diesel' && gasolinera.priceDiesel);

      const cumplePrecio =
        (!this.filtros.precioMin || 
         (gasolinera.price95 >= this.filtros.precioMin || gasolinera.priceDiesel >= this.filtros.precioMin)) &&
        (!this.filtros.precioMax || 
         (gasolinera.price95 <= this.filtros.precioMax || gasolinera.priceDiesel <= this.filtros.precioMax));

  
      const cumpleCodigoPostal =
        !this.filtros.codigoPostal || gasolinera.postalCode === this.filtros.codigoPostal;

      
    });

    if (this.listadoFiltrado.length === 0) {
      console.log('No hay resultados con los filtros aplicados');
    }
  }
}





