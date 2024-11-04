import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ListaGasolinerasComponent } from './components/lista-gasolineras/lista-gasolineras.component';

@NgModule({
  declarations: [
    AppComponent,
    GasListComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListaGasolinerasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(), 
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
