import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GasListComponent } from './components/gas-list/gas-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

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
