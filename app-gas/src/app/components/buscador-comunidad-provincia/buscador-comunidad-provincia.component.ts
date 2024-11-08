import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comunidad } from '../../interfaces/comunidad.interface';
import { ComunidadAutonomaService } from '../../services/comunidad-autonoma.service';
import { ProvinciasService } from '../../services/provincias.service';
import { Provincia } from '../../interfaces/provincia.interface';
import { ComunidadProvincia } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-buscador-comunidad-provincia',
  templateUrl: './buscador-comunidad-provincia.component.html',
  styleUrl: './buscador-comunidad-provincia.component.css'
})
export class BuscadorComunidadProvinciaComponent implements OnInit{

  IDCCAA = "";
  IDProvincia= "";
  listaComunidades: Comunidad[] = []
  listaProvincias: Provincia[] = []

  @Output() comunidadProvinciaSeleccionados = new EventEmitter<ComunidadProvincia>();


  constructor(private comunidadService: ComunidadAutonomaService, private provinciaService: ProvinciasService) {}

  ngOnInit() {
    this.comunidadService.getComunidades().subscribe(res => {

      this.listaComunidades = res;
    })
    
  }

  buscarProvincias() {
    this.provinciaService.getProvinciaComunidad(this.IDCCAA).subscribe(res => {

      this.listaProvincias = res;
    })
  }

  comunidadProvinciaEmitter(){

    if(this.IDProvincia == "") {

      this.comunidadProvinciaSeleccionados.emit(new ComunidadProvincia(this.IDCCAA, undefined));
    }
    else {

      this.comunidadProvinciaSeleccionados.emit(new ComunidadProvincia(this.IDCCAA, this.IDProvincia));
    }
  }

}
