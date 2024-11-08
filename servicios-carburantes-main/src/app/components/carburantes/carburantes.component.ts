import { Component, Input } from '@angular/core';
import { Gasolinera } from '../../models/gasolinera.dto';


@Component({
  selector: 'app-carburantes',
  templateUrl: './carburantes.component.html',
  styleUrl: './carburantes.component.css'
})
export class CarburantesComponent {

  @Input()
  gasolinera!: Gasolinera;

}
