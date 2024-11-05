import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    GasListComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  
  ],
  providers: [
    provideAnimationsAsync(), 
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
