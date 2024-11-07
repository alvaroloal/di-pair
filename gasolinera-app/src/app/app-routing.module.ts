import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ListaGasolinerasComponent } from './components/lista-gasolineras/lista-gasolineras.component';
import { FiltrosComponent } from './components/filtro/filtro.component';

const routes: Routes = [
{ path : 'lista' , component : ListaGasolinerasComponent },
{ path: '', component: HomeComponent },
//{ path: 'filtro', component: FiltrosComponent },
{ path : '**', component : PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
