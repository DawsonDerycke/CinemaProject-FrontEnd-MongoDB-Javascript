import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';

const apiMovies= "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this.httpClient.get<Movies[]>(apiMovies + `/api/movies`);
  } 

  addMovies(dataMovies: any) {
    return this.httpClient.post(apiMovies + `/api/movies`, dataMovies);
  } 

  updateOneMovie(id: any, dataMovies: any) {
    return this.httpClient.post(apiMovies + `/api/movies/${id}`, dataMovies);
  }

  deleteOneMovie(idToDelete: any) {
    return this.httpClient.delete(apiMovies + `/api/movies/${idToDelete}`);
  }
}
