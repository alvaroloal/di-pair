import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { ComunidadProvincia, Gasolinera } from '../../models/gasolinera.dto';
import { BuscadorMunicipiosComponent } from '../../components/buscador-municipios/buscador-municipios.component';

@Component({
  selector: 'app-buscador-gasolineras',
  templateUrl: './buscador-gasolineras.component.html',
  styleUrls: ['./buscador-gasolineras.component.css']
})
export class BuscadorGasolinerasComponent implements OnInit {

  @Input() titulo!: string;
  @Input() municipio!: string;
  @Input() comunidadProvincia!: ComunidadProvincia;
  @Input() carburanteSeleccionado!: string;
  @Input() codigoPostalSeleccionado!: string;
  @Output() gasolineraSeleccionada = new EventEmitter<Gasolinera>();

  tiposCarburantes = [
    { nombre: 'Gasóleo', propiedad: 'PrecioGasoleoA' },
    { nombre: 'Gasolina', propiedad: 'PrecioGasolina95E5' },
    { nombre: 'Hidrógeno', propiedad: 'PrecioHidrogen' }
  ];
  
  gasolinerasFiltradas: Gasolinera[] = [];
  carburante!: string;
  minPrice: number = 0; 
  maxPrice: number = 2;
  
  constructor(private service: GasolineraService) {}

  ngOnInit(): void {
    
    this.obtenerGasolineras();
  }

  obtenerGasolineras() {
    this.gasolinerasFiltradas = [];
    
    this.service.getGasolineras().subscribe((response) => {
      const gasolineras = response.ListaEESSPrecio;

      for (let i = 0; i < gasolineras.length; i++) {
        const gasolineraParsed = BuscadorMunicipiosComponent.parseGasolinera(gasolineras[i]);
        
        if (!this.municipio || gasolineraParsed.Municipio.toLowerCase() === this.municipio.toLowerCase()) {
          this.gasolinerasFiltradas.push(gasolineraParsed);
        }
        if(this.comunidadProvincia != null) {

          if(this.comunidadProvincia.IDProvincia == undefined 
            && this.comunidadProvincia.IDCCAA == gasolineraParsed.IDCCAA){

              this.gasolinerasFiltradas.push(gasolineraParsed);
          }
          if(this.comunidadProvincia.IDProvincia != undefined ){

            if(this.comunidadProvincia.IDCCAA == gasolineraParsed.IDCCAA
              && this.comunidadProvincia.IDProvincia == gasolineraParsed.IDProvincia
            ) {

              this.gasolinerasFiltradas.push(gasolineraParsed);
            }
          }
        }
      }
    });
  }

  seleccionarCarburante(carburante: string) {
    this.carburanteSeleccionado = carburante;
  }
  
  obtenerPrecioCarburante(gasolinera: Gasolinera): string {
    const carburante = this.carburanteSeleccionado;
    switch (carburante) {
      case 'Gasóleo':
        return gasolinera.PrecioGasoleoA ;
      case 'Gasolina':
        return gasolinera.PrecioGasolina95E5 ;
      case 'Hidrógeno':
        return gasolinera.PrecioHidrogen;
      default:
        return 'N/A';
    }
  }

  onClick(gasolinera: Gasolinera) {

    this.gasolineraSeleccionada.emit(gasolinera);
  }

  isPriceWithinRange(gasolinera: Gasolinera, min: number, max: number): boolean {

    const price = this.obtenerPrecioCarburante(gasolinera).replaceAll(",", ".");
    let priceFloat = parseFloat(price);
    return priceFloat >= min && priceFloat <= max;
  }
}
