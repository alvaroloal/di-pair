import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comunidad } from '../interfaces/comunidad.interface';

@Injectable({
  providedIn: 'root'
})
export class ComunidadAutonomaService {

  constructor(private http: HttpClient) { }

  getComunidades(): Observable<Comunidad[]> {

    return this.http.get<Comunidad[]>("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/");
  }
}
