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

  constructor(private gasService: GasService) {}

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      // Transformo la respuesta del API en String (JSON)
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        // Transformo el String en un objeto JSON
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
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
        gasolineraMostrar['Precio Gasolina 95 E5'],
        gasolineraMostrar['Precio Gasoleo A'],
        gasolineraMostrar['C.P.'],
        gasolineraMostrar['Precio Biodiesel']
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }
}
