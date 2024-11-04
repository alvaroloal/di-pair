import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FuelStationResponsive } from '../models/fuel-station.interface';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private apiUrl = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/PreciosEESSTerrestres';

  constructor(private http: HttpClient) {}

  getFuelPrices(): Observable<FuelStationResponsive[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => this.parseFuelData(data))
    );
  }

  private parseFuelData(data: any): FuelStationResponsive[] {
    return data.ListaEESSPrecio.map((station: any) => ({
      nombre: station['Rótulo'],
      direccion: station['Dirección'],
      precios: {
        gasoleo: parseFloat(station['Precio Gasóleo A'].replace(',', '.')) || 0,
        gasolina: parseFloat(station['Precio Gasolina 95 E5'].replace(',', '.')) || 0,
        hidrogeno: parseFloat(station['Precio Hidrógeno'].replace(',', '.')) || 0
      }
    }));
  }
}
