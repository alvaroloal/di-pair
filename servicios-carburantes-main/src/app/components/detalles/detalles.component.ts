import { Component, Input } from '@angular/core';
import { Gasolinera } from '../../models/gasolinera.dto';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {

  @Input()
  gasolinera!: Gasolinera;


}
