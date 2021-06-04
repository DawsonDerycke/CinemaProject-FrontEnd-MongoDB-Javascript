// Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Primeng
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar'; 
import { TableModule } from 'primeng/table';

// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { CrudMoviesComponent } from './crud-movies/crud-movies.component';
import { CrudUsersComponent } from './crud-users/crud-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { CrudCategoriesComponent } from './crud-categories/crud-categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { SearchCategoriesComponent } from './search-categories/search-categories.component';

@NgModule({
  declarations: [ 
    AppComponent,
    ListMoviesComponent,
    SearchMoviesComponent,
    CrudMoviesComponent,
    CrudUsersComponent,
    ListUsersComponent,
    SearchUsersComponent,
    CrudCategoriesComponent,
    ListCategoriesComponent,
    SearchCategoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    AccordionModule,
    MegaMenuModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
