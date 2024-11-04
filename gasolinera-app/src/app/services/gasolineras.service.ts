import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GasolinerasService {
  private apiUrl = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PreciosEESSTerrestres';

  constructor(private http: HttpClient) {}

  getGasolineras(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data: any) => {
        const jsonString = JSON.stringify(data);
        const jsonFixed = jsonString.replace(/"([^"]+)\s([^"]+)":/g, (match, p1, p2) => `"${p1}${p2}":`);
        return JSON.parse(jsonFixed);
      })
    );
  }
}
