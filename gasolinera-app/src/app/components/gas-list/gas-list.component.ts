import { Component, OnInit } from '@angular/core';
import { GasolineraResponse, ListaEessprecio } from '../../models/gas-list.interface';
import { GasListService } from '../../services/gas-list.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrl: './gas-list.component.css'
})

export class GasListComponent implements OnInit {
  listadoGasolineras: ListaEessprecio[] = [];

  constructor(private gasListService: GasListService) {}
                      
  ngOnInit(): void {
    this.gasListService.getGasolinera().subscribe((response: GasolineraResponse) => {
      this.listadoGasolineras = response.ListaEESSPrecio;
    });

  }

}