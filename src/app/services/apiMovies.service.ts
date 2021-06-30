import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies';

const apiMovies= "https://projet-mongodb.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  constructor(private _httpClient: HttpClient) { }

  getMovies(): Observable<Movies[]> {
    return this._httpClient.get<Movies[]>(apiMovies + `/api/movies`);
  } 
  
  getMoviesId(id: string): Observable<Movies[]> {
    return this._httpClient.get<Movies[]>(apiMovies + `/api/movies/${id}`);
  } 

  addMovies(dataMovies: any) {
    return this._httpClient.post(apiMovies + `/api/movies`, dataMovies);
  } 

  updateMovie(id: string, dataMovies: any) {
    return this._httpClient.post(apiMovies + `/api/movies/${id}`, dataMovies);
  }

  deleteMovie(idToDelete: string) {
    return this._httpClient.delete(apiMovies + `/api/movies/${idToDelete}`);
  }
}
