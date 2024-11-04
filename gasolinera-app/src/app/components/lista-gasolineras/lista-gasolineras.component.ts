import { Component, OnInit } from '@angular/core';
import { GasolinerasService } from '../../services/gasolineras.service';

@Component({
  selector: 'app-lista-gasolineras',
  templateUrl: './lista-gasolineras.component.html',
  styleUrls: ['./lista-gasolineras.component.css'],
})
export class ListaGasolinerasComponent implements OnInit {
  gasolineras: any[] = [];

  constructor(private gasolinerasService: GasolinerasService) {}

  ngOnInit(): void {
    this.gasolinerasService.getGasolineras().subscribe((data) => {
      this.gasolineras = data.ListaEESSPrecio.map((gasolinera: any) => ({
        nombre: gasolinera.Rótulo,
        direccion: gasolinera.Dirección,
        precioGasoleo: gasolinera['Precio Gasoleo A'],
        precioGasolina: gasolinera['Precio Gasolina 95 E5'],
        precioHidrogeno: gasolinera['Precio Hidrogeno'],
      }));
    });
  }
}
