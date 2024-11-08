import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ListaGasolinerasComponent } from './components/lista-gasolineras/lista-gasolineras.component';
import { PipeGoogleMapsPipe } from './pipes/pipe-google-maps.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterCodeComponent } from './components/filter-code/filter-code.component';
import { FilterNameComponent } from './components/filter-name/filter-name.component';
import { FilterTypeComponent } from './components/filter-type/filter-type.component';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { MaterialModule } from './modules/material.module';
import { BannerComponent } from './shared/banner/banner.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ListaGasolinerasComponent,
    PipeGoogleMapsPipe,
    FilterCodeComponent,
    FilterNameComponent,
    FilterTypeComponent,
    GasListComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatMenuModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MaterialModule

  ],
  providers: [
    provideAnimationsAsync(), 
    provideHttpClient(),

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
