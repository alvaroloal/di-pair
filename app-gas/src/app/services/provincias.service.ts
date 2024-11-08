import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../interfaces/provincia.interface';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(private http: HttpClient) { }


  getProvinciaComunidad(IDCCAA: string): Observable<Provincia[]>{

    return this.http.get<Provincia[]>(
      `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/${IDCCAA}`
    )
  }
}
