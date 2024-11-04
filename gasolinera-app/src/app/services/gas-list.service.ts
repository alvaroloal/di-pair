import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GasolineraResponse } from '../models/gas-list.interface';

@Injectable({
  providedIn: 'root'
})
export class GasListService {

  constructor(private httpClient: HttpClient) {
  }

  getGasolinera(): Observable<GasolineraResponse> {
    return this.httpClient.get<GasolineraResponse>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres')
      .pipe(
        map(response => JSON.parse(JSON.stringify(response, this.replacer)))
      );
  }

  private replacer(key: string, value: any) {
    const mapping: { [key: string]: string } = {
      "C.P.": "CodigoPostal",
      "Dirección": "Direccion",
      "Longitud (WGS84)": "Longitud_WGS84",
      "Precio Biodiesel": "Precio_Biodiesel",
      "Precio Bioetanol": "Precio_Bioetanol",
      "Precio Gas Natural Comprimido": "Precio_Gas_Natural_Comprimido",
      "Precio Gas Natural Licuado": "Precio_Gas_Natural_Licuado",
      "Precio Gases licuados del petróleo": "Precio_Gases_licuados_del_petroleo",
      "Precio Gasoleo A": "Precio_Gasoleo_A",
      "Precio Gasoleo B": "Precio_Gasoleo_B",
      "Precio Gasoleo Premium": "Precio_Gasoleo_Premium",
      "Precio Gasolina 95 E10": "Precio_Gasolina_95_E10",
      "Precio Gasolina 95 E5": "Precio_Gasolina_95_E5",
      "Precio Gasolina 95 E5 Premium": "Precio_Gasolina_95_E5_Premium",
      "Precio Gasolina 98 E10": "Precio_Gasolina_98_E10",
      "Precio Gasolina 98 E5": "Precio_Gasolina_98_E5",
      "Precio Hidrogeno": "Precio_Hidrogeno",
      "Tipo Venta": "Tipo_Venta",
      "% BioEtanol": "Porcentaje_BioEtanol",
      "% Éster metílico": "Porcentaje_Ester_metilico",
      "Remisión": "Remision",
      "Rótulo": "Rotulo"
    };
    return mapping[key] || key;
  }
}

