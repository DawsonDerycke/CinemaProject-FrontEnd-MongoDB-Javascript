import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudMoviesComponent } from './crud-movies/crud-movies.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

const routes: Routes = [
  { path: 'movies', component: ListMoviesComponent},
  { path: 'searchMovies', component: SearchMoviesComponent},
  { path: 'crudMovies', component: CrudMoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
