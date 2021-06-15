import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCategoriesComponent } from './crud-categories/crud-categories.component';
import { CrudMoviesComponent } from './crud-movies/crud-movies.component';
import { CrudRatingsComponent } from './crud-ratings/crud-ratings.component';
import { CrudUsersComponent } from './crud-users/crud-users.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListRatingsComponent } from './list-ratings/list-ratings.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  { path: 'movies', component: ListMoviesComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'ratings', component: ListRatingsComponent },
  { path: 'crudMovies', component: CrudMoviesComponent },
  { path: 'crudUsers', component: CrudUsersComponent },
  { path: 'crudCategories', component: CrudCategoriesComponent },
  { path: 'crudRatings', component: CrudRatingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
