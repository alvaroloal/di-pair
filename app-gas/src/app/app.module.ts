import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { BuscadorMunicipiosComponent } from './components/buscador-municipios/buscador-municipios.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { GasolinerasComponent } from './components/gasolineras/gasolineras.component';
import { FormsModule } from '@angular/forms';
import { BuscadorGasolinerasComponent } from './components/buscador-gasolineras/buscador-gasolineras.component';
import { CarburantesComponent } from './components/carburantes/carburantes.component';
import { PrecioComponent } from './components/precio/precio.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { GoogleMapsLinkPipe } from './pipes/google-maps-link.pipe';
import { FiltroCpComponent } from './components/filtro-cp/filtro-cp.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorMunicipiosComponent,
    NavMenuComponent,
    GasolinerasComponent,
    BuscadorGasolinerasComponent,
    CarburantesComponent,
    PrecioComponent,
    DetallesComponent,
    GoogleMapsLinkPipe,
    FiltroCpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
