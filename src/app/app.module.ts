// Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Primeng
import { MenuModule } from 'primeng/menu';
import {MegaMenuModule} from 'primeng/megamenu';
import {AccordionModule} from 'primeng/accordion';  
// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { CrudMoviesComponent } from './crud-movies/crud-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    SearchMoviesComponent,
    CrudMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    AccordionModule,
    MegaMenuModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
