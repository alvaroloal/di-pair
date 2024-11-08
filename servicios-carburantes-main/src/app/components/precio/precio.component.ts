import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrl: './precio.component.css'
})
export class PrecioComponent {
  @Input() carburante!: string;
  @Output() precioFiltrado = new EventEmitter<string>();

  precios = [
    { id: 1, rango: "< 0.80€/l" },
    { id: 2, rango: "0.80 - 1€/l" },
    { id: 3, rango: "> 1€/l" }
  ];

  filtrarPorPrecio(precio: string) {
    this.precioFiltrado.emit(precio);
  }
}
