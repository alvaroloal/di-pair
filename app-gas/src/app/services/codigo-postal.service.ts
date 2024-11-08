import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodigoPostal } from '../interfaces/codigo-postal.interface';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  constructor(private http: HttpClient) { }


  getCodigosPostales(): Observable<CodigoPostal[]> {

    return this.http.get<CodigoPostal[]>("http://localhost:3000/codigos-postales")
  }
}
