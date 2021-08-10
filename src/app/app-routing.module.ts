import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: 'Home',   component: HomeComponent },
  { path: 'Rutas',  component: MapComponent },
  { path: 'QSomos', component: QuienesSomosComponent },
  { path: '',   pathMatch: 'full', redirectTo: 'Home' },
  { path: '**', pathMatch: 'full', redirectTo: 'Home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
