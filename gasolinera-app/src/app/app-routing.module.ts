import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GasListComponent } from './components/gas-list/gas-list.component';

const routes: Routes = [
{ path : 'gasolineras' , component : GasListComponent },
//{ path : 'lista' , component : ListaGasolinerasComponent },
{ path: '', component: HomeComponent },
{ path : '**', component : PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
