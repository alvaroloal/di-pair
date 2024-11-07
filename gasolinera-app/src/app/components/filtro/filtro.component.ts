import { Component, OnInit } from '@angular/core';
import { CcaaProvinciasService } from '../../services/ccaa-provincias.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltrosComponent implements OnInit {

  comunidades: any[] = [];
  selectedComunidad: string = '';
  provincias: any[] = [];
  selectedProvincia: string = '';

  constructor(private ccaaProvinciasService: CcaaProvinciasService) { }

  ngOnInit(): void {
    this.ccaaProvinciasService.obtenerComunidades().subscribe(data => {
      this.comunidades = data.Comunidades;
    });
  }

  onComunidadChange(): void {
    this.selectedProvincia = '';
    if (this.selectedComunidad) {
      this.obtenerProvincias();
    }
  }

  obtenerProvincias() {
    if (this.selectedComunidad) {
      this.ccaaProvinciasService.obtenerProvincias(this.selectedComunidad).subscribe(data => {
        this.provincias = data.Provincias;
      });
    }
  }


  estaciones: any[] = [];

obtenerEstaciones() {
  let url = '';
  if (this.selectedProvincia) {
    url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PreciosEESSTerrestresFiltroProvincia/${this.selectedProvincia}`;
  } else if (this.selectedComunidad) {
    url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/PreciosEESSTerrestresFiltroCCAA/${this.selectedComunidad}`;
  }

  if (url) {
    this.ccaaProvinciasService.obtenerProvincias(url).subscribe(data => {
      this.estaciones = data.Estaciones;
    });
  }
}

}
