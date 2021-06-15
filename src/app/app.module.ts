// Angular
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

// Primeng
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

// Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { CrudMoviesComponent } from './crud-movies/crud-movies.component';
import { CrudUsersComponent } from './crud-users/crud-users.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CrudCategoriesComponent } from './crud-categories/crud-categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CrudRatingsComponent } from './crud-ratings/crud-ratings.component';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    CrudMoviesComponent,
    CrudUsersComponent,
    ListUsersComponent,
    CrudCategoriesComponent,
    ListCategoriesComponent,
    CrudRatingsComponent,
    ListRatingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    PanelModule,
    AccordionModule,
    MegaMenuModule,
    InputTextModule,
    RatingModule,
    
    ButtonModule,
    CheckboxModule,
    ToastModule,
    InputNumberModule,
    RadioButtonModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
