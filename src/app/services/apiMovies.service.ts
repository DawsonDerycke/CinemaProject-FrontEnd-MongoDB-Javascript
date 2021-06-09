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
}
