import { Component, OnInit } from '@angular/core';
import { FuelService } from '../../services/fuel.service';
import { FuelStationResponsive } from '../../models/fuel-station.interface';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.css']
})
export class FuelListComponent implements OnInit {
  fuelStations: FuelStationResponsive[] = [];

  constructor(private fuelService: FuelService) {}

  ngOnInit(): void {
    this.fuelService.getFuelPrices().subscribe(data => {
      this.fuelStations = data;
    });
  }
}
