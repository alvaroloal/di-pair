import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-buscador-municipios',
  templateUrl: './buscador-municipios.component.html',
  styleUrl: './buscador-municipios.component.css'
})
export class BuscadorMunicipiosComponent implements OnInit{

  @Output()
  nombre = new EventEmitter<string>;

  @Input()
  valor!: string;

  listaNombres: Set<string> = new Set;

  constructor(private service: GasolineraService) {}

  ngOnInit(): void {
      this.service.getGasolineras().subscribe(res => {

        res.ListaEESSPrecio.forEach((gasolinera: any) => {
          
          this.listaNombres.add(BuscadorMunicipiosComponent.parseGasolinera(gasolinera).Municipio);
          
        })
      })
  }

  onChange() {
    this.listaNombres = new Set;
    this.service.getGasolineras().subscribe(res => {

      res.ListaEESSPrecio.forEach((gasolinera: any) => {

        let gasolineraWena = BuscadorMunicipiosComponent.parseGasolinera(gasolinera);
        if(gasolineraWena.Municipio.toLowerCase().includes(this.valor.toLowerCase())){
          this.listaNombres.add(gasolineraWena.Municipio)
        }
      })
    })
  }

  onClick(nombre: string) {

    this.nombre.emit(nombre);
  }

  public static parseGasolinera(gasolinera: any) {

    let gasolineraWena = new Gasolinera("", "", "", "", "", "", ""
      , "", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", ""
    )

    let gasolineraString = JSON.stringify(gasolinera);
    gasolinera = JSON.parse(gasolineraString);

    gasolineraWena.CP = gasolinera["C.P."];
    gasolineraWena.Direccion = gasolinera["Dirección"];
    gasolineraWena.Horario = gasolinera["Horario"];
    gasolineraWena.IDEESS = gasolinera["IDEESS"];
    gasolineraWena.Latitud = gasolinera["Latitud"];
    gasolineraWena.Localidad = gasolinera["Localidad"];
    gasolineraWena.Longitud = gasolinera["Longitud (WGS84)"];
    gasolineraWena.Municipio = gasolinera["Municipio"];
    gasolineraWena.PrecioBiodiesel = gasolinera["Precio Biodiesel"];
    gasolineraWena.PrecioBioetanol = gasolinera["Precio Bioetanol"];
    gasolineraWena.PrecioGasNaturalComprimido = gasolinera["Precio Gas Natural Comprimido"];
    gasolineraWena.PrecioGasNaturalLicuado = gasolinera["Precio Gas Natural Licuado"];
    gasolineraWena.PrecioGaseslicuadosdelpetróleo = gasolinera["Precio Gases Licuados del petróleo"];
    gasolineraWena.PrecioGasoleoA = gasolinera["Precio Gasoleo A"];
    gasolineraWena.PrecioGasoleoB = gasolinera["Precio Gasoleo B"];
    gasolineraWena.PrecioGasoleoPremium = gasolinera["Precio Gasoleo Premium"];
    gasolineraWena.PrecioGasolina95E10 = gasolinera["Precio Gasolina 95 E10"];
    gasolineraWena.PrecioGasolina95E5 = gasolinera["Precio Gasolina 95 E5"];
    gasolineraWena.PrecioGasolina95E5Premium = gasolinera["Precio Gasolina 95 E5 Premium"];
    gasolineraWena.PrecioGasolina98E10 = gasolinera["Precio Gasolina 98 E10"];
    gasolineraWena.PrecioGasolina98E5 = gasolinera["Precio Gasolina 98 E5"];
    gasolineraWena.PrecioHidrogen = gasolinera["Precio Hidrogeno"];
    gasolineraWena.Provincia = gasolinera["Provincia"];
    gasolineraWena.Remision = gasolinera["Remisión"];
    gasolineraWena.Rotulo = gasolinera["Rótulo"];
    gasolineraWena.IDEESS = gasolinera["IDEESS"];
    gasolineraWena.IDProvincia = gasolinera["IDProvincia"];
    gasolineraWena.IDCCAA = gasolinera["IDCCAA"];

    return gasolineraWena;
  }
}
