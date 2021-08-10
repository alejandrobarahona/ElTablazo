import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidenavComponent,
    HomeComponent,
    QuienesSomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
