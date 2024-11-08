import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CcaaProvinciasService {
  

  constructor(private http: HttpClient) { }

obtenerComunidades(): Observable<any> {
    return this.http.get<any>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/ComunidadesAutonomas/');
  }

obtenerProvincias(comunidadId: string): Observable<any> {
  return this.http.get<any>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/ProvinciasFiltroComunidad/${comunidadId}`);
}


obtenerEstacionesPorComunidad(comunidadId: string): Observable<any> {
  return this.http.get<any>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PreciosEESSTerrestresFiltroCCAA/${comunidadId}`);
}

obtenerEstacionesPorProvincia(provinciaId: string): Observable<any> {
  return this.http.get<any>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PreciosEESSTerrestresFiltroProvincia/${provinciaId}`);
}


}


